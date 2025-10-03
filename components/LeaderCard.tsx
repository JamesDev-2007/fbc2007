
import React from 'react';
import type { Leader } from '../types';

interface LeaderCardProps {
  leader: Leader;
  onReadMore: (leader: Leader) => void;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader, onReadMore }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center flex flex-col items-center border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img
        src={leader.imageUrl}
        alt={leader.name}
        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-warm-gray dark:border-gray-700"
      />
      <h3 className="text-xl font-bold font-poppins text-church-maroon dark:text-yellow-400">{leader.name}</h3>
      <p className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-3">{leader.position}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">{leader.shortBio}</p>
      <button
        onClick={() => onReadMore(leader)}
        className="mt-4 bg-church-maroon-dark text-white font-semibold py-2 px-5 rounded-full hover:bg-church-maroon transition-colors duration-200"
      >
        Read More
      </button>
    </div>
  );
};

export default LeaderCard;
