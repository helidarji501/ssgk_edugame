import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePlayer } from '../store/useGameStore.js';
import Avatar from './Avatar.jsx';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const player = usePlayer();



  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/games', label: 'Games' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-[#F8F9FC]/80 backdrop-blur-md border-b border-navy/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo — Left Col */}
          <div className="flex justify-start">
            <Link to="/" className="flex items-center gap-2 shrink-0 group">
              <span className="text-3xl transition-transform group-hover:scale-110">🧮</span>
              <span className="text-xl font-heading font-extrabold text-navy tracking-tight">
                MathQuest
              </span>
            </Link>
          </div>

          {/* Center nav — Middle Col (Always Centered) */}
          <div className="hidden md:flex justify-center items-center gap-2 font-body">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive(to)
                    ? 'text-white bg-navy shadow-lg shadow-navy/20'
                    : 'text-navy/70 hover:text-pink hover:bg-pink/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right — player info — Right Col */}
          <div className="flex justify-end items-center">
            {location.pathname !== '/tug-of-war' ? (
              <div className="hidden md:flex items-center gap-4 font-body relative">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy/5 text-navy text-sm font-bold border border-navy/10">
                  <span className="text-pink">⭐</span>
                  <span>{player.totalStars}</span>
                </div>
                
                {/* Avatar Dropdown Trigger */}
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="p-0.5 rounded-full border-2 border-pink/20 transition-all hover:border-pink hover:scale-105 active:scale-95 flex items-center justify-center outline-none"
                  title={player.playerName || 'Player'}
                >
                  <Avatar avatarId={player.avatarId} size="sm" />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-navy/5 py-3 z-[60] animate-fade-rise overflow-hidden">
                    <ul className="font-mono text-[11px] font-bold uppercase tracking-widest text-navy">
                      <li>
                        <Link 
                          to="/profile" 
                          className="flex items-center px-6 py-3 hover:bg-pink/5 hover:text-pink transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/dashboard" 
                          className="flex items-center px-6 py-3 hover:bg-pink/5 hover:text-pink transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/settings" 
                          className="flex items-center px-6 py-3 hover:bg-pink/5 hover:text-pink transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/earnings" 
                          className="flex items-center px-6 py-3 hover:bg-pink/5 hover:text-pink transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Earnings
                        </Link>
                      </li>
                      <li className="border-t border-navy/5 mt-2 pt-2">
                        <button 
                          className="flex w-full items-center px-6 py-3 text-red-500 hover:bg-red-50 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          Sign Out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              /* Empty spacer for the grid when in game */
              <div className="hidden md:block w-32" />
            )}

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-navy hover:text-pink p-2 transition-colors ml-4"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-navy/5 bg-off-white/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-2 font-body">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive(to)
                    ? 'bg-navy text-white shadow-lg'
                    : 'text-navy/70 hover:text-pink hover:bg-pink/5'
                }`}

              >
                {label}
              </Link>
            ))}
            {/* Player row */}
            {location.pathname !== '/tug-of-war' && (
              <div className="flex items-center gap-4 pt-4 border-t border-navy/5 mt-4">
                <div className="p-0.5 rounded-full border-2 border-pink/20">
                  <Avatar avatarId={player.avatarId} size="sm" />
                </div>
                <span className="text-navy font-bold">
                  {player.playerName || 'Player'}
                </span>
                <span className="ml-auto px-3 py-1 rounded-full bg-navy text-white text-sm font-bold flex items-center gap-2">
                  <span className="text-pink">⭐</span> {player.totalStars}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>

  );
}
