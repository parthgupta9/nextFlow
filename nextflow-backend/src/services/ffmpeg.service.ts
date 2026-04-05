import { spawn } from "node:child_process";
import { env } from "../config/env";

export interface CropVideoInput {
  inputPath: string;
  outputPath: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface ExtractFrameInput {
  inputPath: string;
  outputPath: string;
  timestamp: string;
}

export function buildCropArgs(input: CropVideoInput) {
  return [
    "-y",
    "-i",
    input.inputPath,
    "-filter:v",
    `crop=${input.width}:${input.height}:${input.x}:${input.y}`,
    input.outputPath,
  ];
}

export function buildExtractFrameArgs(input: ExtractFrameInput) {
  return ["-y", "-ss", input.timestamp, "-i", input.inputPath, "-frames:v", "1", input.outputPath];
}

export async function runFfmpeg(args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(env.FFMPEG_PATH, args, {
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });
}
