import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface PhotosPanelProps {
  onAddImage: (file: File) => void;
}

export const PhotosPanel: React.FC<PhotosPanelProps> = ({ onAddImage }) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
    }
  };

  return (
    <div className="h-full w-[320px] bg-panel flex flex-col border-r border-border-base">
      <div className="p-4">
        <h3 className="text-txt-primary font-medium mb-4">Photos</h3>
        
        <div className="relative w-full">
          <input 
            type="file" 
            id="panel-image-upload"
            className="hidden" 
            accept="image/*"
            onChange={handleImageUpload}
          />
          <label htmlFor="panel-image-upload" className="w-full block cursor-pointer">
              <div className="w-full py-3 px-4 bg-input hover:bg-hover text-txt-primary rounded-lg transition-colors flex items-center gap-3 group border border-dashed border-border-base hover:border-txt-muted">
              <div className="w-8 h-8 rounded bg-brand/20 flex items-center justify-center text-brand group-hover:text-brand-hover">
                <ImageIcon size={18} />
              </div>
              <span className="text-sm">Upload Image</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
