import { notFound } from "next/navigation";

const knownWorkflows = new Set(["demo"]);

export default function WorkflowPage({
  params,
}: {
  params: { id: string };
}) {
  if (!knownWorkflows.has(params.id)) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-8 text-zinc-100 md:px-10">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-2 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
              Workflow
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Canvas scaffold
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              This route is ready for the editor, node config panel, sidebar, and execution controls.
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Sidebar</p>
            <p className="mt-2 text-sm text-zinc-400">Drop node templates here when wiring drag and drop.</p>
          </aside>

          <div className="min-h-160 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-sm font-medium text-white">Canvas</p>
            <p className="mt-2 text-sm text-zinc-400">
              The React Flow wrapper will mount here once the editor is wired up.
            </p>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Node config</p>
            <p className="mt-2 text-sm text-zinc-400">Selection-driven configuration goes here.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}