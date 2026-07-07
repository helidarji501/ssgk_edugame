import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();



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

          {/* Right Col — Empty Spacer */}
          <div className="flex justify-end items-center">
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

          </div>
        </div>
      )}
    </nav>

  );
}
