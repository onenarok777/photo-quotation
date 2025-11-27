import React, { useState, useEffect } from 'react';
import { Undo2, Redo2, Pencil, Check, X, SlidersHorizontal } from 'lucide-react';
import { useEditorStore } from '@/stores/useEditorStore';

interface CanvasToolbarProps {
  showProperties: boolean;
  onToggleProperties: () => void;
}

export const CanvasToolbar: React.FC<CanvasToolbarProps> = ({ showProperties, onToggleProperties }) => {
  const {
    artboard,
    history,
    future,
    undo,
    redo,
    updateArtboardName
  } = useEditorStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  // Sync tempName when artboard changes or when entering edit mode
  useEffect(() => {
    if (artboard) {
      setTempName(artboard.name || '');
    }
  }, [artboard]);

  const handleSave = () => {
    if (tempName.trim()) {
      updateArtboardName(tempName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempName(''); // Reset tempName on cancel
  };

  const canUndo = history.length > 0;
  const canRedo = future.length > 0;
  const isValidName = tempName.trim().length > 0;

  return (
    <div className="h-12 bg-[#181820] border-b border-white/5 flex items-center px-4 gap-2">
      <div className="flex items-center gap-1">
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-2 rounded-lg transition-colors ${
            canUndo
              ? 'text-gray-300 hover:text-white hover:bg-white/10'
              : 'text-gray-600 cursor-not-allowed'
          }`}
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-2 rounded-lg transition-colors ${
            canRedo
              ? 'text-gray-300 hover:text-white hover:bg-white/10'
              : 'text-gray-600 cursor-not-allowed'
          }`}
          title="Redo"
        >
          <Redo2 size={18} />
        </button>
      </div>

      <div className="w-px h-6 bg-white/10 mx-2" />

      {isEditing ? (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="bg-[#2a2a35] text-white text-sm px-2 py-1 rounded border border-indigo-500/50 outline-none min-w-[150px]"
            placeholder="Enter design name"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && isValidName) handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <button
            onClick={handleSave}
            disabled={!isValidName}
            className={`p-1 rounded hover:bg-white/10 transition-colors ${isValidName ? 'text-green-400' : 'text-gray-600'}`}
            title="Save"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded hover:bg-white/10 text-red-400 transition-colors"
            title="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 group">
          <span className="text-sm text-gray-300 font-medium px-2 py-1">
            {artboard?.name || 'Untitled Design'}
          </span>
          <button
            onClick={() => {
              setTempName(artboard?.name || '');
              setIsEditing(true);
            }}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
            title="Edit Name"
          >
            <Pencil size={14} />
          </button>
        </div>
      )}

      <button
        onClick={onToggleProperties}
        className={`ml-auto p-2 rounded-lg transition-colors ${
          showProperties
            ? 'text-indigo-400 bg-indigo-500/10'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title="Toggle Properties"
      >
        <SlidersHorizontal size={18} />
      </button>
    </div>
  );
};
