/**
 * Type safety declarations to prevent file.name/UUID confusion
 */

import { FileId, luminaFile } from "@app/types/fileContext";

declare global {
  namespace FileIdSafety {
    // Mark functions that should never accept file.name as parameters
    type SafeFileIdFunction<T extends (...args: any[]) => any> = T extends (
      ...args: infer P
    ) => infer _R
      ? P extends readonly [string, ...any[]]
      ? never // Reject string parameters in first position for FileId functions
      : T
      : T;

    // Mark functions that should only accept luminaFile, not regular File
    type luminaFileOnlyFunction<T extends (...args: any[]) => any> =
      T extends (...args: infer P) => infer _R
      ? P extends readonly [File, ...any[]]
      ? never // Reject File parameters in first position for luminaFile functions
      : T
      : T;

    // Utility type to enforce luminaFile usage
    type RequireluminaFile<T> = T extends File ? luminaFile : T;
  }

  // Extend Window interface for debugging
  interface Window {
    __FILE_ID_DEBUG?: boolean;
  }
}

// Augment FileContext types to prevent bypassing luminaFile
declare module "../contexts/FileContext" {
  export interface StrictFileContextActions {
    pinFile: (file: luminaFile) => void; // Must be luminaFile
    unpinFile: (file: luminaFile) => void; // Must be luminaFile
    addFiles: (
      files: File[],
      options?: { insertAfterPageId?: string },
    ) => Promise<luminaFile[]>; // Returns luminaFile
    consumeFiles: (
      inputFileIds: FileId[],
      outputFiles: File[],
    ) => Promise<luminaFile[]>; // Returns luminaFile
  }

  export interface StrictFileContextSelectors {
    getFile: (id: FileId) => luminaFile | undefined; // Returns luminaFile
    getFiles: (ids?: FileId[]) => luminaFile[]; // Returns luminaFile[]
    isFilePinned: (file: luminaFile) => boolean; // Must be luminaFile
  }
}

export { };
