import React from 'react';
import { Square, Circle } from 'lucide-react';

interface IconsPanelProps {
  onAddRectangle: () => void;
  onAddCircle: () => void;
}

export const IconsPanel: React.FC<IconsPanelProps> = ({ onAddRectangle, onAddCircle }) => {
  return (
    <div className="h-full w-[320px] bg-[#181820] flex flex-col border-r border-white/5">
      <div className="p-4">
        <h3 className="text-white font-medium mb-4">Shapes & Icons</h3>
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={onAddRectangle}
            className="aspect-square bg-[#2a2a35] hover:bg-[#32323f] rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Square size={24} />
            <span className="text-[10px]">Rect</span>
          </button>
          <button 
            onClick={onAddCircle}
            className="aspect-square bg-[#2a2a35] hover:bg-[#32323f] rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Circle size={24} />
            <span className="text-[10px]">Circle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
