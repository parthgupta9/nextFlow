import type { Request, Response } from "express";
import { enqueueJob } from "../trigger/client";
import {
  createWorkflow,
  deleteWorkflow,
  getWorkflowById,
  listWorkflows,
  updateWorkflow,
} from "../services/workflow.service";
import { workflowCreateSchema, workflowIdParamsSchema, workflowRunParamsSchema, workflowUpdateSchema } from "../validations/workflow.schema";

export async function listWorkflowHandler(_request: Request, response: Response) {
  const workflows = await listWorkflows();
  response.json(workflows);
}

export async function getWorkflowHandler(request: Request, response: Response) {
  const { id } = workflowIdParamsSchema.parse(request.params);
  const workflow = await getWorkflowById(id);

  if (!workflow) {
    response.status(404).json({ error: "Workflow not found" });
    return;
  }

  response.json(workflow);
}

export async function createWorkflowHandler(request: Request, response: Response) {
  const payload = workflowCreateSchema.parse(request.body);
  const workflow = await createWorkflow(payload);
  response.status(201).json(workflow);
}

export async function updateWorkflowHandler(request: Request, response: Response) {
  const { id } = workflowIdParamsSchema.parse(request.params);
  const payload = workflowUpdateSchema.parse(request.body);
  const workflow = await updateWorkflow(id, payload);
  response.json(workflow);
}

export async function deleteWorkflowHandler(request: Request, response: Response) {
  const { id } = workflowIdParamsSchema.parse(request.params);
  await deleteWorkflow(id);
  response.status(204).send();
}

export async function runWorkflowHandler(request: Request, response: Response) {
  const { workflowId } = workflowRunParamsSchema.parse({ workflowId: request.params.workflowId });
  const result = await enqueueJob("workflow", { workflowId });
  response.status(202).json(result);
}
