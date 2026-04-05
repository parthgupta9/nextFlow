import { PrismaClient } from "@prisma/client";
import { env } from "./env";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma ?? new PrismaClient({
  log: env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
});

if (env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

export { prisma };
