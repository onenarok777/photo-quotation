import React from 'react';
import type { Artboard } from '@/types/editor.types';
import { LayersSection } from './LayersSection';

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
  const selectedItem = selectedId ? items.find((item) => item.id === selectedId) : null;

  return (
    <div className="w-full md:w-64 bg-panel h-auto md:h-full border-t md:border-t-0 md:border-l border-border-base text-txt-secondary absolute bottom-0 md:relative z-20 shadow-2xl md:shadow-none max-h-[50vh] md:max-h-full flex flex-col">
      <div className="p-4 flex-1 overflow-y-auto min-h-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-txt-primary">
            {selectedItem ? 'Properties' : 'Artboard Settings'}
          </h2>
          <button onClick={onClose} className="md:hidden text-txt-muted">Close</button>
        </div>

        {!selectedItem ? (
          // Artboard Settings
          <>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text text-txt-muted">Width (px)</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-input border-border-base text-txt-primary"
                value={artboard?.width || 0}
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
                value={artboard?.height || 0}
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
                  value={artboard?.background || '#ffffff'}
                  onChange={(e) => onUpdateArtboard({ background: e.target.value })}
                />
                <input
                  type="text"
                  className="input input-bordered flex-1 bg-input border-border-base text-txt-primary uppercase"
                  value={artboard?.background || '#ffffff'}
                  onChange={(e) => onUpdateArtboard({ background: e.target.value })}
                />
              </div>
            </div>
          </>
        ) : (
          // Item Properties
          <>
            <div className="form-control w-full mb-2">
              <label className="label">
                <span className="label-text text-txt-muted">Position X</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-input border-border-base text-txt-primary"
                value={Math.round(selectedItem.x)}
                onChange={(e) => onUpdateItem(selectedId!, { x: Number(e.target.value) })}
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
                onChange={(e) => onUpdateItem(selectedId!, { y: Number(e.target.value) })}
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
                  onChange={(e) => onUpdateItem(selectedId!, { fill: e.target.value })}
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
                    onChange={(e) => onUpdateItem(selectedId!, { text: e.target.value })}
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
                    onChange={(e) => onUpdateItem(selectedId!, { fontSize: Number(e.target.value) })}
                  />
                </div>
              </>
            )}

            <div className="divider before:bg-border-base after:bg-border-base"></div>
            
            <button 
              className="btn btn-error w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border-none"
              onClick={() => onDeleteItem(selectedId!)}
            >
              Delete Item
            </button>
          </>
        )}
      </div>

      {/* Layers Section - Always Visible */}
      <LayersSection items={items} onSelect={onSelect} selectedId={selectedId} />
    </div>
  );
};
