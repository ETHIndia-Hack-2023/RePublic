import { PrismaClient } from "@prisma/client";

import * as env from "../env.js";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
