
import React, { useState } from 'react';
import { quizQuestions } from '../data/mockData';
import type { QuizQuestion } from '../types';

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion: QuizQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerClick = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-6">Your final score is {score} out of {quizQuestions.length}.</p>
        <button
          onClick={restartQuiz}
          className="bg-church-maroon text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-church-maroon-dark transition-all duration-200 transform hover:scale-105"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mt-2">{currentQuestion.question}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;
          let buttonClass = 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200';
          if (showFeedback) {
            if (isCorrect) {
              buttonClass = 'bg-green-500 text-white';
            } else if (isSelected && !isCorrect) {
              buttonClass = 'bg-red-500 text-white';
            } else {
              buttonClass = 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
              className={`w-full p-4 rounded-lg text-left font-semibold transition-all duration-200 transform hover:scale-105 ${buttonClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {showFeedback && (
        <div className="mt-6 text-center">
            <p className="font-bold text-lg mb-4">
                {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : `Sorry, the correct answer was: ${currentQuestion.correctAnswer}`}
            </p>
          <button
            onClick={handleNextQuestion}
            className="bg-church-maroon text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-church-maroon-dark transition-transform transform hover:scale-105"
          >
            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;