import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const expensesTable = sqliteTable("expenses_table", {
  id: int().primaryKey({ autoIncrement: true }),
  description: text().notNull(),
  amount: int().notNull(),
  category: text().notNull(),
  date: text().notNull(),  
  userId: int().references(() => usersTable.id),
  createdAt: text().notNull().default(sql`CURRENT_TIMESTAMP`)
});

