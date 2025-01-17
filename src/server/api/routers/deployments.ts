import { Octokit } from "@octokit/rest";
import { z } from "zod";
import { getInstallationAccessToken } from "~/app/api/github/webhook/route";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const deploymentsRouter = createTRPCRouter({
  tryCreateDeploymentOnGh: publicProcedure
    .input(z.object({ repoName: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.deploymentOutbox.findMany({});

      const projMap = await ctx.db.userDeployment.findMany({
        where: {
          id: {
            in: res.map((x) => x.deploymentId),
          },
        },
      });

      await getInstallationAccessToken();

      const octokit = new Octokit({
        auth: "",
      });

      console.log(res);

      return {
        deployments: res,
      };
    }),

  getAllDeployments: publicProcedure
    .input(z.object({ repoName: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.userDeployment.findMany({
        where: {
          repoName: input.repoName,
        },
        select: {
          id: true,
          user_id: true,
          project_id: true,
          owner: true,
          repoName: true,
          deployedAddress: true,
          chainId: true,
          environment: true,
          branch: true,
          lastUpdated: true,
          details: true,
          updatedBy: true,
          status: true,
          archiveUrl: true,
          installationId: true,
          zipArchive: false,
        },
        orderBy: {
          lastUpdated: "desc",
        },
      });

      console.log(res);

      return {
        deployments: res,
      };
    }),

  getDeploymentStatus: publicProcedure
    .input(z.object({ deploymentId: z.string() }))
    .query(async ({ ctx, input }) => {
      const deployment = await ctx.db.userDeployment.findFirst({
        where: {
          id: input.deploymentId,
        },
        select: {
          id: true,
          user_id: true,
          project_id: true,
          owner: true,
          repoName: true,
          deployedAddress: true,
          chainId: true,
          environment: true,
          branch: true,
          lastUpdated: true,
          details: true,
          updatedBy: true,
          status: true,
          archiveUrl: true,
          installationId: true,
          zipArchive: false,
        },
      });

      return {
        deployment: deployment,
      };
    }),

  getDeploymentLogs: publicProcedure
    .input(z.object({ deploymentId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("LOGS!!");

      const logs = await ctx.db.deploymentLog.findMany({
        where: {
          deploymentId: input.deploymentId,
        },
      });

      console.log(logs);

      return {
        logs: logs,
      };
    }),

  getMainDeploy: publicProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      console.log("PROEJCTID", input.projectId);

      const deployments = await ctx.db.userDeployment.findMany({
        where: {
          repoName: input.projectId,
          status: "Success",
        },
        select: {
          id: true,
          user_id: true,
          project_id: true,
          owner: true,
          repoName: true,
          deployedAddress: true,
          chainId: true,
          environment: true,
          branch: true,
          lastUpdated: true,
          details: true,
          updatedBy: true,
          status: true,
          installationId: true,
          deploymenttransaction: true,
          zipArchive: false,
        },
      });

      console.log("COMPLETED QUERY", deployments);

      return {
        deployments: deployments,
      };
    }),
});
