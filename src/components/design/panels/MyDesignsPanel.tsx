import { swal } from '@/lib/swal';
import React, { useEffect } from 'react';
import { Trash2, Plus, Search, X } from 'lucide-react';
import { useDesignListStore } from '@/stores/useDesignListStore';
import { useEditorStore } from '@/stores/useEditorStore';

interface MyDesignsPanelProps {
  onClose: () => void;
}

export const MyDesignsPanel: React.FC<MyDesignsPanelProps> = ({ onClose }) => {
  const { designs, loadDesigns, addDesign, deleteDesign } = useDesignListStore();
  const { loadArtboard, artboard } = useEditorStore();

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  const handleCreateNew = async () => {
    const newDesign = await addDesign();
    loadArtboard(newDesign);
  };

  const handleLoadDesign = (design: any) => {
    loadArtboard(design);
  };

  return (
    <div className="w-full h-[60vh] md:h-full md:w-[300px] md:min-w-[300px] bg-panel flex flex-col border-t md:border-t-0 md:border-r border-border-base shadow-2xl z-10 flex-shrink-0 absolute bottom-0 md:relative rounded-t-2xl md:rounded-none transition-colors duration-300">
      {/* Header Section */}
      <div className="p-6 pb-4 space-y-4 border-b border-border-base">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-txt-primary tracking-tight transition-colors duration-300">My Designs</h2>
          <button onClick={onClose} className="text-txt-muted hover:text-txt-primary transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <button 
          onClick={handleCreateNew}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-900/20 flex items-center justify-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Create new design
        </button>

        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted" />
          <input 
            type="text" 
            placeholder="Search designs..." 
            className="w-full bg-input text-sm text-txt-primary pl-9 pr-4 py-2.5 rounded-lg border border-transparent focus:border-brand/50 focus:bg-panel outline-none transition-all placeholder:text-txt-muted"
          />
        </div>
      </div>

      {/* Designs Grid */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {designs.map((design) => {
            const isSelected = artboard?.id === design.id;
            return (
              <div key={design.id} className="group relative flex flex-col">
                <div 
                  onClick={() => handleLoadDesign(design)}
                  className={`aspect-[4/3] bg-input rounded-xl overflow-hidden relative mb-2 shadow-md transition-all duration-300 cursor-pointer border ${
                    isSelected 
                      ? 'border-brand ring-2 ring-brand/50 shadow-xl' 
                      : 'border-border-base group-hover:shadow-xl group-hover:ring-2 ring-brand/50'
                  }`}
                >
                  {/* Thumbnail */}
                  {design.thumbnail ? (
                    <img src={design.thumbnail} alt={design.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-txt-muted gap-2">
                       <div className="w-8 h-8 rounded-full bg-hover flex items-center justify-center">
                          <ImageIcon size={14} />
                       </div>
                       <span className="text-[10px] font-medium uppercase tracking-wider">No Preview</span>
                    </div>
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Menu */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      swal.fire({
                        title: 'ยืนยันการลบ?',
                        text: "คุณจะไม่สามารถกู้คืนข้อมูลได้!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'ใช่, ลบเลย!',
                        cancelButtonText: 'ยกเลิก',
                      }).then((result: any) => {
                        if (result.isConfirmed) {
                          deleteDesign(design.id);
                          swal.fire(
                            'ลบเรียบร้อย!',
                            'ดีไซน์ของคุณถูกลบแล้ว',
                            'success'
                          )
                        }
                      })
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md text-white/70 hover:text-red-400 hover:bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-[-10px] group-hover:translate-y-0"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="px-1">
                  <h3 className="text-sm text-txt-secondary font-medium truncate group-hover:text-brand transition-colors">{design.name}</h3>
                  <p className="text-[10px] text-txt-muted">Last edited just now</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Helper Icon for placeholder
const ImageIcon = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);
