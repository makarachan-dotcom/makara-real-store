import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  decimal,
  json,
  int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const connectionCodes = mysqlTable("connection_codes", {
  id: serial("id").primaryKey(),
  apiKey: text("api_key").notNull(),
  apiUrl: text("api_url").notNull(),
  isActive: int("is_active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ConnectionCode = typeof connectionCodes.$inferSelect;
export type InsertConnectionCode = typeof connectionCodes.$inferInsert;

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  productId: varchar("product_id", { length: 255 }).notNull(),
  productName: varchar("product_name", { length: 500 }),
  quantity: int("quantity").default(1).notNull(),
  buyerInfo: text("buyer_info"),
  status: mysqlEnum("status", ["success", "failed", "pending"])
    .default("pending")
    .notNull(),
  codes: text("codes"),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export const productsCache = mysqlTable("products_cache", {
  id: serial("id").primaryKey(),
  externalId: varchar("external_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 500 }),
  description: text("description"),
  nameEnHtml: text("name_en_html"),
  descEn: text("desc_en"),
  price: decimal("price", { precision: 10, scale: 2 }),
  imageUrl: text("image_url"),
  rawData: json("raw_data"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ProductCache = typeof productsCache.$inferSelect;
export type InsertProductCache = typeof productsCache.$inferInsert;
