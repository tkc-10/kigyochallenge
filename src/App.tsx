import { useQuiz } from './hooks/useQuiz';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import './App.css';

export default function App() {
  const quiz = useQuiz();

  if (quiz.state === 'idle') {
    return (
      <HomePage
        onStartPractice={quiz.startPractice}
        onStartExam={quiz.startExam}
      />
    );
  }

  if (quiz.state === 'answering' && quiz.currentQuestion) {
    return (
      <QuizPage
        mode={quiz.mode}
        question={quiz.currentQuestion}
        questionNumber={quiz.currentIndex + 1}
        totalQuestions={quiz.questions.length}
        selectedIndex={quiz.selectedIndex}
        showExplanation={quiz.showExplanation}
        onSelect={quiz.selectOption}
        onNext={quiz.next}
        onSubmitExam={quiz.submitExam}
        onAbort={quiz.restart}
      />
    );
  }

  if (quiz.state === 'finished') {
    return (
      <ResultPage
        questions={quiz.questions}
        answers={quiz.answers}
        onRestart={quiz.restart}
      />
    );
  }

  return null;
}
