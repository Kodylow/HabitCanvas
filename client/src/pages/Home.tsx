import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HabitGrid } from "@/components/HabitGrid";
import { HabitForm } from "@/components/HabitForm";
import { createHabit, getHabits, createEntry, getEntries } from "@/lib/api";
import type { Habit } from "@db/schema";

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
    <div className="container mx-auto py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <HabitForm onSubmit={createHabitMutation.mutateAsync} />
        
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
      </div>

      {selectedHabit && (
        <Card>
          <CardHeader>
            <CardTitle>Activity Grid - {selectedHabit.name}</CardTitle>
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
    </div>
  );
}
