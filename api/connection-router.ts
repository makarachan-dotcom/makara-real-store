import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { connectionCodes } from "@db/schema";
import { eq, desc } from "drizzle-orm";

function decodeConnectionCode(code: string): { apiKey: string; apiUrl: string } {
  try {
    const base64Data = code.replace("conn_", "");
    const decoded = Buffer.from(base64Data, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    return {
      apiKey: parsed.k,
      apiUrl: parsed.u,
    };
  } catch {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid connection code format",
    });
  }
}

export const connectionRouter = createRouter({
  save: publicQuery
    .input(z.object({ code: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const { apiKey, apiUrl } = decodeConnectionCode(input.code);

      // Deactivate all existing connections
      await getDb()
        .update(connectionCodes)
        .set({ isActive: 0 });

      // Insert new connection
      await getDb().insert(connectionCodes).values({
        apiKey,
        apiUrl,
        isActive: 1,
      });

      return {
        success: true,
        message: "Connection saved successfully",
        apiUrlPreview: apiUrl.substring(0, 30) + "...",
      };
    }),

  getActive: publicQuery.query(async () => {
    const active = await getDb()
      .select()
      .from(connectionCodes)
      .where(eq(connectionCodes.isActive, 1))
      .orderBy(desc(connectionCodes.createdAt))
      .limit(1);

    if (active.length === 0) {
      return null;
    }

    return {
      id: active[0].id,
      apiUrlPreview: active[0].apiUrl.substring(0, 40) + "...",
      apiKeyPreview: active[0].apiKey.substring(0, 10) + "...",
      createdAt: active[0].createdAt,
    };
  }),

  getActiveConfig: publicQuery.query(async () => {
    const active = await getDb()
      .select()
      .from(connectionCodes)
      .where(eq(connectionCodes.isActive, 1))
      .orderBy(desc(connectionCodes.createdAt))
      .limit(1);

    if (active.length === 0) {
      return null;
    }

    return {
      apiKey: active[0].apiKey,
      apiUrl: active[0].apiUrl,
    };
  }),

  listAll: publicQuery.query(async () => {
    return getDb()
      .select()
      .from(connectionCodes)
      .orderBy(desc(connectionCodes.createdAt));
  }),
});
