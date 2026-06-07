import { authRouter } from "./auth-router";
import { connectionRouter } from "./connection-router";
import { externalRouter } from "./external-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  connection: connectionRouter,
  external: externalRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
