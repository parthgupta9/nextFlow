import { runWorkflowJob } from "./jobs/workflow.job";
import { runLlmJob } from "./jobs/llm.job";
import { runCropJob } from "./jobs/crop.job";
import { runExtractFrameJob } from "./jobs/extractFrame.job";

export type TriggerJobName = "workflow" | "llm" | "crop" | "extractFrame";

export type TriggerJobPayload =
  | { workflowId: string }
  | { prompt: string }
  | { inputPath: string; outputPath: string; width: number; height: number; x: number; y: number }
  | { inputPath: string; outputPath: string; timestamp: string };

export async function enqueueJob(jobName: TriggerJobName, payload: TriggerJobPayload) {
  switch (jobName) {
    case "workflow":
      return runWorkflowJob(payload as { workflowId: string });
    case "llm":
      return runLlmJob(payload as { prompt: string });
    case "crop":
      return runCropJob(
        payload as {
          inputPath: string;
          outputPath: string;
          width: number;
          height: number;
          x: number;
          y: number;
        },
      );
    case "extractFrame":
      return runExtractFrameJob(
        payload as { inputPath: string; outputPath: string; timestamp: string },
      );
    default:
      throw new Error(`Unsupported trigger job: ${jobName}`);
  }
}
