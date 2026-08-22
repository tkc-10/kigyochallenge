import type { Category } from '../types';
import { SOURCE_LABELS, SOURCE_URLS } from '../types';
import { getSourceCounts } from '../hooks/useQuiz';
import allQuestions from '../data/questions';

interface Props {
  onStartPractice: (category: Category | 'all') => void;
  onStartPracticeBySource: (source: string) => void;
  onStartExam: () => void;
  onStartExplain: () => void;
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

// 関西電力公式サイト内の出典・参考資料（テーマ別）
const REFERENCE_GROUPS: { title: string; items: { label: string; url: string }[] }[] = [
  {
    title: '① 当社事業（経営・IR・ガバナンス）',
    items: [
      { label: '経営計画2026', url: 'https://www.kepco.co.jp/corporate/policy/pdf/plan_2026.pdf' },
      { label: '統合報告書2025', url: 'https://www.kepco.co.jp/corporate/report/integrated/' },
      { label: '2025年度 決算説明資料', url: 'https://www.kepco.co.jp/ir/brief/earnings/2026/pdf/pdf2026_04_05.pdf' },
      { label: '決算・IR関連資料（一覧）', url: 'https://www.kepco.co.jp/ir/brief/index.html' },
      { label: 'コーポレートガバナンス・ガイドライン', url: 'https://www.kepco.co.jp/ir/policy/governance/images/pdf/corporate_governance_guideline.pdf' },
    ],
  },
  {
    title: '経営理念・行動憲章',
    items: [
      { label: '関西電力グループ行動憲章', url: 'https://www.kepco.co.jp/corporate/policy/charter/index.html' },
      { label: '経営理念（Purpose & Values）', url: 'https://www.kepco.co.jp/corporate/policy/philosophy/index.html' },
      { label: '関西電力グループ安全行動憲章', url: 'https://www.kepco.co.jp/energy_supply/supply/ichiisenshin/philosophy/chikai.html' },
    ],
  },
  {
    title: '環境・ゼロカーボン',
    items: [
      { label: 'ゼロカーボンビジョン2050', url: 'https://www.kepco.co.jp/sustainability/environment/zerocarbon/index.html' },
      { label: 'ゼロカーボンロードマップ', url: 'https://www.kepco.co.jp/sustainability/environment/zerocarbon/roadmap.html' },
      { label: 'ゼロカーボンロードマップ 改定（2024/4/30）', url: 'https://www.kepco.co.jp/corporate/pr/2024/pdf/20240430_6j.pdf' },
      { label: 'サステナビリティ方針', url: 'https://www.kepco.co.jp/sustainability/policy/index.html' },
    ],
  },
  {
    title: '原子力（頻出テーマ）',
    items: [
      { label: '原子力ライブラリ（用語・仕組み）', url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/library/' },
      { label: "What's 原子力発電｜燃料のリサイクル", url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/whats/cycle.html' },
      { label: '関西電力の原子力関連施設', url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/info/shisetsu/index.html' },
      { label: '原子力発電の安全性向上に向けた取組み', url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/anzenkakuho/haishi_collaboration.html' },
      { label: '再処理（燃料の再処理）', url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/library/9994322_13857.html' },
      { label: '中間貯蔵について（FAQ）', url: 'https://www.kepco.co.jp/siteinfo/faq/atomic/9997844_10620.html' },
      { label: '乾式貯蔵施設とは', url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/whats/kanshiki.html' },
      { label: '原子力発電所の運転状況（リアルタイム）', url: 'https://www.kepco.co.jp/energy_supply/energy/nuclear_power/info/monitor/live_unten/index.html' },
      { label: '美浜発電所', url: 'https://www.kepco.co.jp/corporate/profile/community/mihama/index.html' },
      { label: '高浜発電所', url: 'https://www.kepco.co.jp/corporate/profile/community/takahama/index.html' },
      { label: '大飯発電所', url: 'https://www.kepco.co.jp/corporate/profile/community/ooi/index.html' },
    ],
  },
];

const examReady =
  allQuestions.filter((q) => q.category === 'company').length >= 30 &&
  allQuestions.filter((q) => q.category === 'society').length >= 30 &&
  allQuestions.filter((q) => q.category === 'business').length >= 20;

export default function HomePage({ onStartPractice, onStartPracticeBySource, onStartExam, onStartExplain }: Props) {
  const counts = {
    company: allQuestions.filter((q) => q.category === 'company').length,
    society: allQuestions.filter((q) => q.category === 'society').length,
    business: allQuestions.filter((q) => q.category === 'business').length,
  };

  const sourceCounts = getSourceCounts();
  const frequentCount = sourceCounts['frequent'] ?? 0;
  const frameworkCount = sourceCounts['mkt_framework'] ?? 0;
  const jijiCount = sourceCounts['jiji2026'] ?? 0;
  // 専用セクションを持つ source は資料別練習グリッドから除外する
  const excludedFromGrid = ['frequent', 'mkt_framework', 'jiji2026'];
  const availableSources = Object.entries(sourceCounts)
    .filter(([source, count]) => count >= 5 && !excludedFromGrid.includes(source))
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
                : counts[cat.value as 'company' | 'society' | 'business'];
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

      {frameworkCount > 0 && (
        <section className="section section-framework">
          <div className="framework-badge">③ ビジネス知識 特化</div>
          <h2 className="section-title">マーケティング・経営戦略フレームワーク</h2>
          <p className="section-desc">
            3C・PEST・SWOT・4P・5フォース・PPM・アンゾフなど、試験頻出のフレームワークを解説で学び、正誤問題で確認できます。
          </p>
          <div className="framework-btns">
            <button className="btn-framework btn-framework-explain" onClick={onStartExplain}>
              📖 解説で学ぶ
            </button>
            <button
              className="btn-framework btn-framework-quiz"
              onClick={() => onStartPracticeBySource('mkt_framework')}
            >
              ✍️ 問題を解く（{frameworkCount}問）
            </button>
          </div>
        </section>
      )}

      {jijiCount > 0 && (
        <section className="section section-jiji">
          <div className="jiji-badge">2026年 最新時事</div>
          <h2 className="section-title">2026年最新時事問題</h2>
          <p className="section-desc">
            2026年1〜6月の重要ニュース（政治・経済・国際・社会・科学など）を中心とした学習用の予想問題です。4択・解説つき。
          </p>
          <button
            className="btn-jiji"
            onClick={() => onStartPracticeBySource('jiji2026')}
          >
            📰 時事問題を解く（{jijiCount}問）
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

      <section className="section">
        <h2 className="section-title">出典・参考資料</h2>
        <p className="section-desc">
          問題は関西電力公式サイト（kepco.co.jp）内の公開情報を出典としています。原典はこちらから確認できます。
        </p>
        {REFERENCE_GROUPS.map((group) => (
          <details key={group.title} className="ref-group">
            <summary className="ref-summary">{group.title}</summary>
            <ul className="ref-list">
              {group.items.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </section>
    </div>
  );
}
