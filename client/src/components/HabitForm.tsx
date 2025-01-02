import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { NewHabit } from "@db/schema";

type HabitFormProps = {
  onSubmit: (data: NewHabit) => Promise<void>;
};

export function HabitForm({ onSubmit }: HabitFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<NewHabit>();

  const handleSubmit = async (data: NewHabit) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      form.reset();
      toast({
        title: "Success",
        description: "Habit created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create habit",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Habit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...form.register("name", { required: true })}
              placeholder="Enter habit name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter habit description"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Habit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
