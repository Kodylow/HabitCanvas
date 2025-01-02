import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HabitGrid } from "@/components/HabitGrid";
import { HabitForm } from "@/components/HabitForm";
import { createHabit, getHabits, createEntry, getEntries } from "@/lib/api";
import type { Habit } from "@db/schema";
import { UserCircle, Settings, PlusCircle, BarChart } from "lucide-react";

export function Home() {
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const queryClient = useQueryClient();

  const { data: habits = [] } = useQuery({
    queryKey: ["/api/habits"],
    queryFn: getHabits,
  });

  const { data: entries = [] } = useQuery({
    queryKey: ["/api/habits", selectedHabit?.id, "entries"],
    queryFn: () => selectedHabit ? getEntries(selectedHabit.id) : Promise.resolve([]),
    enabled: !!selectedHabit,
  });

  const createHabitMutation = useMutation({
    mutationFn: createHabit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
    },
  });

  const createEntryMutation = useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["/api/habits", selectedHabit?.id, "entries"]
      });
    },
  });

  const handleTrackToday = async () => {
    if (!selectedHabit) return;

    await createEntryMutation.mutateAsync({
      habitId: selectedHabit.id,
      date: new Date().toISOString(),
      count: 1,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card px-4 py-6 hidden md:block">
        <div className="flex items-center gap-3 mb-8">
          <UserCircle className="w-8 h-8" />
          <div>
            <h2 className="font-semibold">Your Profile</h2>
          </div>
        </div>

        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
            <BarChart className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => {}}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </nav>

        <div className="mt-8">
          <Button className="w-full" onClick={() => {}}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Habit
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Habit Selection and Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Track Habit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedHabit?.id?.toString()}
                onValueChange={(value) => {
                  const habit = habits.find(h => h.id === parseInt(value));
                  setSelectedHabit(habit || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a habit" />
                </SelectTrigger>
                <SelectContent>
                  {habits.map((habit) => (
                    <SelectItem key={habit.id} value={habit.id.toString()}>
                      {habit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedHabit && (
                <Button 
                  onClick={handleTrackToday}
                  disabled={createEntryMutation.isPending}
                >
                  Track Today
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Activity Grid */}
          {selectedHabit && (
            <Card>
              <CardHeader>
                <CardTitle>{selectedHabit.name}</CardTitle>
                {selectedHabit.description && (
                  <p className="text-sm text-muted-foreground">{selectedHabit.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <HabitGrid 
                  entries={entries.map(e => ({
                    date: e.date,
                    count: e.count
                  }))}
                />
              </CardContent>
            </Card>
          )}

          {/* Create New Habit Form */}
          <HabitForm onSubmit={createHabitMutation.mutateAsync} />
        </div>
      </main>
    </div>
  );
}