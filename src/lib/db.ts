import Dexie, { type Table } from 'dexie';
import type { Artboard } from '@/types/editor.types';

export class MySubClassedDexie extends Dexie {
  designs!: Table<Artboard>;

  constructor() {
    super('PhotoQuotationDB');
    this.version(1).stores({
      designs: 'id, name', // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
