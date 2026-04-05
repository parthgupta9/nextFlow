import {create} from 'zustand';
import {Node,Edge,applyNodeChanges,applyEdgeChanges,addEdge} from 'reactflow';

type WorkflowState = {
  nodes: Node[];
  edges: Edge[];

     onNodesChange: (changes: any) => void;
     onEdgesChange: (changes: any) => void;
     onConnect: (params: any) => void;

  addNode: (node: Node) => void;
};

export const useWorkflowStore=create<WorkflowState>((set,get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) =>
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    }),
  onEdgesChange: (changes) => 
    set({
      edges: applyEdgeChanges(changes, get().edges),
    }),
  onConnect: (params) =>
    set({
      edges: addEdge(params, get().edges),

    }),

  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
}));