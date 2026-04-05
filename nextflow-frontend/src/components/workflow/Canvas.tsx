"use client";

import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "@/store/workflowStore";
import { nodeTypes } from "./nodeTypes";

export default function Canvas() {
  const { nodes, edges, setNodes, setEdges } =
    useWorkflowStore();

  const handleNodesChange = (changes: any) => {
    setNodes(applyNodeChanges(changes, nodes));
  };

  const handleEdgesChange = (changes: any) => {
    setEdges(applyEdgeChanges(changes, edges));
  };

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}