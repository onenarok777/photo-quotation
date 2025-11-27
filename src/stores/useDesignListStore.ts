import { create } from "zustand";
import type { Artboard } from "@/types/editor.types";
import { db } from "@/lib/db";
import { renderArtboardToDataURL } from "@/lib/renderToImage";

export interface DesignListState {
  designs: Artboard[];
  isLoaded: boolean;
  loadDesigns: () => Promise<void>;
  addDesign: () => Promise<Artboard>;
  updatedDesign: (artboard: Artboard) => Promise<void>;
  deleteDesign: (id: string) => Promise<void>;
}

export const useDesignListStore = create<DesignListState>((set) => ({
  designs: [],
  isLoaded: false,
  loadDesigns: async () => {
    const allDesigns = await db.designs.toArray();
    set({ designs: allDesigns, isLoaded: true });
  },
  addDesign: async () => {
    const artboardTemplate: Artboard = {
      id: crypto.randomUUID(),
      name: "Untitled Design",
      width: 794,
      height: 1123,
      background: "#FFFFFF",
      layers: [],
      dataVariables: {},
    };

    try {
      const thumbnail = await renderArtboardToDataURL(artboardTemplate, 200);
      artboardTemplate.thumbnail = thumbnail;
    } catch (e) {
      console.error("สร้าง thumbnail ไม่สำเร็จ:", e);
    }

    await db.designs.add(artboardTemplate);
    set((state) => ({
      designs: [...state.designs, artboardTemplate],
    }));

    return artboardTemplate;
  },
  updatedDesign: async (artboard: Artboard) => {
    const artboardToSave = { ...artboard };
    try {
      const thumbnail = await renderArtboardToDataURL(artboard, 200);
      artboardToSave.thumbnail = thumbnail;
    } catch (e) {
      console.error("อัปเดต thumbnail ไม่สำเร็จ:", e);
    }

    await db.designs.put(artboardToSave);
    set((state) => ({
      designs: state.designs.map((d) =>
        d.id === artboard.id ? artboardToSave : d
      ),
    }));
  },
  deleteDesign: async (id: string) => {
    await db.designs.delete(id);
    set((state) => ({
      designs: state.designs.filter((d) => d.id !== id),
    }));
  },
}));
