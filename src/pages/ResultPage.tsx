import type { AnswerRecord, Question } from '../types';

const CATEGORY_LABEL: Record<string, string> = {
  company: '① 当社事業',
  society: '② 社会・経済',
  business: '③ ビジネス知識',
};

interface Props {
  questions: Question[];
  answers: AnswerRecord[];
  onRestart: () => void;
}

export default function ResultPage({ questions, answers, onRestart }: Props) {
  const score = answers.filter((a) => a.isCorrect).length;
  const total = answers.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const wrongAnswers = answers
    .filter((a) => !a.isCorrect)
    .map((a) => ({
      record: a,
      question: questions.find((q) => q.id === a.questionId)!,
    }))
    .filter((x) => x.question);

  const byCategory = ['company', 'society', 'business'].map((cat) => {
    const catAnswers = answers.filter(
      (a) => questions.find((q) => q.id === a.questionId)?.category === cat
    );
    const correct = catAnswers.filter((a) => a.isCorrect).length;
    return { cat, correct, total: catAnswers.length };
  });

  return (
    <div className="result-page">
      <div className="result-header">
        <div className={`result-score-circle ${pct >= 70 ? 'pass' : 'fail'}`}>
          <span className="score-pct">{pct}%</span>
          <span className="score-label">{score} / {total}</span>
        </div>
        <p className="result-message">
          {pct >= 80 ? '素晴らしい！本番も自信を持って。' :
           pct >= 60 ? 'もう少し！復習して再挑戦しよう。' :
           '苦手分野を重点的に復習しよう。'}
        </p>
      </div>

      <div className="result-breakdown">
        {byCategory.map(({ cat, correct, total: t }) =>
          t > 0 ? (
            <div key={cat} className="breakdown-row">
              <span className="breakdown-label">{CATEGORY_LABEL[cat]}</span>
              <div className="breakdown-bar-wrap">
                <div
                  className="breakdown-bar"
                  style={{ width: `${(correct / t) * 100}%` }}
                />
              </div>
              <span className="breakdown-count">{correct}/{t}</span>
            </div>
          ) : null
        )}
      </div>

      {wrongAnswers.length > 0 && (
        <div className="wrong-section">
          <h2>間違えた問題の復習</h2>
          {wrongAnswers.map(({ record, question }) => (
            <div key={record.questionId} className="wrong-card">
              <p className="wrong-q">{question.text}</p>
              <p className="wrong-your">
                あなたの答え：<span className="wrong-ans">{question.options[record.selectedIndex]}</span>
              </p>
              <p className="wrong-correct">
                正解：<span className="correct-ans">{question.options[question.correctIndex]}</span>
              </p>
              {question.explanation && (
                <p className="wrong-exp">{question.explanation}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <button className="btn-restart" onClick={onRestart}>
        トップへ戻る
      </button>
    </div>
  );
}
