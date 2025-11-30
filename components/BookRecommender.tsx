import React, { useState } from 'react';
import { UserPreferences, Book } from '../types';
import { getBookRecommendations } from '../services/aiService';
import { Sparkles, BookOpen, Send, Loader2, Bookmark } from 'lucide-react';

const BookRecommender: React.FC = () => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    favoriteGenres: '',
    lastRead: '',
    mood: ''
  });
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrefs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prefs.favoriteGenres && !prefs.mood) {
      setError("Please fill in at least the genres or mood.");
      return;
    }
    
    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const books = await getBookRecommendations(prefs);
      setRecommendations(books);
    } catch (err) {
      setError("Failed to generate recommendations. Please check your API Key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">AI Literary Assistant</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Tell us what you're into, and our Gemini-powered librarian will curate a personalized reading list just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 space-y-6 sticky top-24">
            <div>
              <label htmlFor="favoriteGenres" className="block text-sm font-semibold text-slate-700 mb-2">Favorite Genres / Topics</label>
              <input
                type="text"
                id="favoriteGenres"
                name="favoriteGenres"
                value={prefs.favoriteGenres}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-800"
                placeholder="Sci-Fi, History, Romance..."
              />
            </div>

            <div>
              <label htmlFor="lastRead" className="block text-sm font-semibold text-slate-700 mb-2">Last Book You Enjoyed</label>
              <input
                type="text"
                id="lastRead"
                name="lastRead"
                value={prefs.lastRead}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-800"
                placeholder="The Great Gatsby"
              />
            </div>

            <div>
              <label htmlFor="mood" className="block text-sm font-semibold text-slate-700 mb-2">Current Mood / Goal</label>
              <textarea
                id="mood"
                name="mood"
                value={prefs.mood}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-800 resize-none"
                placeholder="I want something uplifting to read on a vacation..."
              />
            </div>

            {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transform transition hover:-translate-y-1 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Thinking...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Get Recommendations</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Display */}
        <div className="lg:col-span-2">
          {recommendations.length > 0 ? (
            <div className="space-y-6 animate-fade-in-up">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <BookOpen className="text-blue-600" />
                Your Curated List
              </h3>
              <div className="grid gap-6">
                {recommendations.map((book, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow duration-300">
                    {/* Placeholder Cover */}
                    <div className="w-full sm:w-32 h-48 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden shadow-inner relative group">
                        <img 
                            src={`https://picsum.photos/seed/${book.title.replace(/\s/g, '')}/200/300`} 
                            alt="Book Cover" 
                            className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 leading-tight">{book.title}</h4>
                            <p className="text-slate-500 font-medium">{book.author}</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                            {book.genre}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {book.description}
                      </p>
                      
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mt-2">
                        <p className="text-amber-900 text-sm italic flex gap-2">
                           <Sparkles size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                           "{book.reason}"
                        </p>
                      </div>
                      
                      <div className="pt-2 flex gap-3">
                         <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                            <Bookmark size={16} /> Save to List
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                {loading ? (
                    <div className="text-center space-y-4">
                         <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                         <p className="text-slate-500 animate-pulse">Consulting the digital archives...</p>
                    </div>
                ) : (
                    <div className="text-center space-y-2 max-w-sm">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <p className="font-medium text-slate-600">No recommendations yet.</p>
                        <p className="text-sm">Fill out the preferences on the left to discover your next great read.</p>
                    </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookRecommender;