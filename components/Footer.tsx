import React from 'react';
import { NavLink } from 'react-router-dom';
import { FacebookIcon, XIcon, YouTubeIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-church-maroon-dark text-gray-300 font-poppins">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-white">FBC Itire</h3>
            <p className="mt-2 text-sm text-gray-400">First Baptist Church Itire<br />123 Church Street, Itire, Lagos, Nigeria</p>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/about" className="hover:text-yellow-300">About Us</NavLink></li>
              <li><NavLink to="/sermons" className="hover:text-yellow-300">Sermons</NavLink></li>
              <li><NavLink to="/events" className="hover:text-yellow-300">Events</NavLink></li>
              <li><NavLink to="/connect" className="hover:text-yellow-300">Connect</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-yellow-300">Contact</NavLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Connect</h4>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/ministries" className="hover:text-yellow-300">Ministries</NavLink></li>
              <li><NavLink to="/prayer" className="hover:text-yellow-300">Prayer Request</NavLink></li>
              <li><NavLink to="/donate" className="hover:text-yellow-300">Donate</NavLink></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-300" aria-label="Facebook"><FacebookIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-300" aria-label="X (Twitter)"><XIcon className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-yellow-300" aria-label="YouTube"><YouTubeIcon className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} First Baptist Church Itire. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;