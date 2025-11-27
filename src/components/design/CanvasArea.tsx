
import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, Text, Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

import type { Artboard } from '@/types/editor.types';

interface CanvasAreaProps {
  items: any[];
  selectedId: string | null;
  artboard: Artboard;
  onSelect: (id: string | null) => void;
  onChange: (id: string, attrs: any) => void;
}

const URLImage = ({ image, ...props }: any) => {
  const [img] = useImage(image.src);
  return <KonvaImage image={img} {...props} />;
};

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  items,
  selectedId,
  artboard,
  onSelect,
  onChange,
}) => {
  const trRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Use artboard dimensions
  const ARTBOARD_WIDTH = artboard.width;
  const ARTBOARD_HEIGHT = artboard.height;

  useEffect(() => {
    if (selectedId && trRef.current) {
      const node = stageRef.current.findOne('#' + selectedId);
      if (node) {
        trRef.current.nodes([node]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId, items]);

  const calculateCenterPosition = (currentScale: number) => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const newX = (clientWidth - ARTBOARD_WIDTH * currentScale) / 2;
      const newY = (clientHeight - ARTBOARD_HEIGHT * currentScale) / 2;
      return { x: newX, y: newY };
    }
    return { x: 0, y: 0 };
  };

  const centerArtboard = () => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      const padding = 40;
      const scaleX = (clientWidth - padding * 2) / ARTBOARD_WIDTH;
      const scaleY = (clientHeight - padding * 2) / ARTBOARD_HEIGHT;
      const newScale = Math.min(scaleX, scaleY, 1);

      setScale(newScale);
      setPosition(calculateCenterPosition(newScale));
    }
  };

  // Update position whenever scale changes to keep it centered
  useEffect(() => {
    setPosition(calculateCenterPosition(scale));
  }, [scale]);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Center on mount and resize using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
        centerArtboard();
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();

    const scaleBy = 1.05;
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Limit zoom
    if (newScale < 0.1 || newScale > 5) return;

    setScale(newScale);
    // Position will be updated by the useEffect
  };

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelect(null);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-[#0f0f13] overflow-hidden flex justify-center items-center relative w-full h-full"
    >
      {/* ... (Background Pattern) */}

      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onWheel={handleWheel}
        ref={stageRef}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
      >
        <Layer>
          {/* Artboard Background */}
          <Rect
            x={0}
            y={0}
            width={ARTBOARD_WIDTH}
            height={ARTBOARD_HEIGHT}
            fill={artboard.background}
            shadowColor="black"
            shadowBlur={40}
            shadowOpacity={0.4}
            shadowOffset={{ x: 0, y: 20 }}
          />

          {items.map((item, i) => {
            const commonProps = {
              id: item.id,
              x: item.x,
              y: item.y,
              draggable: true,
              onClick: () => onSelect(item.id),
              onTap: () => onSelect(item.id),
              onDragEnd: (e: any) => {
                onChange(item.id, {
                  x: e.target.x(),
                  y: e.target.y(),
                });
              },
              onTransformEnd: (e: any) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                onChange(item.id, {
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(5, node.height() * scaleY),
                  rotation: node.rotation(),
                  scaleX: 1,
                  scaleY: 1,
                  fontSize: item.type === 'text' ? item.fontSize * scaleY : undefined,
                });
              },
            };

            if (item.type === 'rect') {
              return <Rect key={item.id} {...commonProps} width={item.width} height={item.height} fill={item.fill} />;
            } else if (item.type === 'circle') {
              return <Circle key={item.id} {...commonProps} radius={item.width / 2} fill={item.fill} />;
            } else if (item.type === 'text') {
              return <Text key={item.id} {...commonProps} text={item.text} fontSize={item.fontSize} fill={item.fill} />;
            } else if (item.type === 'image') {
              return <URLImage key={item.id} {...commonProps} image={item.image} width={item.width} height={item.height} />;
            }
            return null;
          })}
          
          {selectedId && (
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) return oldBox;
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-1 bg-[#181820]/90 backdrop-blur-xl p-1.5 rounded-full shadow-2xl border border-white/10">
        <button 
          onClick={() => setScale(s => Math.max(0.1, s - 0.1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ZoomOut size={16} />
        </button>
        <div className="px-2 text-xs text-gray-300 font-medium min-w-[48px] text-center font-mono">
          {Math.round(scale * 100)}%
        </div>
        <button 
          onClick={() => setScale(s => Math.min(5, s + 0.1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ZoomIn size={16} />
        </button>
        <div className="w-px h-4 bg-white/10 mx-1" />
        <button 
          onClick={centerArtboard}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          title="Fit to Screen"
        >
          <Maximize size={16} />
        </button>
      </div>
    </div>
  );
};
