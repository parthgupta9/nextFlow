import { z } from "zod";

export const workflowNodeKindSchema = z.enum([
  "text",
  "llm",
  "image",
  "video",
  "crop",
  "extractFrame",
]);

export const workflowNodeSchema = z.object({
  id: z.string().min(1),
  type: workflowNodeKindSchema,
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.object({
    label: z.string().min(1),
    description: z.string().optional(),
    config: z.record(z.string(), z.unknown()).optional(),
  }),
});

export const workflowEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
});

export const workflowCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(workflowNodeSchema).default([]),
  edges: z.array(workflowEdgeSchema).default([]),
});

export const workflowUpdateSchema = workflowCreateSchema.partial();

export const workflowIdParamsSchema = z.object({
  id: z.string().min(1),
});

export const workflowRunParamsSchema = z.object({
  workflowId: z.string().min(1),
});

export type WorkflowCreateInput = z.infer<typeof workflowCreateSchema>;
export type WorkflowUpdateInput = z.infer<typeof workflowUpdateSchema>;
export type WorkflowNodeInput = z.infer<typeof workflowNodeSchema>;
export type WorkflowEdgeInput = z.infer<typeof workflowEdgeSchema>;
