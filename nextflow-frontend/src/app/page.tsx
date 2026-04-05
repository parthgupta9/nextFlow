import Canvas from "@/components/workflow/Canvas";
import Sidebar from "@/components/workflow/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Canvas />
    </div>
  );
}