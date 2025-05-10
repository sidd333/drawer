// fileDrawerStore.ts
import { create } from 'zustand';

// Define a type for remote file entries
export type RemoteFile = {
  url: string;
  name: string;
  type?: string;
  size?: number;
  lastModified?: number;
  metadata?: {
    contentType?: string;
    contentDisposition?: string;
    cacheControl?: string;
    [key: string]: any;
  };
};

// Define a result type to return both file types
export type FileSelectionResult = {
  localFiles: File[];
  remoteFiles: RemoteFile[];
};

// Updated state interface
interface FileDrawerState {
  isOpen: boolean;
  requestId: string | null;
  callback: ((result: FileSelectionResult) => void) | null;
  options: {
    multiple?: boolean;
    accept?: string;
    allowRemote?: boolean;
  };

  openDrawer: (
    requestId: string,
    callback: (result: FileSelectionResult) => void,
    options?: {
      multiple?: boolean;
      accept?: string;
      allowRemote?: boolean;
    }
  ) => void;
  closeDrawer: () => void;
  selectFiles: (localFiles: File[], remoteFiles: RemoteFile[]) => void;
}

export const useFileDrawerStore = create<FileDrawerState>((set, get) => ({
  isOpen: false,
  requestId: null,
  callback: null,
  options: { allowRemote: false },

  openDrawer: (requestId, callback, options = {}) => {
    console.log("Opening drawer with options:", options);
    set({
      isOpen: true,
      requestId,
      callback,
      options: { allowRemote: false, ...options },
    });
  },

  closeDrawer: () => set({ isOpen: false }),

  selectFiles: (localFiles, remoteFiles) => {
    console.log("Selecting local files:", localFiles);
    console.log("Selecting remote files:", remoteFiles);

    // Log local file metadata
    localFiles.forEach((file, index) => {
      console.log(`Local File ${index}:`, {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      });
    });

    // Log remote file metadata
    remoteFiles.forEach((file, index) => {
      console.log(`Remote File ${index}:`, {
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size,
        metadata: file.metadata,
      });
    });

    const { callback, closeDrawer } = get();
    if (callback) {
      callback({ localFiles, remoteFiles });
      closeDrawer();
    }
  },
}));