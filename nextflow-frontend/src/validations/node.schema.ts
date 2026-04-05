import { z } from "zod";

export const nodeKindSchema = z.enum([
  "text",
  "llm",
  "image",
  "video",
  "crop",
  "extractFrame",
]);

export const nodeConfigSchema = z.object({
  id: z.string().min(1),
  kind: nodeKindSchema,
  label: z.string().min(1),
  description: z.string().optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export type NodeConfig = z.infer<typeof nodeConfigSchema>;