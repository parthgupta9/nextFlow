import { apiClient } from "@/lib/api";
import type { WorkflowExecution, WorkflowExecutionResult } from "@/types/workflow.types";

export async function runWorkflow(workflowId: string) {
  const response = await apiClient.post<WorkflowExecutionResult>(`/workflows/${workflowId}/run`);
  return response.data;
}

export async function fetchExecution(executionId: string) {
  const response = await apiClient.get<WorkflowExecution>(`/executions/${executionId}`);
  return response.data;
}