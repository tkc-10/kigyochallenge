import type { Question } from '../types';

const CATEGORY_LABEL: Record<string, string> = {
  company: '① 当社事業',
  society: '② 社会・経済',
  business: '③ ビジネス知識',
  current: '時事',
  popbudget: '人口・財政',
};

const CATEGORY_COLOR: Record<string, string> = {
  company: '#0ea5e9',
  society: '#10b981',
  business: '#f59e0b',
  current: '#ef4444',
  popbudget: '#0891b2',
};

interface Props {
  mode: 'practice' | 'exam';
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedIndex: number | null;
  showExplanation: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmitExam: () => void;
  onAbort: () => void;
}

export default function QuizPage({
  mode,
  question,
  questionNumber,
  totalQuestions,
  selectedIndex,
  showExplanation,
  onSelect,
  onNext,
  onPrev,
  onSubmitExam,
  onAbort,
}: Props) {
  const isAnswered = selectedIndex !== null;
  const isLast = questionNumber === totalQuestions;
  const isFirst = questionNumber === 1;

  return (
    <div className="quiz-page">
      <div className="quiz-topbar">
        <button className="btn-abort" onClick={onAbort}>
          ← 終了
        </button>
        <span className="quiz-progress">
          {questionNumber} / {totalQuestions}
        </span>
        <span
          className="cat-badge"
          style={{ backgroundColor: CATEGORY_COLOR[question.category] }}
        >
          {CATEGORY_LABEL[question.category]}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="question-card">
        <p className="question-text">{question.text}</p>
        <ol className="options-list">
          {question.options.map((opt, i) => {
            let cls = 'option-btn';
            if (isAnswered) {
              if (i === question.correctIndex) cls += ' correct';
              else if (i === selectedIndex) cls += ' wrong';
              else cls += ' dimmed';
            }
            return (
              <li key={i}>
                <button
                  className={cls}
                  onClick={() => onSelect(i)}
                  disabled={isAnswered && mode === 'practice'}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {showExplanation && question.explanation && (
        <div className={`explanation ${selectedIndex === question.correctIndex ? 'exp-correct' : 'exp-wrong'}`}>
          <span className="exp-icon">
            {selectedIndex === question.correctIndex ? '✓ 正解' : '✗ 不正解'}
          </span>
          <p>{question.explanation}</p>
        </div>
      )}

      <div className="quiz-nav">
        {!isFirst && (
          <button className="btn-prev" onClick={onPrev}>
            ← 前の問題
          </button>
        )}
        {mode === 'practice' && isAnswered && (
          <button className="btn-next" onClick={isLast ? onSubmitExam : onNext}>
            {isLast ? '結果を見る' : '次の問題 →'}
          </button>
        )}
        {mode === 'exam' && isAnswered && (
          <button className="btn-next" onClick={isLast ? onSubmitExam : onNext}>
            {isLast ? '採点する' : '次の問題 →'}
          </button>
        )}
      </div>
    </div>
  );
}
