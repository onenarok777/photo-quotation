import React from 'react';
import type { Artboard } from '@/types/editor.types';

interface PropertiesPanelProps {
  selectedId: string | null;
  items: any[];
  artboard: Artboard | null;
  onUpdateItem: (id: string, attrs: any) => void;
  onDeleteItem: (id: string) => void;
  onSelect: (id: string | null) => void;
  onUpdateArtboard: (attrs: Partial<Artboard>) => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedId,
  items,
  artboard,
  onUpdateItem,
  onDeleteItem,
  onSelect,
  onUpdateArtboard,
  onClose,
}) => {
  // If no element is selected, show Artboard properties
  if (!selectedId) {
    if (!artboard) return null;

    return (
      <div className="w-full md:w-64 bg-[#181820] h-auto md:h-full p-4 border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto text-gray-300 absolute bottom-0 md:relative z-20 shadow-2xl md:shadow-none max-h-[50vh] md:max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Artboard Settings</h2>
          <button onClick={onClose} className="md:hidden text-gray-500">Close</button>
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-gray-400">Width (px)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full bg-[#2a2a35] border-white/10 text-white"
            value={artboard.width}
            onChange={(e) => onUpdateArtboard({ width: Number(e.target.value) })}
          />
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-gray-400">Height (px)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full bg-[#2a2a35] border-white/10 text-white"
            value={artboard.height}
            onChange={(e) => onUpdateArtboard({ height: Number(e.target.value) })}
          />
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-gray-400">Background Color</span>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              className="input input-bordered w-10 h-10 p-1 bg-[#2a2a35] border-white/10"
              value={artboard.background}
              onChange={(e) => onUpdateArtboard({ background: e.target.value })}
            />
            <input
              type="text"
              className="input input-bordered flex-1 bg-[#2a2a35] border-white/10 text-white uppercase"
              value={artboard.background}
              onChange={(e) => onUpdateArtboard({ background: e.target.value })}
            />
          </div>
        </div>
      </div>
    );
  }

  const selectedItem = items.find((item) => item.id === selectedId);
  if (!selectedItem) return null;

  const handleChange = (key: string, value: any) => {
    onUpdateItem(selectedId, { [key]: value });
  };

  return (
    <div className="w-full md:w-64 bg-[#181820] h-auto md:h-full p-4 border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto text-gray-300 absolute bottom-0 md:relative z-20 shadow-2xl md:shadow-none max-h-[50vh] md:max-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Properties</h2>
        <button onClick={onClose} className="md:hidden text-gray-500">Close</button>
      </div>
      
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text text-gray-400">Position X</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full bg-[#2a2a35] border-white/10 text-white"
          value={Math.round(selectedItem.x)}
          onChange={(e) => handleChange('x', Number(e.target.value))}
        />
      </div>

      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text text-gray-400">Position Y</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full bg-[#2a2a35] border-white/10 text-white"
          value={Math.round(selectedItem.y)}
          onChange={(e) => handleChange('y', Number(e.target.value))}
        />
      </div>

      {(selectedItem.type === 'rect' || selectedItem.type === 'circle' || selectedItem.type === 'text') && (
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-gray-400">Color (Fill)</span>
          </label>
          <input
            type="color"
            className="input input-bordered w-full h-10 p-1 bg-[#2a2a35] border-white/10"
            value={selectedItem.fill}
            onChange={(e) => handleChange('fill', e.target.value)}
          />
        </div>
      )}

      {selectedItem.type === 'text' && (
        <>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text text-gray-400">Text</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-[#2a2a35] border-white/10 text-white"
              value={selectedItem.text}
              onChange={(e) => handleChange('text', e.target.value)}
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text text-gray-400">Font Size</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-[#2a2a35] border-white/10 text-white"
              value={selectedItem.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
            />
          </div>
        </>
      )}

      <div className="divider before:bg-white/10 after:bg-white/10"></div>
      
      <button 
        className="btn btn-error w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-none"
        onClick={() => onDeleteItem(selectedId)}
      >
        Delete Item
      </button>
    </div>
  );
};
