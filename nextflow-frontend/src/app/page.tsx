import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-4xl rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/20 backdrop-blur md:p-12">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
          NextFlow
        </p>
        <div className="mt-6 grid gap-8 md:grid-cols-[1.4fr_0.9fr] md:items-end">
          <div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Build and run media workflows in one canvas.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 md:text-lg">
              The frontend scaffold now lives under <span className="text-white">src/</span> with
              the workflow editor split into focused route groups, reusable nodes, and shared state.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-zinc-300">
            <p className="font-medium text-white">Starter routes</p>
            <ul className="mt-4 space-y-2">
              <li>Dashboard workflow canvas</li>
              <li>Auth route group placeholder</li>
              <li>Reusable workflow nodes and config panels</li>
            </ul>
            <Link
              href="/workflow/demo"
              className="mt-5 inline-flex rounded-full bg-cyan-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-300"
            >
              Open workflow demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}