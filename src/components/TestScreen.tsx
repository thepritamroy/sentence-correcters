import { useState, useEffect } from 'react';
import BlankSpaceQuestion from './BlankSpaceQuestion';
import FeedbackScreen from './FeedbackScreen';
import { Question, UserAnswer } from '../types/types';


const TestScreen: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [displayAnimation, setDisplayAnimation] = useState(false);

  useEffect(() => {

    const getQuestions = async () => {
      try {
        const res = await fetch('/data.json');
        const quizData = await res.json();
        setQuestions(quizData.data.questions);
      }
      catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    getQuestions();
  }, []);

  useEffect(() => {
    setDisplayAnimation(true);
              setTimeout(() => {
                setDisplayAnimation(false);
              }, 500); // Duration of the animation
  },[currentQuestionIndex]);

  const handleAnswerSubmit = (answers: string[]) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answers.every(
      (answer, index) => answer === currentQuestion.correctAnswer[index]
    );

    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.questionId,
      answers,
      isCorrect,
    };

    setUserAnswers([...userAnswers, newUserAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleTimeout = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const answers = Array(currentQuestion.correctAnswer.length).fill('');

    const newUserAnswer: UserAnswer = {
      questionId: currentQuestion.questionId,
      answers,
      isCorrect: false,
    };

    setUserAnswers([...userAnswers, newUserAnswer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  if (questions.length === 0) {
    return <div className="text-center py-10">Loading questions...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <FeedbackScreen
          userAnswers={userAnswers}
          questions={questions}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <section className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className="py-10 px-4">
        <BlankSpaceQuestion
          question={questions[currentQuestionIndex]}
          onAnswerSubmit={handleAnswerSubmit}
          onTimeout={handleTimeout}
          timeLimit={30}
          fadeIn={displayAnimation}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      </div>
    </section>
  );
};

export default TestScreen;