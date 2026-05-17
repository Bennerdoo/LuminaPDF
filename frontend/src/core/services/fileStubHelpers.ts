import { luminaFile, luminaFileStub } from "@app/types/fileContext";
import {
  createChildStub,
  generateProcessedFileMetadata,
} from "@app/contexts/file/fileActions";
import { createluminaFile } from "@app/types/fileContext";
import { ToolId } from "@app/types/toolId";

/**
 * Create luminaFiles and luminaFileStubs from exported files
 * Used when saving page editor changes to create version history
 */
export async function createluminaFilesAndStubs(
  files: File[],
  parentStub: luminaFileStub,
  toolId: ToolId,
): Promise<{ luminaFiles: luminaFile[]; stubs: luminaFileStub[] }> {
  const luminaFiles: luminaFile[] = [];
  const stubs: luminaFileStub[] = [];

  for (const file of files) {
    const processedFileMetadata = await generateProcessedFileMetadata(file);
    const childStub = createChildStub(
      parentStub,
      { toolId, timestamp: Date.now() },
      file,
      processedFileMetadata?.thumbnailUrl,
      processedFileMetadata,
    );

    const luminaFile = createluminaFile(file, childStub.id);
    luminaFiles.push(luminaFile);
    stubs.push(childStub);
  }

  return { luminaFiles, stubs };
}
