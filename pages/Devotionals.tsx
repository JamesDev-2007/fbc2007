import React from 'react';
import DailyScripture from '../components/DailyScripture';

const Devotionals: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Daily Devotionals</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start your day with encouragement from God's Word.
          </p>
        </div>

        <DailyScripture />

        <div className="mt-12 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-center text-church-maroon dark:text-yellow-400 mb-4 font-poppins">The Purpose of Devotionals</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    A daily devotional is a set-aside time to read a passage of scripture, reflect on its meaning, and connect with God through prayer. It's a spiritual discipline that helps us to center our hearts and minds on what is true, noble, right, pure, lovely, and admirable.
                </p>
                <p>
                    Spending even a few minutes in God's Word each day can transform our perspective, deepen our faith, and equip us to face life's challenges with hope and strength. We encourage you to make this a regular part of your daily routine.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Devotionals;
