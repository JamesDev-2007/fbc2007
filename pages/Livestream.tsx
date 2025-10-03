
import React from 'react';
import { NavLink } from 'react-router-dom';

const Livestream: React.FC = () => {
  return (
    <div className="bg-warm-gray dark:bg-gray-900 py-12 md:py-20 font-open-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Join Our Service Live</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            We're glad to have you worship with us, wherever you are.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
             <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
             </iframe>
          </div>
        </div>
        
        <div className="mt-10 text-center">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Service Times</h3>
            <p className="text-md text-gray-600 dark:text-gray-400 mt-2">
                Sundays @ <strong>10:00 AM</strong> | Tuesdays @ <strong>6:00 PM</strong> | Wednesdays @ <strong>7:00 PM</strong>
            </p>
            <div className="mt-6">
                <NavLink to="/sermons" className="bg-church-maroon hover:bg-church-maroon-dark text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
                    Watch Past Sermons
                </NavLink>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Livestream;
