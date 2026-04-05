import { buildExtractFrameArgs, runFfmpeg } from "../../services/ffmpeg.service";

export async function runExtractFrameJob(input: {
  inputPath: string;
  outputPath: string;
  timestamp: string;
}) {
  const args = buildExtractFrameArgs(input);
  await runFfmpeg(args);

  return {
    outputPath: input.outputPath,
  };
}
