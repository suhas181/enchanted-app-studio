import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Menu, ChevronRight } from "lucide-react";
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
import { Sidebar } from "./Sidebar";

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

      {/* New Optimized Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userName={userName}
        petName={petName}
        petMood={petMood}
        onPetMoodChange={setPetMood}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};
