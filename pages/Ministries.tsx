
import React from 'react';
import { ministries } from '../data/mockData';
import type { Ministry } from '../types';

const MinistryCard: React.FC<{ ministry: Ministry }> = ({ ministry }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2">
    <img src={ministry.imageUrl} alt={ministry.name} className="w-full h-48 object-cover"/>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mb-2">{ministry.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{ministry.description}</p>
      <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">Leader: {ministry.leader}</p>
    </div>
  </div>
);


const Ministries: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Ministries</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Serving God by serving others. Find a place to connect and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {ministries.map(ministry => (
            <MinistryCard key={ministry.id} ministry={ministry} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ministries;