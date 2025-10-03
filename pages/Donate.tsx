
import React from 'react';

const Donate: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mb-4">Support Our Ministry</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Your generous giving allows us to continue our work in the community and spread the Gospel. Thank you for your partnership.
          </p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Donation Amount ($)</label>
              <input 
                type="number" 
                id="amount" 
                className="w-full max-w-xs mx-auto px-4 py-2 text-lg text-center border border-gray-300 rounded-md focus:ring-church-maroon focus:border-church-maroon bg-white text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., 50"
              />
            </div>
            
            <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600">$25</button>
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600">$50</button>
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600">$100</button>
                <button className="px-4 py-2 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:border-gray-600">$250</button>
            </div>
            
            <button className="w-full bg-yellow-400 text-church-maroon-dark hover:bg-yellow-300 font-bold py-4 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 text-xl">
              Donate Now
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
            This is a demonstration form. No actual transaction will be processed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
