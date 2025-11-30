import React, { useState, useEffect, useRef } from 'react';
import { Type, Square, Circle, Image as ImageIcon } from 'lucide-react';

interface LayersSectionProps {
  items: any[];
  onSelect: (id: string | null) => void;
  selectedId: string | null;
}

export const LayersSection: React.FC<LayersSectionProps> = ({ items, onSelect, selectedId }) => {
  const [height, setHeight] = useState(200);
  const isResizing = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const startResizing = (e: React.MouseEvent) => {
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  const resize = (e: MouseEvent) => {
    if (isResizing.current) {
      const diff = startY.current - e.clientY;
      const newHeight = Math.max(100, Math.min(600, startHeight.current + diff));
      setHeight(newHeight);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type size={14} />;
      case 'rect': return <Square size={14} />;
      case 'circle': return <Circle size={14} />;
      case 'image': return <ImageIcon size={14} />;
      default: return <Square size={14} />;
    }
  };

  return (
    <div style={{ height }} className="border-t border-border-base flex flex-col bg-panel flex-shrink-0 transition-none">
      <div 
        className="h-3 bg-panel hover:bg-hover cursor-ns-resize flex items-center justify-center border-b border-border-base transition-colors"
        onMouseDown={startResizing}
      >
        <div className="w-8 h-1 rounded-full bg-border-base" />
      </div>
      
      <div className="p-2 flex-1 overflow-y-auto">
        <h3 className="text-xs font-bold text-txt-muted uppercase tracking-wider mb-2 px-2">Layers</h3>
        <div className="flex flex-col gap-1">
          {items.slice().reverse().map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer text-sm transition-colors ${
                selectedId === item.id 
                  ? 'bg-brand/10 text-brand' 
                  : 'hover:bg-hover text-txt-secondary'
              }`}
            >
              {getIcon(item.type)}
              <span className="truncate">
                {item.type === 'text' ? (item.text || 'Text') : item.type}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-xs text-txt-muted text-center py-4">
              No layers
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
