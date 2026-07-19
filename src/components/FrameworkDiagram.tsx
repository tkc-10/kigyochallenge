// フレームワーク解説用のインラインSVG図。外部画像を使わず自作するため軽量で
// ダークモードにも追従する（fill/stroke に CSS 変数を使用）。

const ACCENT = '#8b5cf6';
const TINT = 'rgba(139,92,246,0.14)';

// 複数行テキスト（\n 区切り）を中央寄せで描く
function Lines({ text, x, y, size = 13, weight = 700, color = 'var(--text)' }: {
  text: string; x: number; y: number; size?: number; weight?: number; color?: string;
}) {
  const lines = text.split('\n');
  const lh = size + 3;
  const startY = y - ((lines.length - 1) * lh) / 2;
  return (
    <text x={x} textAnchor="middle" fontSize={size} fontWeight={weight} fill={color}>
      {lines.map((ln, i) => (
        <tspan key={i} x={x} y={startY + i * lh}>{ln}</tspan>
      ))}
    </text>
  );
}

type Cell = { label: string; hi?: boolean };

function Matrix2x2({ axisX, axisY, cols, rows, cells }: {
  axisX: string; axisY: string; cols: [string, string]; rows: [string, string]; cells: [Cell, Cell, Cell, Cell];
}) {
  const gx = [70, 185], gy = [54, 142]; const w = 113, h = 86;
  const cx = [gx[0] + w / 2, gx[1] + w / 2], cy = [gy[0] + h / 2, gy[1] + h / 2];
  const pos = [[cx[0], cy[0]], [cx[1], cy[0]], [cx[0], cy[1]], [cx[1], cy[1]]];
  return (
    <svg className="fw-diagram" viewBox="0 0 305 240" role="img">
      <text x={185} y={18} textAnchor="middle" fontSize={11} fontWeight={700} fill={ACCENT}>{axisX}</text>
      <text x={127.5} y={44} textAnchor="middle" fontSize={11} fill="var(--text-sub)">{cols[0]}</text>
      <text x={242.5} y={44} textAnchor="middle" fontSize={11} fill="var(--text-sub)">{cols[1]}</text>
      <text x={16} y={143} textAnchor="middle" fontSize={11} fontWeight={700} fill={ACCENT} transform="rotate(-90 16 143)">{axisY}</text>
      <text x={44} y={101} textAnchor="middle" fontSize={11} fill="var(--text-sub)">{rows[0]}</text>
      <text x={44} y={189} textAnchor="middle" fontSize={11} fill="var(--text-sub)">{rows[1]}</text>
      {[0, 1, 2, 3].map((i) => {
        const col = i % 2, row = i < 2 ? 0 : 1;
        return (
          <g key={i}>
            <rect x={gx[col]} y={gy[row]} width={w} height={h} rx={8}
              fill={cells[i].hi ? TINT : 'var(--surface)'} stroke={cells[i].hi ? ACCENT : 'var(--border)'} strokeWidth={cells[i].hi ? 2 : 1} />
            <Lines text={cells[i].label} x={pos[i][0]} y={pos[i][1]} color={cells[i].hi ? ACCENT : 'var(--text)'} />
          </g>
        );
      })}
    </svg>
  );
}

function Boxes4({ items }: { items: { title: string; sub?: string }[] }) {
  const gx = [16, 160], gy = [16, 108], w = 129, h = 84;
  return (
    <svg className="fw-diagram" viewBox="0 0 305 200" role="img">
      {items.slice(0, 4).map((it, i) => {
        const col = i % 2, row = i < 2 ? 0 : 1;
        const x = gx[col], y = gy[row], cx = x + w / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx={10} fill={TINT} stroke={ACCENT} strokeWidth={1.5} />
            <text x={cx} y={it.sub ? y + 34 : y + h / 2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={ACCENT}>{it.title}</text>
            {it.sub && (
              <text x={cx} y={y + 58} textAnchor="middle" fontSize={10.5} fill="var(--text-sub)">{it.sub}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function ThreeC() {
  return (
    <svg className="fw-diagram" viewBox="0 0 305 210" role="img">
      <circle cx={152} cy={80} r={62} fill={TINT} stroke={ACCENT} strokeWidth={1.5} />
      <circle cx={110} cy={150} r={62} fill={TINT} stroke={ACCENT} strokeWidth={1.5} />
      <circle cx={195} cy={150} r={62} fill={TINT} stroke={ACCENT} strokeWidth={1.5} />
      <text x={152} y={56} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text)">自社</text>
      <text x={152} y={72} textAnchor="middle" fontSize={9} fill="var(--text-sub)">Company</text>
      <text x={92} y={168} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text)">顧客</text>
      <text x={92} y={184} textAnchor="middle" fontSize={9} fill="var(--text-sub)">Customer</text>
      <text x={213} y={168} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--text)">競合</text>
      <text x={213} y={184} textAnchor="middle" fontSize={9} fill="var(--text-sub)">Competitor</text>
      <text x={152} y={132} textAnchor="middle" fontSize={12} fontWeight={800} fill={ACCENT}>KSF</text>
    </svg>
  );
}

function FiveForces() {
  const box = (x: number, y: number, w: number, h: number, t: string, hi = false) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={hi ? ACCENT : TINT} stroke={ACCENT} strokeWidth={1.5} />
      <Lines text={t} x={x + w / 2} y={y + h / 2 + 1} size={11} color={hi ? '#fff' : 'var(--text)'} />
    </g>
  );
  return (
    <svg className="fw-diagram" viewBox="0 0 305 230" role="img">
      <defs>
        <marker id="ff-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
        </marker>
      </defs>
      {box(92, 100, 120, 46, '既存競合との\n敵対関係', true)}
      {box(92, 12, 120, 40, '新規参入の脅威')}
      {box(92, 178, 120, 40, '代替品の脅威')}
      {box(4, 96, 82, 54, '売り手の\n交渉力')}
      {box(218, 96, 82, 54, '買い手の\n交渉力')}
      <line x1={152} y1={52} x2={152} y2={98} stroke={ACCENT} strokeWidth={1.5} markerEnd="url(#ff-arrow)" />
      <line x1={152} y1={178} x2={152} y2={148} stroke={ACCENT} strokeWidth={1.5} markerEnd="url(#ff-arrow)" />
      <line x1={86} y1={123} x2={90} y2={123} stroke={ACCENT} strokeWidth={1.5} markerEnd="url(#ff-arrow)" />
      <line x1={218} y1={123} x2={214} y2={123} stroke={ACCENT} strokeWidth={1.5} markerEnd="url(#ff-arrow)" />
    </svg>
  );
}

function ValueChain() {
  const support = ['全社管理', '人事労務', '技術開発', '調達'];
  const main = ['購買物流', '製造', '出荷物流', '販売・\nマーケ', 'サービス'];
  return (
    <svg className="fw-diagram" viewBox="0 0 305 210" role="img">
      <text x={10} y={12} fontSize={10} fontWeight={700} fill="var(--text-sub)">支援活動</text>
      {support.map((s, i) => (
        <g key={s}>
          <rect x={30} y={18 + i * 26} width={230} height={22} rx={5} fill={TINT} stroke="var(--border)" />
          <text x={145} y={33 + i * 26} textAnchor="middle" fontSize={11} fill="var(--text)">{s}</text>
        </g>
      ))}
      <text x={10} y={140} fontSize={10} fontWeight={700} fill="var(--text-sub)">主活動</text>
      {main.map((m, i) => {
        const w = 52, x = 8 + i * 54;
        return (
          <g key={i}>
            <path d={`M${x},146 h${w} l10,16 l-10,16 h-${w} l10,-16 Z`} fill={ACCENT} opacity={0.85} />
            <Lines text={m} x={x + w / 2 + 4} y={163} size={9.5} weight={700} color="#fff" />
          </g>
        );
      })}
      <path d="M286,146 l14,16 l-14,16 Z" fill={ACCENT} />
      <text x={302} y={188} textAnchor="end" fontSize={8.5} fill="var(--text-sub)">マージン</text>
    </svg>
  );
}

function StpFunnel() {
  const steps = [
    { t: 'S  Segmentation', s: '市場細分化', w: 280 },
    { t: 'T  Targeting', s: '標的市場の選定', w: 220 },
    { t: 'P  Positioning', s: '立ち位置の明確化', w: 160 },
  ];
  return (
    <svg className="fw-diagram" viewBox="0 0 305 210" role="img">
      {steps.map((st, i) => {
        const x = (305 - st.w) / 2, y = 10 + i * 66;
        return (
          <g key={i}>
            <rect x={x} y={y} width={st.w} height={46} rx={10} fill={TINT} stroke={ACCENT} strokeWidth={1.5} />
            <text x={152} y={y + 20} textAnchor="middle" fontSize={13} fontWeight={700} fill={ACCENT}>{st.t}</text>
            <text x={152} y={y + 37} textAnchor="middle" fontSize={10.5} fill="var(--text-sub)">{st.s}</text>
            {i < 2 && <text x={152} y={y + 61} textAnchor="middle" fontSize={14} fill={ACCENT}>▼</text>}
          </g>
        );
      })}
    </svg>
  );
}

function PurchaseFlow() {
  const rows = [
    { name: 'AIDMA', sub: 'マスメディア時代', chips: [['A', 'Attention'], ['I', 'Interest'], ['D', 'Desire'], ['M', 'Memory'], ['A', 'Action']] },
    { name: 'AISAS', sub: 'インターネット時代', chips: [['A', 'Attention'], ['I', 'Interest'], ['S', 'Search'], ['A', 'Action'], ['S', 'Share']] },
  ];
  return (
    <svg className="fw-diagram" viewBox="0 0 305 190" role="img">
      {rows.map((row, r) => {
        const y = 20 + r * 92;
        return (
          <g key={r}>
            <text x={8} y={y - 4} fontSize={12} fontWeight={800} fill={ACCENT}>{row.name}</text>
            <text x={62} y={y - 4} fontSize={9.5} fill="var(--text-sub)">{row.sub}</text>
            {row.chips.map((c, i) => {
              const x = 6 + i * 60;
              return (
                <g key={i}>
                  <rect x={x} y={y} width={48} height={40} rx={8} fill={TINT} stroke={ACCENT} strokeWidth={1.2} />
                  <text x={x + 24} y={y + 19} textAnchor="middle" fontSize={15} fontWeight={800} fill={ACCENT}>{c[0]}</text>
                  <text x={x + 24} y={y + 33} textAnchor="middle" fontSize={7.5} fill="var(--text-sub)">{c[1]}</text>
                  {i < 4 && <text x={x + 55} y={y + 25} textAnchor="middle" fontSize={12} fill="var(--text-sub)">›</text>}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

// 採用者分布（釣鐘）。chasm=true でキャズム位置を強調
function BellCurve({ chasm = false }: { chasm?: boolean }) {
  const segs = [
    { f0: 0, f1: 0.025, label: '①', pct: '2.5%' },
    { f0: 0.025, f1: 0.16, label: '②', pct: '13.5%' },
    { f0: 0.16, f1: 0.5, label: '③', pct: '34%' },
    { f0: 0.5, f1: 0.84, label: '④', pct: '34%' },
    { f0: 0.84, f1: 1, label: '⑤', pct: '16%' },
  ];
  const X0 = 18, X1 = 288, BASE = 150, H = 120;
  const px = (f: number) => X0 + (X1 - X0) * f;
  const g = (f: number) => Math.exp(-((f - 0.5) ** 2) / (2 * 0.16 ** 2));
  const py = (f: number) => BASE - H * g(f);
  const shades = ['#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'];
  const poly = (f0: number, f1: number) => {
    const pts: string[] = [`${px(f0)},${BASE}`];
    const N = 24;
    for (let i = 0; i <= N; i++) { const f = f0 + ((f1 - f0) * i) / N; pts.push(`${px(f)},${py(f)}`); }
    pts.push(`${px(f1)},${BASE}`);
    return pts.join(' ');
  };
  return (
    <svg className="fw-diagram" viewBox="0 0 305 180" role="img">
      {segs.map((s, i) => (
        <polygon key={i} points={poly(s.f0, s.f1)}
          fill={chasm ? '#e5e7eb' : shades[i]} stroke="#fff" strokeWidth={0.5}
          opacity={chasm ? 0.7 : 0.9} />
      ))}
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke="var(--border)" />
      {segs.map((s, i) => {
        const mid = (s.f0 + s.f1) / 2;
        return (
          <g key={i}>
            <text x={px(mid)} y={py(mid) - 4} textAnchor="middle" fontSize={11} fontWeight={800} fill={chasm ? 'var(--text-sub)' : '#fff'}>{s.label}</text>
            <text x={px(mid)} y={BASE + 14} textAnchor="middle" fontSize={8.5} fill="var(--text-sub)">{s.pct}</text>
          </g>
        );
      })}
      {chasm && (
        <g>
          <line x1={px(0.16)} y1={20} x2={px(0.16)} y2={BASE} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 3" />
          <text x={px(0.16)} y={14} textAnchor="middle" fontSize={11} fontWeight={800} fill="#ef4444">キャズム</text>
        </g>
      )}
    </svg>
  );
}

function Cycle({ nodes, label }: { nodes: string[]; label: string }) {
  const cx = 152, cy = 92, r = 58;
  const pts = nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / nodes.length;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
  return (
    <svg className="fw-diagram" viewBox="0 0 305 190" role="img">
      <defs>
        <marker id="cy-arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={ACCENT} />
        </marker>
      </defs>
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={ACCENT}>{label}</text>
      {pts.map((p, i) => {
        const n = pts[(i + 1) % pts.length];
        const mx = (p[0] + n[0]) / 2, my = (p[1] + n[1]) / 2;
        return <line key={i} x1={p[0]} y1={p[1]} x2={mx} y2={my} stroke={ACCENT} strokeWidth={1.5} markerEnd="url(#cy-arrow)" opacity={0.6} />;
      })}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r={26} fill={TINT} stroke={ACCENT} strokeWidth={1.5} />
          <Lines text={nodes[i]} x={p[0]} y={p[1] + 1} size={10} color="var(--text)" />
        </g>
      ))}
    </svg>
  );
}

export default function FrameworkDiagram({ id }: { id: string }) {
  switch (id) {
    case 'pest':
      return <Boxes4 items={[
        { title: 'P', sub: 'Politics 政治' }, { title: 'E', sub: 'Economy 経済' },
        { title: 'S', sub: 'Society 社会' }, { title: 'T', sub: 'Technology 技術' }]} />;
    case '3c':
      return <ThreeC />;
    case 'fiveforces':
      return <FiveForces />;
    case 'valuechain':
      return <ValueChain />;
    case 'swot':
      return <Matrix2x2 axisX="—" axisY="—" cols={['プラス要因', 'マイナス要因']} rows={['内部環境', '外部環境']}
        cells={[{ label: '強み\nStrength' }, { label: '弱み\nWeakness' }, { label: '機会\nOpportunity' }, { label: '脅威\nThreat' }]} />;
    case 'stp':
      return <StpFunnel />;
    case 'purchaseflow':
      return <PurchaseFlow />;
    case '4p':
      return <Boxes4 items={[
        { title: 'Product', sub: '製品' }, { title: 'Price', sub: '価格' },
        { title: 'Place', sub: '流通' }, { title: 'Promotion', sub: '販促' }]} />;
    case 'ansoff':
      return <Matrix2x2 axisX="製品" axisY="市場" cols={['既存製品', '新製品']} rows={['既存市場', '新市場']}
        cells={[{ label: '市場浸透' }, { label: '新製品開発' }, { label: '新市場開拓' }, { label: '多角化', hi: true }]} />;
    case 'ppm':
      return <Matrix2x2 axisX="市場シェア" axisY="市場成長率" cols={['高', '低']} rows={['高', '低']}
        cells={[{ label: '花形' }, { label: '問題児', hi: true }, { label: '金のなる木' }, { label: '負け犬' }]} />;
    case 'porter':
      return <Matrix2x2 axisX="競争優位の源泉" axisY="戦略ターゲット" cols={['低コスト', '差別化']} rows={['広い', '狭い']}
        cells={[{ label: 'コスト\nリーダーシップ' }, { label: '差別化' }, { label: 'コスト集中' }, { label: '差別化集中' }]} />;
    case 'innovator':
      return <BellCurve />;
    case 'chasm':
      return <BellCurve chasm />;
    case 'cycle':
      return (
        <div className="fw-cycle-pair">
          <Cycle label="PDCA" nodes={['Plan\n計画', 'Do\n実行', 'Check\n評価', 'Action\n改善']} />
          <Cycle label="OODA" nodes={['Observe\n観察', 'Orient\n判断', 'Decide\n決定', 'Act\n行動']} />
        </div>
      );
    case 'positions':
      return <Boxes4 items={[
        { title: 'リーダー', sub: '全方位戦略' }, { title: 'チャレンジャー', sub: '差別化で攻撃' },
        { title: 'フォロワー', sub: '模倣・コスト' }, { title: 'ニッチャー', sub: '狭い領域に集中' }]} />;
    case 'bsc':
      return <Boxes4 items={[
        { title: '財務', sub: '財務の視点' }, { title: '顧客', sub: '顧客の視点' },
        { title: '業務プロセス', sub: '内部プロセス' }, { title: '学習と成長', sub: '人材・変革' }]} />;
    default:
      return null;
  }
}
