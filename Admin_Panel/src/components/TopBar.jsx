import React, { useState, useEffect, useRef } from 'react';
import { Search, Menu, FileText, Users, Newspaper } from 'lucide-react';

export default function TopBar({ title, setIsMobileMenuOpen, searchQuery, setSearchQuery, projects = [], groups = [], news = [], setCurrentView }) {
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const safeQuery = (searchQuery || '').toLowerCase().trim();
  
  const matchedProjects = safeQuery.length > 1 ? projects.filter(p => p.title.toLowerCase().includes(safeQuery)).slice(0, 3) : [];
  const matchedGroups = safeQuery.length > 1 ? groups.filter(g => g.name.toLowerCase().includes(safeQuery)).slice(0, 3) : [];
  const matchedNews = safeQuery.length > 1 ? news.filter(n => n.title.toLowerCase().includes(safeQuery)).slice(0, 3) : [];
  
  const hasResults = matchedProjects.length > 0 || matchedGroups.length > 0 || matchedNews.length > 0;

  const handleResultClick = (viewName) => {
    if (setCurrentView) setCurrentView(viewName);
    setShowResults(false);
  };

  return (
    <header className="h-16 bg-white/60 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={22} />
        </button>
        <h1 className="text-xl font-bold font-display text-slate-800 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block" ref={wrapperRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Global search..." 
            value={searchQuery || ''}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg text-sm transition-all w-64 md:w-80 outline-none text-slate-700 placeholder-slate-400"
          />
          
          {/* Autocomplete Overlay */}
          {showResults && safeQuery.length > 1 && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-xl border border-slate-200 py-2 max-h-[400px] overflow-y-auto z-50 animate-in slide-in-from-top-2 duration-200">
              
              {!hasResults && (
                <div className="px-4 py-6 text-center text-slate-500 text-sm font-medium">
                  No results found for "{searchQuery}"
                </div>
              )}

              {matchedProjects.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">Projects</div>
                  {matchedProjects.map(p => (
                    <button key={`p-${p.id}`} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex flex-col gap-0.5" onClick={() => handleResultClick('projects')}>
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><FileText size={14} className="text-blue-500" /> {p.title}</span>
                      <span className="text-xs text-slate-500 ml-5">{p.dept}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedGroups.length > 0 && (
                <div className="mb-2">
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">Student Groups</div>
                  {matchedGroups.map(g => (
                    <button key={`g-${g.id}`} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex flex-col gap-0.5" onClick={() => handleResultClick('groups')}>
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><Users size={14} className="text-emerald-500" /> {g.name}</span>
                      <span className="text-xs text-slate-500 ml-5">Leader: {g.leader}</span>
                    </button>
                  ))}
                </div>
              )}

              {matchedNews.length > 0 && (
                <div>
                  <div className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50">News & Alerts</div>
                  {matchedNews.map(n => (
                    <button key={`n-${n.id}`} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors flex flex-col gap-0.5" onClick={() => handleResultClick('news')}>
                      <span className="text-sm font-bold text-slate-800 flex items-center gap-2"><Newspaper size={14} className="text-amber-500" /> {n.title}</span>
                      <span className="text-xs text-slate-500 ml-5">{n.date} &bull; {n.author}</span>
                    </button>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </header>
  );
}
