import { ExampleProfile, exampleProfiles } from "@/lib/example-data";
import { HabitGrid } from "@/components/HabitGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="py-20 px-6 text-center bg-primary/5">
        <h1 className="text-4xl font-bold mb-4">Track Your Progress, Build Better Habits</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Visualize your daily habits with beautiful contribution grids, inspired by GitHub's activity tracker.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground">
          Get Started
        </Button>
      </div>

      {/* Example Profiles */}
      <div className="container mx-auto py-16 px-6">
        <h2 className="text-2xl font-semibold mb-12 text-center">See How Others Track Their Progress</h2>
        <div className="grid gap-12">
          {exampleProfiles.map((profile, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {profile.habits.map((habit, habitIndex) => (
                  <div key={habitIndex} className="mb-8">
                    <h3 className="text-lg font-medium mb-4">{habit.name}</h3>
                    <div className="bg-card rounded-lg p-4">
                      <HabitGrid entries={habit.entries} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-primary/5 py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-12 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Custom Habits</CardTitle>
                <CardDescription>
                  Track any daily activity that matters to you
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Visual Progress</CardTitle>
                <CardDescription>
                  Beautiful contribution grids show your consistency
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Insights</CardTitle>
                <CardDescription>
                  Understand your patterns and improve
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
