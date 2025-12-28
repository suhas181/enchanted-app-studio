import { motion } from "framer-motion";
import { Moon, Sun, Clock, Sparkles, TrendingUp } from "lucide-react";

export const SleepTab = () => {
  const sleepData = {
    hours: 7.5,
    quality: 82,
    rem: 1.8,
    deep: 2.1,
    light: 3.6,
    bedtime: "11:30 PM",
    wakeTime: "7:00 AM",
  };

  const weekData = [
    { day: "Mon", hours: 7 },
    { day: "Tue", hours: 6.5 },
    { day: "Wed", hours: 8 },
    { day: "Thu", hours: 7.5 },
    { day: "Fri", hours: 6 },
    { day: "Sat", hours: 9 },
    { day: "Sun", hours: 7.5 },
  ];

  const maxHours = Math.max(...weekData.map(d => d.hours));

  return (
    <motion.div
      className="tab-content p-4 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
        Sleep Tracking
      </h2>

      {/* Sleep Score */}
      <motion.div
        className="glass-card p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="relative inline-flex items-center justify-center w-36 h-36 mx-auto mb-4"
        >
          {/* Progress ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="72"
              cy="72"
              r="60"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="72"
              cy="72"
              r="60"
              stroke="url(#sleepGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 377" }}
              animate={{ strokeDasharray: `${sleepData.quality * 3.77} 377` }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--glow-purple))" />
                <stop offset="100%" stopColor="hsl(var(--primary))" />
              </linearGradient>
            </defs>
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-4xl font-display font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {sleepData.quality}%
            </motion.span>
            <span className="text-sm text-muted-foreground">Quality</span>
          </div>
        </motion.div>

        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-glow-purple" />
            <span className="text-sm text-muted-foreground">{sleepData.bedtime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">{sleepData.wakeTime}</span>
          </div>
        </div>
      </motion.div>

      {/* Sleep Stages */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-glow-purple" />
          Sleep Stages
        </h3>
        
        <div className="space-y-4">
          {[
            { label: "REM", hours: sleepData.rem, color: "bg-glow-purple", percentage: (sleepData.rem / sleepData.hours) * 100 },
            { label: "Deep", hours: sleepData.deep, color: "bg-primary", percentage: (sleepData.deep / sleepData.hours) * 100 },
            { label: "Light", hours: sleepData.light, color: "bg-muted-foreground", percentage: (sleepData.light / sleepData.hours) * 100 },
          ].map((stage, i) => (
            <div key={stage.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{stage.label}</span>
                <span className="text-foreground font-medium">{stage.hours}h</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${stage.color} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${stage.percentage}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Week Overview */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          This Week
        </h3>
        
        <div className="flex items-end justify-between h-32">
          {weekData.map((day, i) => (
            <div key={day.day} className="flex flex-col items-center gap-2">
              <motion.div
                className="w-8 rounded-t-lg bg-gradient-to-t from-primary/50 to-primary"
                initial={{ height: 0 }}
                animate={{ height: `${(day.hours / maxHours) * 80}px` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
              />
              <span className="text-xs text-muted-foreground">{day.day}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Avg: {(weekData.reduce((a, b) => a + b.hours, 0) / 7).toFixed(1)}h / night</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
