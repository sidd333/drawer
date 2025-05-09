// fileDrawerStore.ts
import { create } from 'zustand';

interface FileDrawerState {
  isOpen: boolean;
  requestId: string | null;
  callback: ((files: File[]) => void) | null;
  options: { multiple?: boolean; accept?: string };
  
  openDrawer: (requestId: string, callback: (files: File[]) => void, options?: {}) => void;
  closeDrawer: () => void;
  selectFiles: (files: File[]) => void;
}

export const useFileDrawerStore = create<FileDrawerState>((set, get) => ({
  isOpen: false,
  requestId: null,
  callback: null,
  options: {},
  
  openDrawer: (requestId, callback, options = {}) => set({
    isOpen: true,
    requestId,
    callback,
    options
  }),
  
  closeDrawer: () => set({ isOpen: false }),
  
  selectFiles: (files) => {
    const { callback, closeDrawer } = get();
    if (callback) {
      callback(files);
      closeDrawer();
    }
  }
}));