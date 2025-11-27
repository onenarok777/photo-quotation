export interface ElementImage {
  id: string;
  type: 'image';
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  draggable: boolean;
}

export interface ElementText {
  id: string;
  type: 'text';
  text: string;
  fontSize: number;
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  draggable: boolean;
}

export interface ElementRect {
  id: string;
  type: 'rect';
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  draggable: boolean;
}

export interface ElementCircle {
  id: string;
  type: 'circle';
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visible: boolean;
  draggable: boolean;
}

export type CanvasElement = ElementImage | ElementText | ElementRect | ElementCircle;

export interface Artboard {
  id: string;
  name: string;
  width: number;
  height: number;
  background: string;
  layers: CanvasElement[];
  dataVariables: Record<string, any>;
  thumbnail?: string;
}
