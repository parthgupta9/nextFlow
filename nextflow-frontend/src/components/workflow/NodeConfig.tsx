"use client";

import type { WorkflowNodeData } from "@/types/node.types";

interface NodeConfigProps {
  value: WorkflowNodeData | null;
  onChange?: (value: WorkflowNodeData) => void;
}

export default function NodeConfig({ value, onChange }: NodeConfigProps) {
  return (
    <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm font-medium text-white">Node config</p>
      {value ? (
        <div className="mt-4 space-y-4 text-sm">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-400">
              Label
            </span>
            <input
              value={value.label}
              onChange={(event) =>
                onChange?.({ ...value, label: event.target.value })
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-0 placeholder:text-zinc-500 focus:border-cyan-400/50"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-zinc-400">
              Description
            </span>
            <textarea
              value={value.description ?? ""}
              onChange={(event) =>
                onChange?.({
                  ...value,
                  description: event.target.value,
                })
              }
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-cyan-400/50"
            />
          </label>
        </div>
      ) : (
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Select a node to edit its label and description.
        </p>
      )}
    </aside>
  );
}