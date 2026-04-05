"use client";

import { useWorkflowStore } from "@/store/workflowStore";
import { v4 as uuidv4 } from "uuid";

export default function Sidebar() {
  const { addNode } = useWorkflowStore();

  const addTextNode = () => {
    addNode({
      id: uuidv4(),
      type: "textNode",
      position: { x: 250, y: 100 },
      data: { text: "" },
    });
  };

  return (
    <div className="w-60 h-screen bg-gray-100 p-4 border-r">
      <h2 className="font-semibold mb-4">Nodes</h2>

      <button
        onClick={addTextNode}
        className="w-full bg-blue-500 text-white py-2 rounded"
      >
        Add Text Node
      </button>
    </div>
  );
}