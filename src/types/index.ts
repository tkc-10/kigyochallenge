export type Category = 'company' | 'society' | 'business';

export interface Question {
  id: number;
  category: Category;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

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
