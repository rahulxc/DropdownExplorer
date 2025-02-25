import { pgTable, text, serial, integer, boolean, jsonb, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cocktails = pgTable("cocktails", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: jsonb("ingredients").notNull().$type<{name: string, amount: number}[]>(),
  color: text("color").notNull(),
  garnish: text("garnish").notNull(),
  glassware: text("glassware").notNull(),
  method: text("method").notNull(),
  description: text("description").notNull(),
  preparation: text("preparation").notNull()
});

export const insertCocktailSchema = createInsertSchema(cocktails);
export type InsertCocktail = z.infer<typeof insertCocktailSchema>;
export type Cocktail = typeof cocktails.$inferSelect;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
