import React from 'react';
import { ViewState } from '../types';
import { BookOpen, LayoutDashboard, Armchair, Library } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const navClass = (view: ViewState) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      currentView === view
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <Library className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">LibFlow</span>
          </div>

          <nav className="hidden md:flex gap-2">
            <button onClick={() => onNavigate('dashboard')} className={navClass('dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button onClick={() => onNavigate('recommendations')} className={navClass('recommendations')}>
              <BookOpen size={18} />
              <span>AI Librarian</span>
            </button>
            <button onClick={() => onNavigate('seats')} className={navClass('seats')}>
              <Armchair size={18} />
              <span>Live Seats</span>
            </button>
          </nav>

          {/* Mobile Menu Button (simplified for this demo) */}
          <div className="md:hidden">
            <button className="text-slate-600 p-2">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;