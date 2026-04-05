"use client";

import { Handle, Position } from "reactflow";

export default function TextNode({ data }: { data?: { text: string } }) {
  return (
    <div className="bg-white border rounded-md p-3 w-[180px] shadow">
      <p className="text-sm font-semibold mb-2">Text Node</p>

      <textarea
        className="w-full border rounded p-1 text-xs"
        placeholder="Enter text..."
        defaultValue={data?.text}
      />

      {/* Output handle */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}