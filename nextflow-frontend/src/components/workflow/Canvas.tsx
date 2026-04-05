"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type NodeTypes,
} from "reactflow";
import type { WorkflowNodeData } from "@/types/node.types";

interface CanvasProps {
  nodes: Node<WorkflowNodeData>[];
  edges: Edge[];
  nodeTypes: NodeTypes;
  onNodeClick?: (node: Node<WorkflowNodeData>) => void;
  onNodesChange?: (changes: NodeChange[]) => void;
  onEdgesChange?: (changes: EdgeChange[]) => void;
  onConnect?: (connection: Connection) => void;
}

export default function Canvas({
  nodes,
  edges,
  nodeTypes,
  onNodeClick,
  onNodesChange,
  onEdgesChange,
  onConnect,
}: CanvasProps) {
  return (
    <div className="h-full min-h-160 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onNodeClick?.(node)}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="rgba(148, 163, 184, 0.25)" gap={24} />
        <Controls className="bg-slate-950/90 text-white" />
        <MiniMap
          nodeColor="#22d3ee"
          maskColor="rgba(2, 6, 23, 0.65)"
          pannable
          zoomable
        />
      </ReactFlow>
    </div>
  );
}