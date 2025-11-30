import { useState } from 'react';
import { Sidebar } from '@/components/design/Sidebar';
import { Navbar } from '@/components/design/Navbar';
import { CanvasArea } from '@/components/design/CanvasArea';
import { PropertiesPanel } from '@/components/design/PropertiesPanel';
import { MyDesignsPanel } from '@/components/design/panels/MyDesignsPanel';
import { TextPanel } from '@/components/design/panels/TextPanel';
import { IconsPanel } from '@/components/design/panels/IconsPanel';
import { UploadPanel } from '@/components/design/panels/UploadPanel';
import { PhotosPanel } from '@/components/design/panels/PhotosPanel';
import { CanvasToolbar } from '@/components/design/CanvasToolbar';
import { useEditorStore } from '@/stores/useEditorStore';

export const DesignPage = () => {
  const [activePanel, setActivePanel] = useState<string | null>('my-designs');
  
  const handlePanelSelect = (id: string) => {
    setActivePanel(prev => prev === id ? null : id);
  };
  
  const { 
    artboard,
    elements, 
    selectedElementId, 
    setSelectedElementId, 
    updateElementProps, 
    deleteElement,
    addElementText,
    addElementRect,
    addElementCircle,
    addElementImage,
    updateArtboardProps
  } = useEditorStore();

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'my-designs':
        return <MyDesignsPanel onClose={() => setActivePanel(null)} />;
      case 'text':
        return <TextPanel onAddText={() => addElementText('New Text')} />;
      case 'icons':
        return <IconsPanel onAddRectangle={addElementRect} onAddCircle={addElementCircle} />;
      case 'upload':
        return <UploadPanel onAddImage={(file) => {
           const reader = new FileReader();
           reader.onload = () => {
             if (typeof reader.result === 'string') {
               addElementImage(reader.result, 250, 250);
             }
           };
           reader.readAsDataURL(file);
        }} />;
      case 'photos':
        return <PhotosPanel 
          onSelectImage={(url) => addElementImage(url, 250, 250)}
        />;
      default:
        return null; 
    }
  };

  const [showProperties, setShowProperties] = useState(true);

  const handleSelectElement = (id: string | null) => {
    setSelectedElementId(id);
    // Only show properties when selecting an element
    if (id) {
      setShowProperties(true);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-app overflow-hidden transition-colors duration-300">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden relative flex-col-reverse md:flex-row">
        <Sidebar
          activeItem={activePanel}
          onSelectItem={handlePanelSelect}
        />
        
        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Side Panel Area */}
          {renderActivePanel()}

          {/* Main Canvas Area */}
          <div className="flex-1 relative bg-canvas overflow-hidden flex flex-col transition-colors duration-300">
            {artboard && (
              <CanvasToolbar 
                showProperties={showProperties} 
                onToggleProperties={() => setShowProperties(!showProperties)} 
              />
            )}
            
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {artboard ? (
                <CanvasArea
                  items={elements}
                  selectedId={selectedElementId}
                  artboard={artboard}
                  onSelect={handleSelectElement}
                  onChange={updateElementProps}
                />
              ) : (
                <div className="text-txt-muted flex flex-col items-center gap-4 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-hover flex items-center justify-center transition-colors duration-300">
                    <div className="w-8 h-8 border-2 border-txt-muted border-dashed rounded-lg transition-colors duration-300" />
                  </div>
                  <p>Select a design to start editing</p>
                </div>
              )}
            </div>
          </div>

          {artboard && showProperties && (
            <PropertiesPanel
              selectedId={selectedElementId}
              items={elements}
              artboard={artboard}
              onUpdateItem={updateElementProps}
              onDeleteItem={deleteElement}
              onSelect={handleSelectElement}
              onUpdateArtboard={updateArtboardProps}
              onClose={() => setShowProperties(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
