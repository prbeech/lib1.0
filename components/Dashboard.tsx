import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Book, Users, Clock, Search } from 'lucide-react';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative px-8 py-20 md:px-12 md:py-24 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-blue-400">LibFlow</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Experience the future of library management. Find your perfect study spot instantly or let our AI guide your next literary adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onNavigate('seats')}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Find a Seat
            </button>
            <button 
              onClick={() => onNavigate('recommendations')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Get Book Recs
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats / Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigate('seats')}
          className="group cursor-pointer bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <Users className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Live Capacity</h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            Check real-time occupancy across all 3 library zones. Find a quiet corner instantly.
          </p>
          <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
            Check Availability <ArrowRight size={16} className="ml-1" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('recommendations')}
          className="group cursor-pointer bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
             <Book className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">AI Recommendations</h3>
          <p className="text-slate-500 leading-relaxed mb-4">
            Powered by Gemini 2.5 Flash. Get personalized reading lists based on your mood and taste.
          </p>
          <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
            Try AI Librarian <ArrowRight size={16} className="ml-1" />
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
             <Clock className="text-orange-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Library Hours</h3>
          <div className="space-y-2 mt-4 text-sm">
            <div className="flex justify-between text-slate-600 border-b border-slate-50 pb-2">
                <span>Mon - Fri</span>
                <span className="font-semibold text-slate-900">8:00 AM - 10:00 PM</span>
            </div>
            <div className="flex justify-between text-slate-600 pb-2">
                <span>Weekends</span>
                <span className="font-semibold text-slate-900">10:00 AM - 6:00 PM</span>
            </div>
          </div>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
            Open Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;