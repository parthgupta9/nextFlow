import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env";

export interface SaveUploadInput {
  fileName: string;
  buffer: Buffer;
}

export async function saveUpload(input: SaveUploadInput) {
  const uploadDirectory = path.resolve(process.cwd(), env.UPLOAD_DIR);
  await mkdir(uploadDirectory, { recursive: true });

  const safeName = `${Date.now()}-${input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const absolutePath = path.join(uploadDirectory, safeName);

  await writeFile(absolutePath, input.buffer);

  return {
    fileName: safeName,
    absolutePath,
    publicPath: `/uploads/${safeName}`,
  };
}
