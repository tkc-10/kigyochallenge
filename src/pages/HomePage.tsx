import type { Category } from '../types';
import allQuestions from '../data/questions';

interface Props {
  onStartPractice: (category: Category | 'all') => void;
  onStartExam: () => void;
}

const CATEGORIES: { value: Category | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'すべて', color: '#6366f1' },
  { value: 'company', label: '① 当社事業', color: '#0ea5e9' },
  { value: 'society', label: '② 社会・経済', color: '#10b981' },
  { value: 'business', label: '③ ビジネス知識', color: '#f59e0b' },
];

const examReady =
  allQuestions.filter((q) => q.category === 'company').length >= 30 &&
  allQuestions.filter((q) => q.category === 'society').length >= 30 &&
  allQuestions.filter((q) => q.category === 'business').length >= 20;

export default function HomePage({ onStartPractice, onStartExam }: Props) {
  const counts = {
    company: allQuestions.filter((q) => q.category === 'company').length,
    society: allQuestions.filter((q) => q.category === 'society').length,
    business: allQuestions.filter((q) => q.category === 'business').length,
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="logo-badge">管理職試験</div>
        <h1>昇格試験 対策アプリ</h1>
        <p className="subtitle">模擬問題で本番に備えよう</p>
      </header>

      <section className="section">
        <h2 className="section-title">練習モード</h2>
        <p className="section-desc">カテゴリを選んで問題を解く。解答後に正誤と解説を確認できます。</p>
        <div className="category-grid">
          {CATEGORIES.map((cat) => {
            const count =
              cat.value === 'all'
                ? allQuestions.length
                : counts[cat.value as Category];
            const preparing = count === 0;
            return (
              <button
                key={cat.value}
                className={`category-card${preparing ? ' preparing' : ''}`}
                style={{ '--accent': cat.color } as React.CSSProperties}
                onClick={() => onStartPractice(cat.value)}
                disabled={preparing}
              >
                <span className="cat-label">{cat.label}</span>
                <span className="cat-count">{preparing ? '準備中' : `${count}問`}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">本番シミュレーション</h2>
        <p className="section-desc">
          ①30問 ②30問 ③20問の計80問をランダム出題。終了後に採点します。
        </p>
        <div className="exam-counts">
          <span style={{ color: '#0ea5e9' }}>① {counts.company}問</span>
          <span style={{ color: '#10b981' }}>② {counts.society}問</span>
          <span style={{ color: '#f59e0b' }}>③ {counts.business}問</span>
        </div>
        <button
          className="btn-exam"
          onClick={onStartExam}
          disabled={!examReady}
          title={examReady ? '' : '各カテゴリの問題数が不足しています'}
        >
          {examReady ? '本番シミュレーション開始' : '問題数が不足（準備中）'}
        </button>
      </section>
    </div>
  );
}
