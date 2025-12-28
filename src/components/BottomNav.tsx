import { motion } from "framer-motion";
import { 
  Apple, 
  Heart, 
  BookOpen, 
  Moon, 
  Smartphone, 
  Dumbbell,
  Home
} from "lucide-react";

export type TabType = "home" | "diet" | "heart" | "diary" | "sleep" | "screen" | "workouts";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; icon: React.ElementType; label: string }[] = [
  { id: "diet", icon: Apple, label: "Diet" },
  { id: "heart", icon: Heart, label: "Heart" },
  { id: "diary", icon: BookOpen, label: "Diary" },
  { id: "home", icon: Home, label: "Home" },
  { id: "sleep", icon: Moon, label: "Sleep" },
  { id: "screen", icon: Smartphone, label: "Screen" },
  { id: "workouts", icon: Dumbbell, label: "Workout" },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 glass-card rounded-t-3xl border-t border-border/30"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isHome = tab.id === "home";
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item relative ${isActive ? "active" : ""} ${isHome ? "scale-110" : ""}`}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 bg-primary/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon 
                className={`relative z-10 ${isHome ? "w-7 h-7" : "w-5 h-5"} ${isActive ? "text-primary" : ""}`} 
              />
              <span className={`relative z-10 text-[10px] font-medium ${isHome ? "hidden" : ""}`}>
                {tab.label}
              </span>
              {isHome && isActive && (
                <motion.div
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                  layoutId="homeDot"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};
