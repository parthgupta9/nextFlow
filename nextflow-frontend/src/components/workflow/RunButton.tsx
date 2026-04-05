"use client";

interface RunButtonProps {
  isRunning?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function RunButton({
  isRunning = false,
  disabled = false,
  onClick,
}: RunButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isRunning}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isRunning ? "Running..." : "Run workflow"}
    </button>
  );
}