export type Category = 'company' | 'society' | 'business' | 'current';

export interface Question {
  id: number;
  category: Category;
  source?: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const SOURCE_LABELS: Record<string, string> = {
  governance: 'コーポレートガバナンス・ガイドライン',
  keiei2026: '経営計画2026',
  kessan2025: '2025年度決算説明資料',
  zerocarbon_vision: 'ゼロカーボンビジョン2050',
  zerocarbon_roadmap: 'ゼロカーボンロードマップ',
  conduct: '関西電力グループ行動憲章',
  report2025: '統合報告書2025',
};

// 各資料の公式（公開）URL。資料別練習カードから原典を参照できるようにする。
export const SOURCE_URLS: Record<string, string> = {
  governance:
    'https://www.kepco.co.jp/ir/policy/governance/images/pdf/corporate_governance_guideline.pdf',
  keiei2026: 'https://www.kepco.co.jp/corporate/policy/pdf/plan_2026.pdf',
  kessan2025:
    'https://www.kepco.co.jp/ir/brief/earnings/2026/pdf/pdf2026_04_05.pdf',
  zerocarbon_vision:
    'https://www.kepco.co.jp/sustainability/environment/zerocarbon/index.html',
  zerocarbon_roadmap:
    'https://www.kepco.co.jp/sustainability/environment/zerocarbon/roadmap.html',
  conduct: 'https://www.kepco.co.jp/corporate/policy/charter/index.html',
  report2025: 'https://www.kepco.co.jp/corporate/report/integrated/',
};

export type QuizMode = 'practice' | 'exam';

export interface AnswerRecord {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
}

export interface ExamSession {
  mode: QuizMode;
  questions: Question[];
  answers: AnswerRecord[];
  startedAt: Date;
  finishedAt?: Date;
}
