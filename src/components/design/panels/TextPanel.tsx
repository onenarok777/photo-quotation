import React from 'react';
import { Type } from 'lucide-react';

interface TextPanelProps {
  onAddText: () => void;
}

export const TextPanel: React.FC<TextPanelProps> = ({ onAddText }) => {
  return (
    <div className="h-full w-[320px] bg-[#181820] flex flex-col border-r border-white/5">
      <div className="p-4">
        <h3 className="text-white font-medium mb-4">Text</h3>
        <button 
          onClick={onAddText}
          className="w-full py-3 px-4 bg-[#2a2a35] hover:bg-[#32323f] text-white rounded-lg transition-colors flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300">
            <Type size={18} />
          </div>
          <span>Add Heading</span>
        </button>
      </div>
    </div>
  );
};
