"use client";

import { workflowNodeTemplates, type NodeKind } from "@/types/node.types";

interface SidebarProps {
  onNodeDragStart?: (kind: NodeKind) => void;
}

export default function Sidebar({ onNodeDragStart }: SidebarProps) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm font-medium text-white">Nodes</p>
      <div className="mt-4 space-y-3">
        {workflowNodeTemplates.map((template) => (
          <button
            key={template.kind}
            type="button"
            draggable
            onDragStart={() => onNodeDragStart?.(template.kind)}
            className="flex w-full items-start justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-left transition hover:border-cyan-400/50 hover:bg-slate-900/90"
          >
            <span>
              <span className="block text-sm font-medium text-white">
                {template.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-zinc-400">
                {template.description}
              </span>
            </span>
            <span className="ml-4 rounded-full border border-cyan-400/30 px-2 py-1 text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              drag
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}