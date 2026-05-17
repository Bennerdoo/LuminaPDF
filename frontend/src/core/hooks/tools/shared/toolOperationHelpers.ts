import {
  luminaFile,
  FileId,
  luminaFileStub,
  createluminaFile,
  ProcessedFileMetadata,
  createNewluminaFileStub,
} from "@app/types/fileContext";

/**
 * Builds parallel inputFileIds and inputluminaFileStubs arrays from the valid input files.
 * Falls back to a fresh stub when the file is not found in the current context state
 * (e.g. it was removed between operation start and this point).
 */
export function buildInputTracking(
  validFiles: luminaFile[],
  selectors: {
    getluminaFileStub: (id: FileId) => luminaFileStub | undefined;
  },
): { inputFileIds: FileId[]; inputluminaFileStubs: luminaFileStub[] } {
  const inputFileIds: FileId[] = [];
  const inputluminaFileStubs: luminaFileStub[] = [];
  for (const file of validFiles) {
    const fileId = file.fileId;
    const record = selectors.getluminaFileStub(fileId);
    if (record) {
      inputFileIds.push(fileId);
      inputluminaFileStubs.push(record);
    } else {
      console.warn(`No file stub found for file: ${file.name}`);
      inputFileIds.push(fileId);
      inputluminaFileStubs.push(createNewluminaFileStub(file, fileId));
    }
  }
  return { inputFileIds, inputluminaFileStubs };
}

/**
 * Creates parallel outputluminaFileStubs and outputluminaFiles arrays from processed files.
 * The stubFactory determines how each stub is constructed (child version vs fresh root).
 */
export function buildOutputPairs(
  processedFiles: File[],
  thumbnails: string[],
  metadataArray: Array<ProcessedFileMetadata | undefined>,
  stubFactory: (
    file: File,
    thumbnail: string,
    metadata: ProcessedFileMetadata | undefined,
    index: number,
  ) => luminaFileStub,
): {
  outputluminaFileStubs: luminaFileStub[];
  outputluminaFiles: luminaFile[];
} {
  const outputluminaFileStubs = processedFiles.map((file, index) =>
    stubFactory(file, thumbnails[index], metadataArray[index], index),
  );
  const outputluminaFiles = processedFiles.map((file, index) =>
    createluminaFile(file, outputluminaFileStubs[index].id),
  );
  return { outputluminaFileStubs, outputluminaFiles };
}
