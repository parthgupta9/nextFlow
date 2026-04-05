import { getWorkflowById } from "../../services/workflow.service";
import {
  completeExecution,
  createExecution,
  failExecution,
  markExecutionRunning,
} from "../../services/execution.service";
import { runLlmJob } from "./llm.job";
import { runCropJob } from "./crop.job";
import { runExtractFrameJob } from "./extractFrame.job";

interface WorkflowNodeLike {
  id: string;
  type: string;
  data?: {
    label?: string;
    config?: Record<string, unknown>;
  };
}

export async function runWorkflowJob({ workflowId }: { workflowId: string }) {
  const workflow = await getWorkflowById(workflowId);

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  const execution = await createExecution(workflowId, {
    workflowId,
    nodes: workflow.nodes,
    edges: workflow.edges,
  });

  await markExecutionRunning(execution.id);

  const logs: string[] = [];

  try {
    const nodes = (workflow.nodes as WorkflowNodeLike[]) ?? [];

    for (const node of nodes) {
      logs.push(`Processing ${node.type} node: ${node.data?.label ?? node.id}`);

      switch (node.type) {
        case "llm":
          await runLlmJob({ prompt: node.data?.label ?? "Generate response" });
          break;
        case "crop":
          await runCropJob({
            inputPath: String(node.data?.config?.inputPath ?? "input.mp4"),
            outputPath: String(node.data?.config?.outputPath ?? "output.mp4"),
            width: Number(node.data?.config?.width ?? 1280),
            height: Number(node.data?.config?.height ?? 720),
            x: Number(node.data?.config?.x ?? 0),
            y: Number(node.data?.config?.y ?? 0),
          });
          break;
        case "extractFrame":
          await runExtractFrameJob({
            inputPath: String(node.data?.config?.inputPath ?? "input.mp4"),
            outputPath: String(node.data?.config?.outputPath ?? "frame.png"),
            timestamp: String(node.data?.config?.timestamp ?? "00:00:00"),
          });
          break;
        default:
          break;
      }
    }

    return await completeExecution(execution.id, {
      workflowId,
      processedNodes: nodes.length,
    }, logs);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Workflow execution failed";
    await failExecution(execution.id, message);
    throw error;
  }
}
