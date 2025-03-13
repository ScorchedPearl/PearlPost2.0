"use client";
import { useState, useEffect } from "react";
import { Header } from "./_profile/header";
import { StatsGrid } from "./_profile/statsGrid";
import { EngagementChart } from "./_profile/engagementChart";
import { ProfileCard } from "./_profile/profileCard";
import { ActivityFeed } from "./_profile/activityFeed";
import { Progress } from "@ui/components/ui/progress";
import { toast } from "sonner";
import { useCurrentUser } from "@hooks/user";
const Index = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);
  const { user, isLoading } = useCurrentUser();
  useEffect(() => {
    if (!loading) {
      toast.success("Welcome back, Alex!", {
        description:
          "Your dashboard has been updated with the latest insights.",
        duration: 5000,
      });
    }
  }, [loading]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-xs space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-medium text-gradient animate-pulse">
              Pulse
            </h1>
            <p className="text-sm text-muted-foreground">
              Loading your dashboard
            </p>
          </div>
          <Progress value={progress} className="h-1 bg-secondary" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />

      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>
          <p className="text-muted-foreground animate-fade-in opacity-0 delay-100">
            Your social media performance at a glance
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 mx-4">
            <StatsGrid user={user}/>
            <div className="mt-13 ">
            <EngagementChart />
            </div>
          </div>
          <div className="lg:col-span-1">
           <div className="h-2/5">
            <ActivityFeed />
            </div>
            <div className="h-1/3 mt-18">
            <ProfileCard user={user} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
