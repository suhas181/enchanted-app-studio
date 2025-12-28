import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Menu, X, TrendingUp, Target, ChevronRight, Sparkles } from "lucide-react";
import { BottomNav, TabType } from "./BottomNav";
import { FloatingParticles } from "./FloatingParticles";
import { HomeTab } from "./tabs/HomeTab";
import { DietTab } from "./tabs/DietTab";
import { HeartTab } from "./tabs/HeartTab";
import { DiaryTab } from "./tabs/DiaryTab";
import { SleepTab } from "./tabs/SleepTab";
import { ScreenTimeTab } from "./tabs/ScreenTimeTab";
import { WorkoutsTab } from "./tabs/WorkoutsTab";
import { PetMood } from "./Pet";

interface MainAppProps {
  userName: string;
  petName: string;
}

export const MainApp = ({ userName, petName }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [petMood, setPetMood] = useState<PetMood>("happy");

  const renderTab = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab petName={petName} petMood={petMood} />;
      case "diet":
        return <DietTab />;
      case "heart":
        return <HeartTab />;
      case "diary":
        return <DiaryTab />;
      case "sleep":
        return <SleepTab />;
      case "screen":
        return <ScreenTimeTab />;
      case "workouts":
        return <WorkoutsTab />;
      default:
        return <HomeTab petName={petName} petMood={petMood} />;
    }
  };

  return (
    <div className="min-h-screen bg-background bg-mesh relative overflow-hidden">
      <FloatingParticles />

      {/* Header - Only show when not on home */}
      {activeTab !== "home" && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 glass-card rounded-none border-t-0 border-x-0"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            <h1 className="font-display font-bold text-foreground">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>

            <button className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center">
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </motion.header>
      )}

      {/* Home Header */}
      {activeTab === "home" && (
        <motion.header
          className="fixed top-0 left-0 right-0 z-40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 rounded-full bg-muted/30 backdrop-blur flex items-center justify-center"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            <button className="w-10 h-10 rounded-full bg-muted/30 backdrop-blur flex items-center justify-center">
              <Settings className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <main className={`relative z-10 ${activeTab !== "home" ? "pt-20" : "pt-16"}`}>
        <AnimatePresence mode="wait">
          {renderTab()}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Content */}
            <motion.div
              className="fixed left-0 top-0 bottom-0 w-80 glass-card rounded-r-3xl z-50 p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-display font-bold text-foreground">
                  Hey, {userName}!
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Weekly Summary */}
                <motion.button
                  className="w-full glass-card p-4 flex items-center gap-4"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">Weekly Summary</p>
                    <p className="text-sm text-muted-foreground">Spotify Wrapped style</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>

                {/* Major Reflections */}
                <motion.button
                  className="w-full glass-card p-4 flex items-center gap-4"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-glow-purple/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-glow-purple" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">Major Reflections</p>
                    <p className="text-sm text-muted-foreground">Goals & lifestyle changes</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </motion.button>

                {/* Divider */}
                <div className="h-px bg-border/50 my-6" />

                {/* Pet Status */}
                <div className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{petName}'s Mood</p>
                      <p className="text-sm text-muted-foreground capitalize">{petMood}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {(["happy", "tired", "hungry", "energetic"] as PetMood[]).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setPetMood(mood)}
                        className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                          petMood === mood
                            ? "bg-primary/20 text-primary"
                            : "bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
