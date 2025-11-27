import { create } from "zustand";
import type { Artboard, CanvasElement, ElementImage } from "@/types/editor.types";
import { nanoid } from "nanoid";
import { useDesignListStore } from './useDesignListStore';

export interface StoreState {
  artboard: Artboard | null;
  elements: CanvasElement[]; 
  loadArtboard: (artboardToLoad: Artboard) => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  addElementImage: (url: string, x: number, y: number, width?: number, height?: number) => void;
  addElementText: (text: string) => void;
  addElementRect: () => void;
  addElementCircle: () => void;
  updateElementProps: (id: string, newProps: Partial<CanvasElement>) => void;
  deleteElement: (id: string) => void;
  history: CanvasElement[][];
  future: CanvasElement[][];
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  updateArtboardName: (name: string) => void;
  updateArtboardProps: (props: Partial<Artboard>) => void;
}

export const useEditorStore = create<StoreState>((set, get) => ({
  artboard: null,
  elements: [],
  history: [],
  future: [],
  
  loadArtboard: (artboardToLoad: Artboard) => {
    set({ 
      artboard: artboardToLoad,
      elements: artboardToLoad.layers || [],
      history: [],
      future: []
    });
  },

  saveHistory: () => {
    const { elements, history } = get();
    // Limit history size if needed, e.g., 50 steps
    const newHistory = [...history, elements].slice(-50);
    set({ history: newHistory, future: [] });
  },

  undo: () => {
    const { history, elements, future } = get();
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);

    set({
      elements: previous,
      history: newHistory,
      future: [elements, ...future]
    });
  },

  redo: () => {
    const { future, elements, history } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set({
      elements: next,
      history: [...history, elements],
      future: newFuture
    });
  },

  selectedElementId: null,
  setSelectedElementId: (id) => {
    set({ selectedElementId: id });
  },
  addElementImage: (url, x, y, width, height) => {
    get().saveHistory();
    
    let imageWidth = 200;
    let imageHeight = 150;

    if (width && height) {
      const aspectRatio = width / height;
      if (width > height) {
        imageWidth = 200;
        imageHeight = 200 / aspectRatio;
      } else {
        imageHeight = 200;
        imageWidth = 200 * aspectRatio;
      }
    }

    const newID = nanoid();
    const newElement: ElementImage = {
      id: newID,
      type: "image",
      src: url,
      x: x - imageWidth / 2,
      y: y - imageHeight / 2,
      width: imageWidth,
      height: imageHeight,
      rotation: 0,
      opacity: 1,
      visible: true,
      draggable: true,
    };

    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newID,
    }));
  },
  addElementText: (text) => {
     get().saveHistory();
     const newID = nanoid();
     const newElement: any = { // Type assertion for now to match CanvasElement union
       id: newID,
       type: 'text',
       text: text,
       fontSize: 20,
       fill: 'black',
       x: 100,
       y: 100,
       width: 100,
       height: 30,
       rotation: 0,
       opacity: 1,
       visible: true,
       draggable: true
     };
     set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newID,
    }));
  },
  addElementRect: () => {
    get().saveHistory();
    const newID = nanoid();
    const newElement: any = {
      id: newID,
      type: 'rect',
      fill: 'red',
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      visible: true,
      draggable: true
    };
    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newID,
    }));
  },
  addElementCircle: () => {
    get().saveHistory();
    const newID = nanoid();
    const newElement: any = {
      id: newID,
      type: 'circle',
      fill: 'blue',
      x: 200,
      y: 200,
      width: 100,
      height: 100,
      rotation: 0,
      opacity: 1,
      visible: true,
      draggable: true
    };
    set((state) => ({
      elements: [...state.elements, newElement],
      selectedElementId: newID,
    }));
  },
  updateElementProps: (id, newProps) => {
    get().saveHistory(); 
    
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id
          ? { ...el, ...newProps } as CanvasElement
          : el
      ),
    }));
  },
  deleteElement: (id) => {
    get().saveHistory();
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElementId: null,
    }));
  },
  updateArtboardName: (name) => {
    const { artboard } = get();
    if (!artboard) return;

    const updatedArtboard = { ...artboard, name };
    set({ artboard: updatedArtboard });
    
    // Sync with DB
    useDesignListStore.getState().updatedDesign(updatedArtboard);
  },
  updateArtboardProps: (props: Partial<Artboard>) => {
    const { artboard } = get();
    if (!artboard) return;

    const updatedArtboard = { ...artboard, ...props };
    set({ artboard: updatedArtboard });
    
    // Sync with DB
    useDesignListStore.getState().updatedDesign(updatedArtboard);
  }
}));
