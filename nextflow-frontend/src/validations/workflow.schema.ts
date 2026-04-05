import { z } from "zod";
import { nodeConfigSchema } from "./node.schema";

const edgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  label: z.string().optional(),
});

export const workflowSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(nodeConfigSchema),
  edges: z.array(edgeSchema),
});

export type WorkflowInput = z.infer<typeof workflowSchema>;