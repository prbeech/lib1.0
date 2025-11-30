import React, { useState } from 'react';
import { ViewState } from '../types';
import { BookOpen, LayoutDashboard, Armchair, Library, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  const navClass = (view: ViewState) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
      currentView === view
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-100'
    }`;

  const mobileNavClass = (view: ViewState) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium w-full ${
      currentView === view
        ? 'bg-blue-50 text-blue-700'
        : 'text-slate-600 hover:bg-slate-50'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
            <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
              <Library className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">LibFlow</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            <button onClick={() => handleNavigate('dashboard')} className={navClass('dashboard')}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>
            <button onClick={() => handleNavigate('recommendations')} className={navClass('recommendations')}>
              <BookOpen size={18} />
              <span>AI Librarian</span>
            </button>
            <button onClick={() => handleNavigate('seats')} className={navClass('seats')}>
              <Armchair size={18} />
              <span>Live Seats</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg animate-fade-in-down">
          <div className="p-4 flex flex-col gap-2">
            <button onClick={() => handleNavigate('dashboard')} className={mobileNavClass('dashboard')}>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </button>
            <button onClick={() => handleNavigate('recommendations')} className={mobileNavClass('recommendations')}>
              <BookOpen size={20} />
              <span>AI Librarian</span>
            </button>
            <button onClick={() => handleNavigate('seats')} className={mobileNavClass('seats')}>
              <Armchair size={20} />
              <span>Live Seats</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;