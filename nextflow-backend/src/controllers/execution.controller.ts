import type { Request, Response } from "express";
import { getExecutionById, listExecutions, listExecutionsForWorkflow } from "../services/execution.service";
import { workflowRunParamsSchema } from "../validations/workflow.schema";

export async function listExecutionHandler(request: Request, response: Response) {
  const workflowId = request.query.workflowId;

  if (typeof workflowId === "string" && workflowId.length > 0) {
    const executions = await listExecutionsForWorkflow(workflowId);
    response.json(executions);
    return;
  }

  const executions = await listExecutions();
  response.json(executions);
}

export async function getExecutionHandler(request: Request, response: Response) {
  const rawId = request.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!id) {
    response.status(400).json({ error: "Execution id is required" });
    return;
  }

  const execution = await getExecutionById(id);

  if (!execution) {
    response.status(404).json({ error: "Execution not found" });
    return;
  }

  response.json(execution);
}

export async function runExecutionPlaceholderHandler(request: Request, response: Response) {
  const { workflowId } = workflowRunParamsSchema.parse({ workflowId: request.params.workflowId });
  response.status(202).json({
    workflowId,
    status: "queued",
  });
}
