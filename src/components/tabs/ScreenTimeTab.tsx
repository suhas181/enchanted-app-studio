import { motion } from "framer-motion";
import { Smartphone, Clock, TrendingDown, AlertCircle, Instagram, Youtube, MessageSquare, Twitter } from "lucide-react";

export const ScreenTimeTab = () => {
  const totalTime = "5h 32m";
  const pickups = 47;
  
  const apps = [
    { name: "Instagram", time: "1h 45m", icon: Instagram, color: "text-accent" },
    { name: "YouTube", time: "1h 20m", icon: Youtube, color: "text-destructive" },
    { name: "Messages", time: "45m", icon: MessageSquare, color: "text-primary" },
    { name: "X / Twitter", time: "32m", icon: Twitter, color: "text-foreground" },
  ];

  const weeklyData = [
    { day: "Mon", hours: 4.5 },
    { day: "Tue", hours: 6.2 },
    { day: "Wed", hours: 5.1 },
    { day: "Thu", hours: 7.3 },
    { day: "Fri", hours: 5.5 },
    { day: "Sat", hours: 8.1 },
    { day: "Sun", hours: 5.5 },
  ];

  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  return (
    <motion.div
      className="tab-content p-4 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
        Screen Time
      </h2>

      {/* Today's Overview */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Today</p>
            <p className="text-4xl font-display font-bold text-foreground">{totalTime}</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-secondary" />
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1 p-3 rounded-xl bg-muted/30">
            <p className="text-2xl font-bold text-foreground">{pickups}</p>
            <p className="text-xs text-muted-foreground">Pickups</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-primary/10">
            <div className="flex items-center gap-1">
              <TrendingDown className="w-4 h-4 text-mood-happy" />
              <p className="text-2xl font-bold text-mood-happy">12%</p>
            </div>
            <p className="text-xs text-muted-foreground">vs Yesterday</p>
          </div>
        </div>
      </motion.div>

      {/* Top Apps */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-foreground mb-4">Most Used Apps</h3>
        
        <div className="space-y-3">
          {apps.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.name}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center">
                  <Icon className={`w-5 h-5 ${app.color}`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{app.name}</p>
                </div>
                <span className="text-sm font-semibold text-muted-foreground">{app.time}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Weekly Overview
        </h3>
        
        <div className="flex items-end justify-between h-32">
          {weeklyData.map((day, i) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <motion.div
                className={`w-8 rounded-t-lg ${
                  day.hours > 6 
                    ? "bg-gradient-to-t from-secondary/50 to-secondary" 
                    : "bg-gradient-to-t from-primary/50 to-primary"
                }`}
                initial={{ height: 0 }}
                animate={{ height: `${(day.hours / maxHours) * 80}px` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
              />
              <span className="text-xs text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Insight */}
      <motion.div
        className="glass-card p-5 border-secondary/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Doomscrolling Alert</h4>
            <p className="text-sm text-muted-foreground">
              You spent 45 minutes on Instagram between 11 PM - midnight. Consider setting a bedtime mode to improve sleep quality.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
