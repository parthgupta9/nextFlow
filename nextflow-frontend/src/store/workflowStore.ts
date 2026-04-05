import {create} from 'zustand';
import {Node,Edge} from 'reactflow';

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;

  addNode: (node: Node) => void;
};

export const useWorkflowStore=create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
}));