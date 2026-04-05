import { buildCropArgs, runFfmpeg } from "../../services/ffmpeg.service";

export async function runCropJob(input: {
  inputPath: string;
  outputPath: string;
  width: number;
  height: number;
  x: number;
  y: number;
}) {
  const args = buildCropArgs(input);
  await runFfmpeg(args);

  return {
    outputPath: input.outputPath,
  };
}
