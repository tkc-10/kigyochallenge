import { useState, useCallback } from 'react';
import type { Question, AnswerRecord, QuizMode, Category } from '../types';
import allQuestions from '../data/questions';

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

export type QuizState = 'idle' | 'answering' | 'reviewing' | 'finished';

export function useQuiz() {
  const [state, setState] = useState<QuizState>('idle');
  const [mode, setMode] = useState<QuizMode>('practice');
  const [filterCategory, setFilterCategory] = useState<Category | 'all'>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const startPractice = useCallback((category: Category | 'all') => {
    const pool =
      category === 'all'
        ? allQuestions
        : allQuestions.filter((q) => q.category === category);
    setQuestions(shuffle(pool));
    setMode('practice');
    setFilterCategory(category);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedIndex(null);
    setShowExplanation(false);
    setState('answering');
  }, []);

  const startExam = useCallback(() => {
    const pool = pickExamQuestions();
    setQuestions(pool);
    setMode('exam');
    setFilterCategory('all');
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedIndex(null);
    setShowExplanation(false);
    setState('answering');
  }, []);

  const selectOption = useCallback(
    (index: number) => {
      if (selectedIndex !== null) return;
      setSelectedIndex(index);
      const q = questions[currentIndex];
      const record: AnswerRecord = {
        questionId: q.id,
        selectedIndex: index,
        isCorrect: index === q.correctIndex,
      };
      setAnswers((prev) => [...prev, record]);
      if (mode === 'practice') setShowExplanation(true);
    },
    [selectedIndex, questions, currentIndex, mode]
  );

  const next = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setState('finished');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowExplanation(false);
    }
  }, [currentIndex, questions.length]);

  const submitExam = useCallback(() => {
    setState('finished');
  }, []);

  const restart = useCallback(() => {
    setState('idle');
    setQuestions([]);
    setAnswers([]);
    setSelectedIndex(null);
    setShowExplanation(false);
    setCurrentIndex(0);
  }, []);

  const score = answers.filter((a) => a.isCorrect).length;
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
    startPractice,
    startExam,
    selectOption,
    next,
    submitExam,
    restart,
  };
}
