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
      <div className="w-full md:w-64 bg-panel h-auto md:h-full p-4 border-t md:border-t-0 md:border-l border-border-base overflow-y-auto text-txt-secondary absolute bottom-0 md:relative z-20 shadow-2xl md:shadow-none max-h-[50vh] md:max-h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-txt-primary">Artboard Settings</h2>
          <button onClick={onClose} className="md:hidden text-txt-muted">Close</button>
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-txt-muted">Width (px)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full bg-input border-border-base text-txt-primary"
            value={artboard.width}
            onChange={(e) => onUpdateArtboard({ width: Number(e.target.value) })}
          />
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-txt-muted">Height (px)</span>
          </label>
          <input
            type="number"
            className="input input-bordered w-full bg-input border-border-base text-txt-primary"
            value={artboard.height}
            onChange={(e) => onUpdateArtboard({ height: Number(e.target.value) })}
          />
        </div>

        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-txt-muted">Background Color</span>
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              className="input input-bordered w-10 h-10 p-1 bg-input border-border-base"
              value={artboard.background}
              onChange={(e) => onUpdateArtboard({ background: e.target.value })}
            />
            <input
              type="text"
              className="input input-bordered flex-1 bg-input border-border-base text-txt-primary uppercase"
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
    <div className="w-full md:w-64 bg-panel h-auto md:h-full p-4 border-t md:border-t-0 md:border-l border-border-base overflow-y-auto text-txt-secondary absolute bottom-0 md:relative z-20 shadow-2xl md:shadow-none max-h-[50vh] md:max-h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-txt-primary">Properties</h2>
        <button onClick={onClose} className="md:hidden text-txt-muted">Close</button>
      </div>
      
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text text-txt-muted">Position X</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full bg-input border-border-base text-txt-primary"
          value={Math.round(selectedItem.x)}
          onChange={(e) => handleChange('x', Number(e.target.value))}
        />
      </div>

      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text text-txt-muted">Position Y</span>
        </label>
        <input
          type="number"
          className="input input-bordered w-full bg-input border-border-base text-txt-primary"
          value={Math.round(selectedItem.y)}
          onChange={(e) => handleChange('y', Number(e.target.value))}
        />
      </div>

      {(selectedItem.type === 'rect' || selectedItem.type === 'circle' || selectedItem.type === 'text') && (
        <div className="form-control w-full mb-2">
          <label className="label">
            <span className="label-text text-txt-muted">Color (Fill)</span>
          </label>
          <input
            type="color"
            className="input input-bordered w-full h-10 p-1 bg-input border-border-base"
            value={selectedItem.fill}
            onChange={(e) => handleChange('fill', e.target.value)}
          />
        </div>
      )}

      {selectedItem.type === 'text' && (
        <>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text text-txt-muted">Text</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-input border-border-base text-txt-primary"
              value={selectedItem.text}
              onChange={(e) => handleChange('text', e.target.value)}
            />
          </div>
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text text-txt-muted">Font Size</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-input border-border-base text-txt-primary"
              value={selectedItem.fontSize}
              onChange={(e) => handleChange('fontSize', Number(e.target.value))}
            />
          </div>
        </>
      )}

      <div className="divider before:bg-border-base after:bg-border-base"></div>
      
      <button 
        className="btn btn-error w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-none"
        onClick={() => onDeleteItem(selectedId)}
      >
        Delete Item
      </button>
    </div>
  );
};
