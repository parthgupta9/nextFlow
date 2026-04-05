import { create } from "zustand";
import type { Edge, Node } from "reactflow";
import type { WorkflowNodeData } from "@/types/node.types";

interface WorkflowState {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  selectedNodeId: string | null;
  setNodes: (nodes: Node<WorkflowNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectNode: (nodeId: string | null) => void;
  upsertNode: (node: Node<WorkflowNodeData>) => void;
  removeNode: (nodeId: string) => void;
  resetWorkflow: () => void;
}

const emptyState = {
  nodes: [] as Node<WorkflowNodeData>[],
  edges: [] as Edge[],
  selectedNodeId: null as string | null,
};

export const useWorkflowStore = create<WorkflowState>((set) => ({
  ...emptyState,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  selectNode: (selectedNodeId) => set({ selectedNodeId }),
  upsertNode: (node) =>
    set((state) => {
      const index = state.nodes.findIndex((existingNode) => existingNode.id === node.id);

      if (index === -1) {
        return { nodes: [...state.nodes, node] };
      }

      const nodes = [...state.nodes];
      nodes[index] = node;

      return { nodes };
    }),
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId,
      ),
    })),
  resetWorkflow: () => set(emptyState),
}));