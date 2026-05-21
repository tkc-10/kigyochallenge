import type { Question } from '../types';

// サンプル問題（資料共有後に大量追加予定）
const questions: Question[] = [
  // ① 当社事業（company）- サンプル
  {
    id: 1,
    category: 'company',
    text: '関西電力の本社が所在する都市はどこか。',
    options: ['東京都', '大阪市', '京都市', '神戸市'],
    correctIndex: 1,
    explanation: '関西電力の本社は大阪市北区中之島に所在しています。',
  },
  {
    id: 2,
    category: 'company',
    text: '関西電力が運営する原子力発電所として正しいものはどれか。',
    options: ['福島第一原子力発電所', '柏崎刈羽原子力発電所', '大飯原子力発電所', '東海原子力発電所'],
    correctIndex: 2,
    explanation: '大飯原子力発電所（福井県おおい町）は関西電力が運営しています。',
  },
  {
    id: 3,
    category: 'company',
    text: '次の記述のうち、関西電力グループの事業領域として誤っているものはどれか。',
    options: ['電力の小売・供給', '都市ガス事業', '情報通信事業', '航空輸送事業'],
    correctIndex: 3,
    explanation: '関西電力グループは電力・ガス・情報通信・不動産など幅広く展開していますが、航空輸送事業は行っていません。',
  },

  // ② 社会・経済（society）- サンプル
  {
    id: 101,
    category: 'society',
    text: '2025年に発足したトランプ米政権が就任直後に離脱を表明した国際的な枠組みとして正しいものはどれか。',
    options: ['国連安全保障理事会', 'パリ協定', 'G7サミット', 'WTO'],
    correctIndex: 1,
    explanation: 'トランプ大統領は2025年1月の就任直後にパリ協定からの離脱を表明しました。',
  },
  {
    id: 102,
    category: 'society',
    text: '2025年の日本の物価上昇（インフレ）に関する記述として最も適切なものはどれか。',
    options: [
      '日銀は2025年中にマイナス金利政策を新たに導入した',
      '消費者物価指数（CPI）は前年比でマイナスが続いた',
      '日銀は政策金利を段階的に引き上げた',
      '政府は物価安定のため大規模な増税を実施した',
    ],
    correctIndex: 2,
    explanation: '日本銀行は2024年のマイナス金利解除に続き、2025年も物価目標達成に向け政策金利を段階的に引き上げました。',
  },
  {
    id: 103,
    category: 'society',
    text: '次のうち、2025年に開催された国際的なイベントとして正しいものはどれか。',
    options: ['大阪・関西万博', '東京オリンピック', 'FIFA ワールドカップ（日本開催）', '北海道洞爺湖サミット'],
    correctIndex: 0,
    explanation: '大阪・関西万博は2025年4月〜10月に開催されました。テーマは「いのち輝く未来社会のデザイン」です。',
  },

  // ③ ビジネス知識（business）- サンプル
  {
    id: 201,
    category: 'business',
    text: '損益計算書（P/L）において、売上総利益から販売費及び一般管理費を差し引いて求める利益を何というか。',
    options: ['営業利益', '経常利益', '純利益', '税引前利益'],
    correctIndex: 0,
    explanation: '売上総利益（粗利）から販売費及び一般管理費を差し引いたものが営業利益です。本業の儲けを示す指標です。',
  },
  {
    id: 202,
    category: 'business',
    text: 'マーケティングの「4P」に含まれないものはどれか。',
    options: ['Price（価格）', 'Place（流通）', 'People（人材）', 'Promotion（プロモーション）'],
    correctIndex: 2,
    explanation: '4PはProduct・Price・Place・Promotionです。People（人材）は4Pには含まれません（7Pには含まれます）。',
  },
  {
    id: 203,
    category: 'business',
    text: 'ROE（自己資本利益率）の計算式として正しいものはどれか。',
    options: [
      '当期純利益 ÷ 総資産 × 100',
      '当期純利益 ÷ 自己資本 × 100',
      '営業利益 ÷ 売上高 × 100',
      '経常利益 ÷ 自己資本 × 100',
    ],
    correctIndex: 1,
    explanation: 'ROE（Return on Equity）は「当期純利益 ÷ 自己資本 × 100」で算出し、株主資本の効率性を示します。',
  },
];

export default questions;
