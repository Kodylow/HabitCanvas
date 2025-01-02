import { pgTable, serial, text, date, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const habitEntries = pgTable("habit_entries", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id").references(() => habits.id).notNull(),
  date: date("date").notNull(),
  count: integer("count").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const habitsRelations = relations(habits, ({ many }) => ({
  entries: many(habitEntries)
}));

export const habitEntriesRelations = relations(habitEntries, ({ one }) => ({
  habit: one(habits, {
    fields: [habitEntries.habitId],
    references: [habits.id]
  })
}));

export const insertHabitSchema = createInsertSchema(habits);
export const selectHabitSchema = createSelectSchema(habits);
export const insertHabitEntrySchema = createInsertSchema(habitEntries);
export const selectHabitEntrySchema = createSelectSchema(habitEntries);

export type Habit = typeof habits.$inferSelect;
export type NewHabit = typeof habits.$inferInsert;
export type HabitEntry = typeof habitEntries.$inferSelect;
export type NewHabitEntry = typeof habitEntries.$inferInsert;
