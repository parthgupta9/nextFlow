import { create } from "zustand";

export type ExecutionStatus = "idle" | "queued" | "running" | "succeeded" | "failed";

interface ExecutionState {
  status: ExecutionStatus;
  progress: number;
  logs: string[];
  setStatus: (status: ExecutionStatus) => void;
  setProgress: (progress: number) => void;
  pushLog: (message: string) => void;
  resetExecution: () => void;
}

const initialState = {
  status: "idle" as ExecutionStatus,
  progress: 0,
  logs: [] as string[],
};

export const useExecutionStore = create<ExecutionState>((set) => ({
  ...initialState,
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  pushLog: (message) =>
    set((state) => ({
      logs: [...state.logs, message],
    })),
  resetExecution: () => set(initialState),
}));