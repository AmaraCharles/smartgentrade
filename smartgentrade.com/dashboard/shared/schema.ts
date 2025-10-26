import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  dateOfBirth: text("date_of_birth"),
  address: text("address"),
  country: text("country"),
  membershipId: text("membership_id").notNull(),
  kycStatus: text("kyc_status").notNull().default('pending'),
  accountLevel: integer("account_level").notNull().default(1),
  balance: decimal("balance", { precision: 10, scale: 2 }).notNull().default('0'),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const tradingPairs = pgTable("trading_pairs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  symbol: text("symbol").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  currentPrice: decimal("current_price", { precision: 20, scale: 8 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
});

export const masterTraders = pgTable("master_traders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  name: text("name").notNull(),
  profileLevel: text("profile_level").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  numberOfTrades: integer("number_of_trades").notNull(),
  commission: integer("commission").notNull(),
  profitableTradePercent: integer("profitable_trade_percent").notNull(),
  accountLevel: integer("account_level").notNull(),
  followers: integer("followers").notNull(),
  watchers: integer("watchers").notNull(),
  isOnline: integer("is_online").notNull().default(1),
  tradingProfileId: text("trading_profile_id").notNull(),
});

export const trades = pgTable("trades", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  tradingPairId: varchar("trading_pair_id").notNull(),
  type: text("type").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  entryPrice: decimal("entry_price", { precision: 20, scale: 8 }).notNull(),
  currentPrice: decimal("current_price", { precision: 20, scale: 8 }),
  status: text("status").notNull().default('active'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const copyTrades = pgTable("copy_trades", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  masterTraderId: varchar("master_trader_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(),
  status: text("status").notNull().default('active'),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  membershipId: true,
  kycStatus: true,
  accountLevel: true,
  balance: true,
  joinedAt: true,
});

export const insertTradingPairSchema = createInsertSchema(tradingPairs).omit({ id: true });
export const insertMasterTraderSchema = createInsertSchema(masterTraders).omit({ id: true });
export const insertTradeSchema = createInsertSchema(trades).omit({ id: true, createdAt: true });
export const insertCopyTradeSchema = createInsertSchema(copyTrades).omit({ id: true, createdAt: true, status: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TradingPair = typeof tradingPairs.$inferSelect;
export type MasterTrader = typeof masterTraders.$inferSelect;
export type Trade = typeof trades.$inferSelect;
export type CopyTrade = typeof copyTrades.$inferSelect;
export type InsertTrade = z.infer<typeof insertTradeSchema>;
export type InsertCopyTrade = z.infer<typeof insertCopyTradeSchema>;
