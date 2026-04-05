import { prisma } from "../config/db";

export async function listExecutions() {
  return prisma.execution.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function listExecutionsForWorkflow(workflowId: string) {
  return prisma.execution.findMany({
    where: { workflowId },
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getExecutionById(id: string) {
  return prisma.execution.findUnique({
    where: { id },
  });
}

export async function createExecution(workflowId: string, input?: unknown) {
  return prisma.execution.create({
    data: {
      workflowId,
      status: "queued",
      input: input ?? null,
      logs: [],
    },
  });
}

export async function markExecutionRunning(id: string) {
  return prisma.execution.update({
    where: { id },
    data: {
      status: "running",
    },
  });
}

export async function completeExecution(
  id: string,
  output: unknown,
  logs: string[] = [],
) {
  return prisma.execution.update({
    where: { id },
    data: {
      status: "succeeded",
      output,
      logs,
    },
  });
}

export async function failExecution(id: string, errorMessage: string) {
  return prisma.execution.update({
    where: { id },
    data: {
      status: "failed",
      logs: [errorMessage],
      output: null,
    },
  });
}
