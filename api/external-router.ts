import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { connectionCodes, orders, productsCache } from "@db/schema";
import { eq, desc } from "drizzle-orm";

async function getActiveConnection() {
  const active = await getDb()
    .select()
    .from(connectionCodes)
    .where(eq(connectionCodes.isActive, 1))
    .orderBy(desc(connectionCodes.createdAt))
    .limit(1);

  if (active.length === 0) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "No active connection found. Please configure a connection code first.",
    });
  }

  return {
    apiKey: active[0].apiKey,
    apiUrl: active[0].apiUrl,
  };
}

async function externalFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const { apiKey, apiUrl } = await getActiveConnection();
  const url = `${apiUrl.replace(/\/$/, "")}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `External API error: ${response.status} - ${errorText}`,
    });
  }

  return response.json() as Promise<Record<string, unknown>>;
}

export const externalRouter = createRouter({
  products: publicQuery.query(async () => {
    try {
      const data = (await externalFetch("/products")) as unknown as unknown[];

      // Cache products
      if (Array.isArray(data)) {
        for (const product of data as Record<string, unknown>[]) {
          await getDb()
            .insert(productsCache)
            .values({
              externalId: String(product.id),
              name: (product.name || product.name_en || "") as string,
              description: (product.description || product.desc_en || "") as string,
              nameEnHtml: product.name_en_html as string | null,
              descEn: product.desc_en as string | null,
              price: product.price ? String(product.price) : null,
              imageUrl: product.image_url as string | null,
              rawData: product,
            })
            .onDuplicateKeyUpdate({
              set: {
                name: (product.name || product.name_en || "") as string,
                description: (product.description || product.desc_en || "") as string,
                nameEnHtml: product.name_en_html as string | null,
                descEn: product.desc_en as string | null,
                price: product.price ? String(product.price) : null,
                imageUrl: product.image_url as string | null,
                rawData: product,
                updatedAt: new Date(),
              },
            });
        }
      }

      return data;
    } catch (error) {
      // Return cached products if external API fails
      const cached = await getDb()
        .select()
        .from(productsCache)
        .orderBy(desc(productsCache.updatedAt));

      return cached.map((p) => {
        const rawData = (p.rawData || {}) as Record<string, unknown>;
        return {
          id: p.externalId,
          name: p.name,
          description: p.description,
          name_en_html: p.nameEnHtml,
          desc_en: p.descEn,
          price: p.price,
          image_url: p.imageUrl,
          ...rawData,
        };
      });
    }
  }),

  balance: publicQuery.query(async () => {
    return externalFetch("/balance");
  }),

  purchase: publicQuery
    .input(
      z.object({
        productId: z.string().min(1),
        qty: z.number().int().min(1).default(1),
        buyerInfo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await externalFetch("/purchase", {
          method: "POST",
          body: JSON.stringify({
            product_id: input.productId,
            qty: input.qty,
            buyer_info: input.buyerInfo || "",
          }),
        });

        // Save order to database
        await getDb().insert(orders).values({
          productId: input.productId,
          quantity: input.qty,
          buyerInfo: input.buyerInfo || "",
          status: "success",
          codes: result.codes ? JSON.stringify(result.codes) : null,
        });

        return result as Record<string, unknown>;
      } catch (error) {
        // Save failed order
        await getDb().insert(orders).values({
          productId: input.productId,
          quantity: input.qty,
          buyerInfo: input.buyerInfo || "",
          status: "failed",
          errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        throw error;
      }
    }),

  orders: publicQuery.query(async () => {
    return getDb()
      .select()
      .from(orders)
      .orderBy(desc(orders.createdAt));
  }),
});
