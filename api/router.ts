import { authRouter } from "./auth-router";
import { storeRouter } from "./store-router";
import { proxyRouter } from "./proxy-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  store: storeRouter,
  proxy: proxyRouter,
});

export type AppRouter = typeof appRouter;
