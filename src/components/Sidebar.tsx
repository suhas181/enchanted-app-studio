import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Apple, 
  Heart, 
  Calendar, 
  Moon, 
  Monitor, 
  Dumbbell, 
  Settings, 
  X, 
  Menu, 
  Sparkles, 
  TrendingUp, 
  Target 
} from "lucide-react";
import { PetMood } from "./Pet";
import { TabType } from "./BottomNav";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  petName: string;
  petMood: PetMood;
  onPetMoodChange: (mood: PetMood) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Sidebar = ({ 
  isOpen, 
  onClose, 
  userName, 
  petName, 
  petMood, 
  onPetMoodChange, 
  activeTab,
  onTabChange
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "diet", label: "Diet", icon: Apple },
    { id: "heart", label: "Heart", icon: Heart },
    { id: "diary", label: "Diary", icon: Calendar },
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "screen", label: "Screen Time", icon: Monitor },
    { id: "workouts", label: "Workouts", icon: Dumbbell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed left-0 top-0 bottom-0 w-80 glass-card rounded-r-3xl z-50 p-6 flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-muted/30 backdrop-blur flex items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
                <h2 className="text-xl font-display font-bold text-foreground">
                  Menu
                </h2>
              </div>
              <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="w-8 h-8 rounded-lg bg-muted/30 backdrop-blur flex items-center justify-center hover:bg-muted/50 transition-colors"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <Menu className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* User Greeting */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Hey, {userName}!
              </h3>
              <p className="text-sm text-muted-foreground">
                Welcome to your wellness journey
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <motion.li key={item.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button
                        onClick={() => onTabChange(item.id as TabType)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                          isActive 
                            ? "bg-primary/20 text-primary" 
                            : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {!isCollapsed && <span className="font-medium transition-opacity duration-300">{item.label}</span>}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Weekly Summary */}
            <motion.div 
              className="glass-card p-4 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  {!isCollapsed && (
                    <>
                      <p className="font-semibold text-foreground">Weekly Summary</p>
                      <p className="text-xs text-muted-foreground">Spotify Wrapped style</p>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Track your health trends and achievements
              </p>
            </motion.div>

            {/* Major Reflections */}
            <motion.div 
              className="glass-card p-4 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-glow-purple/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-glow-purple" />
                </div>
                <div>
                  {!isCollapsed && (
                    <>
                      <p className="font-semibold text-foreground">Major Reflections</p>
                      <p className="text-xs text-muted-foreground">Goals & lifestyle changes</p>
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Reflect on your goals and lifestyle
              </p>
            </motion.div>

            {/* Pet Status */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  {!isCollapsed && (
                    <>
                      <p className="font-semibold text-foreground">{petName}'s Mood</p>
                      <p className="text-sm text-muted-foreground capitalize">{petMood}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {(["happy", "tired", "hungry", "energetic"] as PetMood[]).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => onPetMoodChange(mood)}
                    className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                      petMood === mood
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};