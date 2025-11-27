import type { Artboard } from '@/types/editor.types';

export const renderArtboardToDataURL = async (artboard: Artboard, width: number = 200): Promise<string> => {
  // TODO: Implement actual rendering logic (e.g., using Konva off-screen canvas)
  // For now, return a placeholder or a simple colored rectangle
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = (width / artboard.width) * artboard.height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = artboard.background || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a simple text to indicate it's a thumbnail
    ctx.fillStyle = '#cccccc';
    ctx.font = '12px sans-serif';
    ctx.fillText(artboard.name, 10, 20);
  }
  
  return canvas.toDataURL();
};
