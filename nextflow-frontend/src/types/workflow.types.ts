import type { Edge, Node } from "reactflow";
import type { WorkflowNodeData } from "./node.types";

export interface WorkflowSummary {
  id: string;
  name: string;
  updatedAt?: string;
}

export interface WorkflowDefinition extends WorkflowSummary {
  description?: string;
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
}

export type WorkflowExecutionStatus = "idle" | "queued" | "running" | "succeeded" | "failed";

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: WorkflowExecutionStatus;
  progress?: number;
  logs?: string[];
}

export interface WorkflowExecutionResult {
  executionId: string;
  status: WorkflowExecutionStatus;
}