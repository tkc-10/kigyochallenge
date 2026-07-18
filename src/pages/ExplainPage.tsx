import { FRAMEWORK_PAGES } from '../data/frameworks';

interface Props {
  index: number;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
}

export default function ExplainPage({ index, onNext, onPrev, onExit }: Props) {
  const total = FRAMEWORK_PAGES.length;
  const page = FRAMEWORK_PAGES[index];
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div className="quiz-page">
      <div className="quiz-topbar">
        <button className="btn-abort" onClick={onExit}>
          ← 終了
        </button>
        <span className="quiz-progress">
          {index + 1} / {total}
        </span>
        <span className="cat-badge" style={{ backgroundColor: '#8b5cf6' }}>
          解説
        </span>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((index + 1) / total) * 100}%`, background: '#8b5cf6' }}
        />
      </div>

      <div className="question-card">
        <p className="explain-chapter">{page.chapter}</p>
        <h2 className="explain-title">{page.title}</h2>
        <p className="explain-summary">{page.summary}</p>

        {page.points.length > 0 && (
          <ul className="explain-points">
            {page.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        )}

        {page.caution && (
          <div className="explain-caution">
            <span className="explain-caution-icon">⚠ ひっかけ注意</span>
            <p>{page.caution}</p>
          </div>
        )}
      </div>

      <div className="quiz-nav">
        {!isFirst && (
          <button className="btn-prev" onClick={onPrev}>
            ← 前へ
          </button>
        )}
        <button className="btn-next" onClick={isLast ? onExit : onNext}>
          {isLast ? '解説を終える' : '次へ →'}
        </button>
      </div>
    </div>
  );
}
