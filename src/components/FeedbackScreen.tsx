 import React from 'react';
import { Question, UserAnswer } from '../types/types';

interface FeedbackScreenProps {
  userAnswers: UserAnswer[];
  questions: Question[];
  onRestart: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  userAnswers,
  questions,
  onRestart,
}) => {
  const correctCount = userAnswers.filter((answer) => answer.isCorrect).length;
  const totalQuestions = questions.length;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>
      
      <div className="mb-8 text-center">
        <div className="text-4xl font-bold mb-2">
          {correctCount} / {totalQuestions}
        </div>
        <div className="text-xl mb-4">{scorePercentage}%</div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer.isCorrect;

          return (
            <div
              key={question.questionId}
              className={`p-4 rounded-lg border ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}
            >
              <div className="font-semibold mb-2">
                Question {index + 1}: {isCorrect ? '✓' : '✗'}
              </div>
              <div className="mb-3">
                {question.question.split('_____________').map((part, i) => (
                  <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < question.question.split('_____________').length - 1 && (
                      <span
                        className={`inline-block mx-1 px-2 py-1 rounded ${
                          isCorrect
                            ? 'bg-green-100 text-green-800'
                            : userAnswer.answers[i] === question.correctAnswer[i]
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {userAnswer.answers[i] || 'Empty'}
                        {!isCorrect && (
                          <span className="ml-2 text-xs text-gray-500">
                            (Correct: {question.correctAnswer[i]})
                          </span>
                        )}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center flex gap-5 justify-center">
        <button
          onClick={onRestart}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>

        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;