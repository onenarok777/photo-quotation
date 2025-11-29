
import { MousePointer2, Bell, ChevronDown, Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore } from '@/stores/useThemeStore';
import { useState, useRef, useEffect } from 'react';

export const Navbar = () => {
  const { theme, setTheme } = useThemeStore();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={18} />;
      case 'dark': return <Moon size={18} />;
      case 'system': return <Monitor size={18} />;
    }
  };
  return (
    <div className="h-16 w-full bg-panel border-b border-border-base flex items-center justify-between px-4 z-50 flex-shrink-0 transition-colors duration-300">
      {/* Left: Logo & Project Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <MousePointer2 size={20} className="text-white transform -rotate-12" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-txt-primary font-bold text-lg tracking-wide transition-colors duration-300">Photo Quotation</h1>
        </div>
      </div>

      {/* Right: Profile & Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Switcher */}
        <div className="relative" ref={themeRef}>
          <button 
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="w-8 h-8 rounded-full hover:bg-hover flex items-center justify-center text-txt-muted hover:text-txt-primary transition-colors"
            title="Switch Theme"
          >
            {getThemeIcon()}
          </button>
          
          {isThemeOpen && (
            <div className="absolute top-full right-0 mt-2 w-32 bg-panel border border-border-base rounded-lg shadow-xl overflow-hidden z-50">
              <button 
                onClick={() => { setTheme('light'); setIsThemeOpen(false); }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-hover ${theme === 'light' ? 'text-brand' : 'text-txt-secondary'}`}
              >
                <Sun size={14} /> Light
              </button>
              <button 
                onClick={() => { setTheme('dark'); setIsThemeOpen(false); }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-hover ${theme === 'dark' ? 'text-brand' : 'text-txt-secondary'}`}
              >
                <Moon size={14} /> Dark
              </button>
              <button 
                onClick={() => { setTheme('system'); setIsThemeOpen(false); }}
                className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-hover ${theme === 'system' ? 'text-brand' : 'text-txt-secondary'}`}
              >
                <Monitor size={14} /> System
              </button>
            </div>
          )}
        </div>

        <button className="w-8 h-8 rounded-full hover:bg-hover flex items-center justify-center text-txt-muted hover:text-txt-primary transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-panel" />
        </button>
        
        <div className="h-8 w-px bg-border-base" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-panel flex items-center justify-center overflow-hidden">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="User" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-txt-primary font-medium group-hover:text-brand transition-colors">user@example.com</span>
            <span className="text-[10px] text-txt-muted">Pro Plan</span>
          </div>
          <ChevronDown size={14} className="text-txt-muted group-hover:text-txt-primary transition-colors" />
        </div>
      </div>
    </div>
  );
};
