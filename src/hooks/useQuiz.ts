import { useState, useCallback } from 'react';
import type { Question, AnswerRecord, QuizMode, Category } from '../types';
import allQuestions from '../data/questions';
import { FRAMEWORK_PAGES } from '../data/frameworks';

export function getSourceCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  allQuestions.forEach((q) => {
    if (q.source) {
      counts[q.source] = (counts[q.source] ?? 0) + 1;
    }
  });
  return counts;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickExamQuestions(): Question[] {
  const byCategory = (cat: Category, n: number) =>
    shuffle(allQuestions.filter((q) => q.category === cat)).slice(0, n);
  return shuffle([
    ...byCategory('company', 30),
    ...byCategory('society', 30),
    ...byCategory('business', 20),
  ]);
}

export type QuizState = 'idle' | 'answering' | 'reviewing' | 'finished' | 'explaining';

export function useQuiz() {
  const [state, setState] = useState<QuizState>('idle');
  const [mode, setMode] = useState<QuizMode>('practice');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // answers keyed by question index so back-navigation works correctly
  const [answersMap, setAnswersMap] = useState<Record<number, AnswerRecord>>({});
  // 解説モード（フレームワーク説明）のページ番号
  const [explainIndex, setExplainIndex] = useState(0);

  const startPractice = useCallback((category: Category | 'all') => {
    const pool =
      category === 'all'
        ? allQuestions
        : allQuestions.filter((q) => q.category === category);
    setQuestions(shuffle(pool));
    setMode('practice');
    setFilterCategory(category);
    setCurrentIndex(0);
    setAnswersMap({});
    setState('answering');
  }, []);

  const startPracticeBySource = useCallback((source: string) => {
    const pool = allQuestions.filter((q) => q.source === source);
    setQuestions(shuffle(pool));
    setMode('practice');
    setFilterCategory('company');
    setCurrentIndex(0);
    setAnswersMap({});
    setState('answering');
  }, []);

  const startExam = useCallback(() => {
    const pool = pickExamQuestions();
    setQuestions(pool);
    setMode('exam');
    setFilterCategory('all');
    setCurrentIndex(0);
    setAnswersMap({});
    setState('answering');
  }, []);

  const selectOption = useCallback(
    (index: number) => {
      // practice: no re-answering once answered; exam: re-selection allowed
      if (mode === 'practice' && currentIndex in answersMap) return;
      const q = questions[currentIndex];
      const record: AnswerRecord = {
        questionId: q.id,
        selectedIndex: index,
        isCorrect: index === q.correctIndex,
      };
      setAnswersMap((prev) => ({ ...prev, [currentIndex]: record }));
    },
    [answersMap, questions, currentIndex, mode]
  );

  const next = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setState('finished');
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, questions.length]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const submitExam = useCallback(() => {
    setState('finished');
  }, []);

  const startExplain = useCallback(() => {
    setExplainIndex(0);
    setState('explaining');
  }, []);

  const explainNext = useCallback(() => {
    setExplainIndex((i) => Math.min(i + 1, FRAMEWORK_PAGES.length - 1));
  }, []);

  const explainPrev = useCallback(() => {
    setExplainIndex((i) => Math.max(i - 1, 0));
  }, []);

  const restart = useCallback(() => {
    setState('idle');
    setQuestions([]);
    setAnswersMap({});
    setCurrentIndex(0);
    setExplainIndex(0);
  }, []);

  // Derived state — changes automatically when currentIndex changes
  const selectedIndex = answersMap[currentIndex]?.selectedIndex ?? null;
  const showExplanation = currentIndex in answersMap && mode === 'practice';
  // Ordered array for ResultPage (questions with no answer are excluded)
  const answers = questions.map((_, i) => answersMap[i]).filter(Boolean) as AnswerRecord[];
  const score = Object.values(answersMap).filter((a) => a.isCorrect).length;
  const currentQuestion = questions[currentIndex] ?? null;

  return {
    state,
    mode,
    filterCategory,
    questions,
    currentIndex,
    currentQuestion,
    answers,
    selectedIndex,
    showExplanation,
    score,
    explainIndex,
    startPractice,
    startPracticeBySource,
    startExam,
    startExplain,
    explainNext,
    explainPrev,
    selectOption,
    next,
    prev,
    submitExam,
    restart,
  };
}
