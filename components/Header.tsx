import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, CloseIcon, ChevronDownIcon } from './icons';
import ThemeToggle from './ThemeToggle';

interface NavLinkItem {
  to: string;
  text: string;
}

interface NavItemWithSublinks {
  text: string;
  subLinks: NavLinkItem[];
}

type NavItemType = NavLinkItem | NavItemWithSublinks;


const navLinks: NavItemType[] = [
    { to: '/', text: 'Home' },
    { to: '/about', text: 'About Us' },
    { to: '/pastors-corner', text: "Pastor's Corner" },
    {
        text: 'Spiritual Growth',
        subLinks: [
            { to: '/devotionals', text: 'Devotionals' },
            { to: '/blog', text: 'Blog' },
            { to: '/games', text: 'Bible Quiz' },
        ],
    },
    {
        text: 'Media',
        subLinks: [
            { to: '/gallery', text: 'Gallery' },
            { to: '/livestream', text: 'Livestream' },
        ],
    },
    { to: '/ministries', text: 'Ministries' },
    { to: '/events', text: 'Events' },
    { to: '/sermons', text: 'Sermons' },
    { to: '/connect', text: 'Connect' },
    { to: '/contact', text: 'Contact' },
];

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block py-2 px-3 rounded md:p-0 transition-colors duration-200 ${
        isActive
          ? 'text-white bg-church-maroon-dark md:bg-transparent md:text-yellow-300'
          : 'text-gray-300 hover:bg-church-maroon-dark md:hover:bg-transparent md:hover:text-white dark:hover:text-yellow-200'
      }`
    }
  >
    {children}
  </NavLink>
);

const DesktopDropdown: React.FC<{ item: NavItemWithSublinks }> = ({ item }) => (
  <div className="relative group">
    <button className="text-gray-300 hover:text-white dark:hover:text-yellow-200 flex items-center py-2 px-3 rounded md:p-0 transition-colors duration-200">
      {item.text}
      <ChevronDownIcon className="w-4 h-4 ml-1" />
    </button>
    <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        {item.subLinks.map(subLink => (
             <NavLink
                key={subLink.to}
                to={subLink.to}
                className={({ isActive }) =>
                    `block px-4 py-2 text-sm ${
                    isActive
                        ? 'bg-church-maroon text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-warm-gray dark:hover:bg-gray-700'
                    }`
                }
             >
                {subLink.text}
            </NavLink>
        ))}
    </div>
  </div>
);

const MobileDropdown: React.FC<{ item: NavItemWithSublinks; closeMenu: () => void }> = ({ item, closeMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-2 px-3 text-gray-300 hover:bg-church-maroon-dark rounded">
                {item.text}
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pl-4 border-l-2 border-church-maroon-dark">
                    {item.subLinks.map(subLink => (
                        <NavItem key={subLink.to} to={subLink.to} onClick={closeMenu}>{subLink.text}</NavItem>
                    ))}
                </div>
            )}
        </div>
    )
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);


  return (
    <header className="bg-church-maroon dark:bg-church-maroon-dark shadow-lg sticky top-0 z-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-white text-2xl font-bold">
              FBC Itire
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {navLinks.map((link) => 
                  'subLinks' in link 
                      ? <DesktopDropdown key={link.text} item={link} />
                      : <NavItem key={link.to} to={link.to}>{link.text}</NavItem>
                )}
              </div>
              <ThemeToggle />
              <NavLink
                to="/donate"
                className="bg-yellow-400 text-church-maroon-dark hover:bg-yellow-300 font-bold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                Donate
              </NavLink>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-church-maroon-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navLinks.map((link) => 
                'subLinks' in link 
                    ? <MobileDropdown key={link.text} item={link} closeMenu={closeMobileMenu} />
                    : <NavItem key={link.to} to={link.to} onClick={closeMobileMenu}>{link.text}</NavItem>
              )}
             <NavLink
                to="/donate"
                onClick={closeMobileMenu}
                className="block text-center mt-2 bg-yellow-400 text-church-maroon-dark hover:bg-yellow-300 font-bold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                Donate
              </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;