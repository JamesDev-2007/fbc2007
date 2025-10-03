import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PastorsCorner from './pages/PastorsCorner';
import Ministries from './pages/Ministries';
import Events from './pages/Events';
import Sermons from './pages/Sermons';
import Blog from './pages/Blog';
import Connect from './pages/Connect';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Games from './pages/Games';
import PrayerRequest from './pages/PrayerRequest';
import Chatbot from './components/Chatbot';
import { ThemeProvider } from './contexts/ThemeContext';
import Gallery from './pages/Gallery';
import Livestream from './pages/Livestream';
import Devotionals from './pages/Devotionals';

const Layout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the new page on navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <div className="site-background font-open-sans text-gray-800 dark:text-gray-200 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pastors-corner" element={<PastorsCorner />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/games" element={<Games />} />
            <Route path="/prayer" element={<PrayerRequest />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/livestream" element={<Livestream />} />
            <Route path="/devotionals" element={<Devotionals />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};


const App: React.FC = () => {
  return (
    <HashRouter>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;