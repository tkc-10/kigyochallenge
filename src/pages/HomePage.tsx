import type { Category } from '../types';
import { SOURCE_LABELS, SOURCE_URLS } from '../types';
import { getSourceCounts } from '../hooks/useQuiz';
import allQuestions from '../data/questions';

interface Props {
  onStartPractice: (category: Category | 'all') => void;
  onStartPracticeBySource: (source: string) => void;
  onStartExam: () => void;
}

const CATEGORIES: { value: Category | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'すべて', color: '#6366f1' },
  { value: 'company', label: '① 当社事業', color: '#0ea5e9' },
  { value: 'society', label: '② 社会・経済', color: '#10b981' },
  { value: 'business', label: '③ ビジネス知識', color: '#f59e0b' },
];

const SOURCE_COLORS: Record<string, string> = {
  governance: '#7c3aed',
  keiei2026: '#0ea5e9',
  kessan2025: '#059669',
  zerocarbon_vision: '#10b981',
  zerocarbon_roadmap: '#0d9488',
  conduct: '#dc2626',
  report2025: '#e11d48',
};

const SOURCE_ORDER = ['report2025', 'keiei2026', 'kessan2025', 'governance', 'conduct', 'zerocarbon_vision', 'zerocarbon_roadmap'];

const examReady =
  allQuestions.filter((q) => q.category === 'company').length >= 30 &&
  allQuestions.filter((q) => q.category === 'society').length >= 30 &&
  allQuestions.filter((q) => q.category === 'business').length >= 20;

export default function HomePage({ onStartPractice, onStartPracticeBySource, onStartExam }: Props) {
  const counts = {
    company: allQuestions.filter((q) => q.category === 'company').length,
    society: allQuestions.filter((q) => q.category === 'society').length,
    business: allQuestions.filter((q) => q.category === 'business').length,
  };

  const sourceCounts = getSourceCounts();
  const frequentCount = sourceCounts['frequent'] ?? 0;
  const availableSources = Object.entries(sourceCounts)
    .filter(([source, count]) => count >= 5 && source !== 'frequent')
    .sort((a, b) => SOURCE_ORDER.indexOf(a[0]) - SOURCE_ORDER.indexOf(b[0]));

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

      {availableSources.length > 0 && (
        <section className="section">
          <h2 className="section-title">資料別練習（① 当社事業）</h2>
          <p className="section-desc">添付資料ごとの問題を重点練習できます。</p>
          <div className="source-grid">
            {availableSources.map(([source, count]) => (
              <div
                key={source}
                className="source-row"
                style={{ '--accent': SOURCE_COLORS[source] ?? '#6366f1' } as React.CSSProperties}
              >
                <button
                  className="source-card"
                  onClick={() => onStartPracticeBySource(source)}
                >
                  <span className="source-label">{SOURCE_LABELS[source] ?? source}</span>
                  <span className="source-count">{count}問</span>
                </button>
                {SOURCE_URLS[source] && (
                  <a
                    className="source-link"
                    href={SOURCE_URLS[source]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="原典（公式資料）を開く"
                    aria-label={`${SOURCE_LABELS[source] ?? source}の資料を開く`}
                  >
                    📄 資料
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {frequentCount > 0 && (
        <section className="section section-frequent">
          <div className="frequent-badge">過去11年分の出題傾向分析</div>
          <h2 className="section-title">頻出問題テスト</h2>
          <p className="section-desc">
            複数年度で繰り返し出題された定番テーマを網羅。当社事業・社会経済・ビジネス知識の頻出問題を効率的に対策できます。
          </p>
          <button
            className="btn-frequent"
            onClick={() => onStartPracticeBySource('frequent')}
          >
            頻出問題テスト開始（{frequentCount}問）
          </button>
        </section>
      )}

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
