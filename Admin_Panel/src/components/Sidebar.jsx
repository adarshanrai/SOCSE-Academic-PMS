import React from 'react';
import { LayoutDashboard, FolderKanban, Users, Newspaper, Building2, Settings, X, Star, BookOpen } from 'lucide-react';
import msuLogo from '../assets/msu_logo.png';

const navItems = [
  { id: 'dashboard',    label: 'Dashboard',           icon: LayoutDashboard },
  { id: 'projects',     label: 'Project Registry',    icon: FolderKanban },
  { id: 'groups',       label: 'Student Groups',      icon: Users },
  { id: 'news',         label: 'News & Announcements',icon: Newspaper },
  { id: 'testimonials', label: 'Testimonials',         icon: Star },
  { id: 'blogs',        label: 'Blog / Forum',         icon: BookOpen },
  { id: 'settings',     label: 'Settings',             icon: Settings },
];

export default function Sidebar({ currentView, setCurrentView, onLogout, currentUser, isMobileMenuOpen, setIsMobileMenuOpen }) {
  return (
    <aside className={`w-64 bg-[#081e2d] flex flex-col h-full shadow-2xl shrink-0 text-white fixed md:relative z-20 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      
      <div className="p-6 border-b border-white/10 flex flex-col items-center gap-3 bg-black/10 relative">
        <button 
          className="md:hidden absolute top-4 right-4 p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="bg-[#081e2d] p-2 rounded-xl w-full flex justify-center mt-2 md:mt-0">
          <img src={msuLogo} alt="MSU Logo" className="h-14 w-auto object-contain" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-2 mb-2">Main Menu</div>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentView === item.id 
                ? 'bg-white text-[#081e2d] shadow-md' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            onClick={() => setCurrentView(item.id)}
          >
            <item.icon size={18} className={currentView === item.id ? 'text-[#081e2d]' : 'opacity-70'} />
            {item.label}
          </button>
        ))}
      </nav>

      <div 
        className="p-4 border-t border-white/10 bg-black/20 cursor-pointer hover:bg-black/30 transition-colors"
        onClick={() => setCurrentView('settings')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentUser?.profileAvatar ? (
              <img src={currentUser.profileAvatar} alt="Profile" className="h-9 w-9 rounded-full object-cover border border-white/20 shadow-sm shrink-0" />
            ) : (
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 text-white border border-white/10">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate max-w-[100px]">{currentUser?.name || 'Admin User'}</span>
              <span className="text-[10px] text-white/50 truncate uppercase tracking-wide font-semibold mt-0.5">Settings</span>
            </div>
          </div>
          <div className="text-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
      
    </aside>
  );
}
