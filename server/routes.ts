import type { Express } from "express";
import { createServer } from "http";
import { db } from "@db";
import { habits, habitEntries } from "@db/schema";
import { eq } from "drizzle-orm";

export function registerRoutes(app: Express) {
  const httpServer = createServer(app);

  app.get("/api/habits", async (_req, res) => {
    const results = await db.select().from(habits);
    res.json(results);
  });

  app.post("/api/habits", async (req, res) => {
    const habit = await db.insert(habits).values(req.body).returning();
    res.json(habit[0]);
  });

  app.get("/api/habits/:id/entries", async (req, res) => {
    const entries = await db
      .select()
      .from(habitEntries)
      .where(eq(habitEntries.habitId, parseInt(req.params.id)))
      .orderBy(habitEntries.date);
    
    res.json(entries);
  });

  app.post("/api/entries", async (req, res) => {
    const entry = await db
      .insert(habitEntries)
      .values(req.body)
      .returning();
    
    res.json(entry[0]);
  });

  return httpServer;
}
