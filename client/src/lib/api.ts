import type { Habit, NewHabit, HabitEntry, NewHabitEntry } from "@db/schema";

export async function createHabit(habit: NewHabit): Promise<Habit> {
  const response = await fetch("/api/habits", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(habit),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create habit");
  }
  
  return response.json();
}

export async function getHabits(): Promise<Habit[]> {
  const response = await fetch("/api/habits");
  if (!response.ok) {
    throw new Error("Failed to fetch habits");
  }
  return response.json();
}

export async function createEntry(entry: NewHabitEntry): Promise<HabitEntry> {
  const response = await fetch("/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  
  if (!response.ok) {
    throw new Error("Failed to create entry");
  }
  
  return response.json();
}

export async function getEntries(habitId: number): Promise<HabitEntry[]> {
  const response = await fetch(`/api/habits/${habitId}/entries`);
  if (!response.ok) {
    throw new Error("Failed to fetch entries");
  }
  return response.json();
}
