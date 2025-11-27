import React from 'react';
import { MousePointer2, Bell, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  return (
    <div className="h-16 w-full bg-[#181820] border-b border-white/5 flex items-center justify-between px-4 z-50 flex-shrink-0">
      {/* Left: Logo & Project Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <MousePointer2 size={20} className="text-white transform -rotate-12" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-white font-bold text-lg tracking-wide">Photo Quotation</h1>
        </div>
      </div>

      {/* Right: Profile & Actions */}
      <div className="flex items-center gap-4">
        <button className="w-8 h-8 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#181820]" />
        </button>
        
        <div className="h-8 w-px bg-white/10" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-[#181820] flex items-center justify-center overflow-hidden">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="User" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-white font-medium group-hover:text-indigo-400 transition-colors">user@example.com</span>
            <span className="text-[10px] text-gray-500">Pro Plan</span>
          </div>
          <ChevronDown size={14} className="text-gray-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  );
};
