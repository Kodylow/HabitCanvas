import { addDays, subDays, startOfYear } from "date-fns";

export type ExampleProfile = {
  name: string;
  description: string;
  habits: {
    name: string;
    entries: { date: string; count: number }[];
  }[];
};

function generateEntries(intensity: number) {
  const entries: { date: string; count: number }[] = [];
  const today = new Date();
  const yearStart = startOfYear(today);
  let currentDate = yearStart;

  while (currentDate <= today) {
    // Random distribution of activities
    if (Math.random() < intensity) {
      entries.push({
        date: currentDate.toISOString(),
        count: Math.floor(Math.random() * 4) + 1
      });
    }
    currentDate = addDays(currentDate, 1);
  }

  return entries;
}

export const exampleProfiles: ExampleProfile[] = [
  {
    name: "Fitness Enthusiast",
    description: "Tracking daily workouts and meditation sessions",
    habits: [
      {
        name: "Daily Exercise",
        entries: generateEntries(0.8) // High activity
      },
      {
        name: "Meditation",
        entries: generateEntries(0.6)
      }
    ]
  },
  {
    name: "Learning Developer",
    description: "Building coding habits one day at a time",
    habits: [
      {
        name: "Code Practice",
        entries: generateEntries(0.7)
      },
      {
        name: "Read Tech Articles",
        entries: generateEntries(0.5)
      }
    ]
  },
  {
    name: "Wellness Journey",
    description: "Focusing on health and mindfulness",
    habits: [
      {
        name: "Healthy Meals",
        entries: generateEntries(0.9)
      },
      {
        name: "8h Sleep",
        entries: generateEntries(0.75)
      }
    ]
  }
];
