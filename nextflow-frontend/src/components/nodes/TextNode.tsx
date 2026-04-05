"use client";

import { Handle, Position, type NodeProps } from "reactflow";
import type { WorkflowNodeData } from "@/types/node.types";

export default function TextNode({ data, selected }: NodeProps<WorkflowNodeData>) {
  return (
    <div
      className={`min-w-44 rounded-2xl border px-4 py-3 shadow-lg shadow-cyan-950/20 ${selected ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 bg-slate-950/90"}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: 12, height: 12, border: 0, backgroundColor: "#67e8f9" }}
      />
      <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Text</p>
      <p className="mt-2 text-sm font-semibold text-white">{data.label}</p>
      <p className="mt-1 text-xs leading-5 text-zinc-400">
        {data.description ?? "Plain text input node."}
      </p>
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: 12, height: 12, border: 0, backgroundColor: "#67e8f9" }}
      />
    </div>
  );
}