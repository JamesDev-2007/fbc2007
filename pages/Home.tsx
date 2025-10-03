// FIX: Create Home.tsx file to resolve "not a module" error.
import React from 'react';
import { NavLink } from 'react-router-dom';
import Countdown from '../components/Countdown';
import DailyBibleVerse from '../components/DailyBibleVerse';
import { ministries } from '../data/mockData';
import { events } from '../data/mockData';

const Home: React.FC = () => {
  const latestEvent = events[0];

  return (
    <div className="font-open-sans">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white h-[60vh] md:h-[70vh]" style={{ backgroundImage: "url('https://picsum.photos/1200/800?random=0')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins leading-tight">Welcome to First Baptist Church Itire</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl">A family of faith, hope, and love. Join us this Sunday!</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <NavLink to="/about" className="bg-church-maroon hover:bg-church-maroon-dark font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
              Learn More About Us
            </NavLink>
            <NavLink to="/events" className="bg-yellow-400 text-church-maroon-dark hover:bg-yellow-300 font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105">
              See Upcoming Events
            </NavLink>
          </div>
        </div>
      </section>

      {/* Countdown to Next Service */}
      <Countdown />

      {/* Ministries Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins">Our Ministries</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Find your place to connect, grow, and serve.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministries.slice(0, 4).map(ministry => (
              <div key={ministry.id} className="text-center p-6 bg-warm-gray dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <img src={ministry.imageUrl} alt={ministry.name} className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-white dark:border-gray-500 shadow-md" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{ministry.name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{ministry.description.substring(0, 70)}...</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <NavLink to="/ministries" className="text-church-maroon-dark dark:text-yellow-300 font-semibold hover:underline">
              View All Ministries &rarr;
            </NavLink>
          </div>
        </div>
      </section>
      
      {/* Daily Bible Verse */}
      <DailyBibleVerse />

      {/* Upcoming Event Highlight */}
      {latestEvent && (
        <section className="py-12 md:py-20 bg-warm-gray dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <div>
                <h3 className="text-sm font-bold uppercase text-yellow-500 tracking-wider">Upcoming Event</h3>
                <h2 className="text-3xl font-bold text-church-maroon dark:text-yellow-400 font-poppins mt-2">{latestEvent.title}</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">{latestEvent.description}</p>
                <div className="mt-6 text-gray-800 dark:text-gray-200">
                  <p><strong>Date:</strong> {new Date(latestEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Time:</strong> {latestEvent.time}</p>
                  <p><strong>Location:</strong> {latestEvent.location}</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img src="https://picsum.photos/600/400?random=11" alt="Church event" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Home;