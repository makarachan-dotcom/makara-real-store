import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { connectionCodes, orders, productsCache } from "@db/schema";
import { desc } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const connections = await getDb().select().from(connectionCodes);
    const allOrders = await getDb().select().from(orders);
    const products = await getDb().select().from(productsCache);

    return {
      totalConnections: connections.length,
      activeConnections: connections.filter((c) => c.isActive === 1).length,
      totalOrders: allOrders.length,
      successfulOrders: allOrders.filter((o) => o.status === "success").length,
      failedOrders: allOrders.filter((o) => o.status === "failed").length,
      cachedProducts: products.length,
    };
  }),

  listConnections: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(connectionCodes)
      .orderBy(desc(connectionCodes.createdAt));
  }),

  listOrders: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
  }),

  listProducts: adminQuery.query(async () => {
    return getDb()
      .select()
      .from(productsCache)
      .orderBy(desc(productsCache.updatedAt));
  }),
});
