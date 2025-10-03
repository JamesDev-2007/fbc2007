
import React from 'react';
import Quiz from '../components/Quiz';

const Games: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-8 px-4">
        <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Bible Quiz Game</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Test your knowledge of the Bible with our fun quiz!
        </p>
      </div>
      <div className="w-full px-4">
        <Quiz />
      </div>
    </div>
  );
};

export default Games;