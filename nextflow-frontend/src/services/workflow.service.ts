import { apiClient } from "@/lib/api";
import type { WorkflowDefinition, WorkflowSummary } from "@/types/workflow.types";

export async function fetchWorkflows() {
  const response = await apiClient.get<WorkflowSummary[]>("/workflows");
  return response.data;
}

export async function fetchWorkflow(workflowId: string) {
  const response = await apiClient.get<WorkflowDefinition>(`/workflows/${workflowId}`);
  return response.data;
}

export async function saveWorkflow(workflow: WorkflowDefinition) {
  const response = await apiClient.put<WorkflowDefinition>(`/workflows/${workflow.id}`, workflow);
  return response.data;
}