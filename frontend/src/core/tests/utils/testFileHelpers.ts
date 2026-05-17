/**
 * Test utilities for creating luminaFile objects in tests
 */

import { luminaFile, createluminaFile } from "@app/types/fileContext";

/**
 * Create a luminaFile object for testing purposes
 */
export function createTestluminaFile(
  name: string,
  content: string = "test content",
  type: string = "application/pdf",
): luminaFile {
  const file = new File([content], name, { type });
  return createluminaFile(file);
}

/**
 * Create multiple luminaFile objects for testing
 */
export function createTestFilesWithId(
  files: Array<{ name: string; content?: string; type?: string }>,
): luminaFile[] {
  return files.map(
    ({ name, content = "test content", type = "application/pdf" }) =>
      createTestluminaFile(name, content, type),
  );
}
