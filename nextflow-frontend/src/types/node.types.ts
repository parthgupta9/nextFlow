export type NodeKind = "text" | "llm" | "image" | "video" | "crop" | "extractFrame";

export interface WorkflowNodeData {
  label: string;
  description?: string;
  config?: Record<string, unknown>;
}

export interface WorkflowNodeTemplate {
  kind: NodeKind;
  label: string;
  description: string;
}

export const workflowNodeTemplates: WorkflowNodeTemplate[] = [
  {
    kind: "text",
    label: "Text",
    description: "Ingest prompt text, notes, or raw copy.",
  },
  {
    kind: "llm",
    label: "LLM",
    description: "Call a language model with structured inputs.",
  },
  {
    kind: "image",
    label: "Image",
    description: "Transform or enrich image inputs.",
  },
  {
    kind: "video",
    label: "Video",
    description: "Process video assets and downstream outputs.",
  },
  {
    kind: "crop",
    label: "Crop",
    description: "Crop image or frame regions.",
  },
  {
    kind: "extractFrame",
    label: "Extract frame",
    description: "Pull frames from video sources.",
  },
];