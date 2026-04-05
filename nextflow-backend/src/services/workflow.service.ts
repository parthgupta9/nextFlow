import { prisma } from "../config/db";
import { workflowCreateSchema, workflowUpdateSchema, type WorkflowCreateInput, type WorkflowUpdateInput } from "../validations/workflow.schema";

export async function listWorkflows() {
  return prisma.workflow.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getWorkflowById(id: string) {
  return prisma.workflow.findUnique({
    where: { id },
  });
}

export async function createWorkflow(input: WorkflowCreateInput) {
  const payload = workflowCreateSchema.parse(input);

  return prisma.workflow.create({
    data: {
      name: payload.name,
      description: payload.description,
      nodes: payload.nodes,
      edges: payload.edges,
    },
  });
}

export async function updateWorkflow(id: string, input: WorkflowUpdateInput) {
  const payload = workflowUpdateSchema.parse(input);

  return prisma.workflow.update({
    where: { id },
    data: {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.nodes !== undefined ? { nodes: payload.nodes } : {}),
      ...(payload.edges !== undefined ? { edges: payload.edges } : {}),
    },
  });
}

export async function deleteWorkflow(id: string) {
  return prisma.workflow.delete({
    where: { id },
  });
}
