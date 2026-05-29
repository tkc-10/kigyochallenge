export type Category = 'company' | 'society' | 'business';

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
