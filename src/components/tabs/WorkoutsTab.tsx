import { motion } from "framer-motion";
import { Dumbbell, Brain, Flame, Timer, Trophy, ChevronRight } from "lucide-react";
import { useState } from "react";

type WorkoutType = "body" | "mind";

export const WorkoutsTab = () => {
  const [activeType, setActiveType] = useState<WorkoutType>("body");

  const bodyWorkouts = [
    { name: "Morning Stretch", duration: "10 min", calories: 45, completed: true },
    { name: "HIIT Cardio", duration: "20 min", calories: 250, completed: true },
    { name: "Upper Body", duration: "30 min", calories: 180, completed: false },
  ];

  const mindWorkouts = [
    { name: "Breathing Exercise", duration: "5 min", type: "Focus", completed: true },
    { name: "Guided Meditation", duration: "15 min", type: "Calm", completed: false },
    { name: "Body Scan", duration: "10 min", type: "Relaxation", completed: false },
  ];

  const workouts = activeType === "body" ? bodyWorkouts : mindWorkouts;

  return (
    <motion.div
      className="tab-content p-4 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
        Workouts
      </h2>

      {/* Toggle */}
      <motion.div
        className="glass-card p-1 flex"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.button
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
            activeType === "body" 
              ? "bg-primary/20 text-primary" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveType("body")}
          whileTap={{ scale: 0.98 }}
        >
          <Dumbbell className="w-5 h-5" />
          Body
        </motion.button>
        <motion.button
          className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
            activeType === "mind" 
              ? "bg-glow-purple/20 text-glow-purple" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => setActiveType("mind")}
          whileTap={{ scale: 0.98 }}
        >
          <Brain className="w-5 h-5" />
          Mind
        </motion.button>
      </motion.div>

      {/* Stats */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-card p-4 text-center">
          <Flame className="w-6 h-6 text-secondary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">475</p>
          <p className="text-xs text-muted-foreground">Calories</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Timer className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">45</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Trophy className="w-6 h-6 text-mood-happy mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">5</p>
          <p className="text-xs text-muted-foreground">Streak</p>
        </div>
      </motion.div>

      {/* Workout List */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-foreground">
          {activeType === "body" ? "Today's Exercises" : "Mind Sessions"}
        </h3>
        
        {workouts.map((workout, i) => (
          <motion.button
            key={workout.name}
            className={`w-full glass-card p-4 flex items-center gap-4 transition-all ${
              workout.completed ? "opacity-70" : ""
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              workout.completed 
                ? "bg-mood-happy/20" 
                : activeType === "body" ? "bg-primary/20" : "bg-glow-purple/20"
            }`}>
              {workout.completed ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-mood-happy text-xl"
                >
                  ✓
                </motion.div>
              ) : activeType === "body" ? (
                <Dumbbell className="w-6 h-6 text-primary" />
              ) : (
                <Brain className="w-6 h-6 text-glow-purple" />
              )}
            </div>
            
            <div className="flex-1 text-left">
              <p className={`font-medium ${workout.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {workout.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {workout.duration} • {"calories" in workout ? `${workout.calories} cal` : workout.type}
              </p>
            </div>
            
            {!workout.completed && (
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Start Workout Button */}
      <motion.button
        className="w-full btn-primary py-4 flex items-center justify-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        {activeType === "body" ? (
          <>
            <Dumbbell className="w-5 h-5" />
            Start Next Workout
          </>
        ) : (
          <>
            <Brain className="w-5 h-5" />
            Begin Session
          </>
        )}
      </motion.button>
    </motion.div>
  );
};
