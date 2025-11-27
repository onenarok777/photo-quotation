import React from 'react';
import { Folder } from 'lucide-react';

interface SidebarProps {
  activeItem: string | null;
  onSelectItem: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onSelectItem,
}) => {
  const MENU_ITEMS = [
    { id: 'my-designs', icon: Folder, label: 'My Designs' },
  ];

  return (
    <div className="flex-shrink-0 z-50 w-full h-16 md:w-auto md:h-full">
      <div className="w-full h-full md:w-[72px] bg-[#181820] border-t md:border-t-0 md:border-r border-white/5 flex flex-row md:flex-col items-center justify-between md:justify-start py-0 md:py-4 px-4 md:px-0 relative">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full md:h-32 bg-indigo-500/10 blur-[40px] pointer-events-none" />

        {/* Menu Items */}
        <div className="flex-1 w-full flex flex-row md:flex-col gap-4 md:gap-2 justify-around md:justify-start">
          {MENU_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className={`flex flex-col items-center justify-center w-auto md:w-full aspect-square md:aspect-square rounded-lg relative group transition-all duration-200 p-2 md:p-0 ${
                  isActive 
                    ? 'text-indigo-400' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                 {/* Active Indicator (Desktop) */}
                 {isActive && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
                )}
                {/* Active Indicator (Mobile) */}
                 {isActive && (
                  <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-500 rounded-t-full" />
                )}

                <item.icon 
                  size={22} 
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                />
                <span className={`text-[9px] mt-1 font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} block`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>


      </div>
    </div>
  );
};
