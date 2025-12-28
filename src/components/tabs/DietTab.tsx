import { motion } from "framer-motion";
import { Apple, Droplets, Camera, TrendingUp, Plus, Minus } from "lucide-react";
import { useState } from "react";

export const DietTab = () => {
  const [waterIntake, setWaterIntake] = useState(4);
  const waterGoal = 8;
  const caloriesConsumed = 1450;
  const calorieGoal = 2000;

  return (
    <motion.div
      className="tab-content p-4 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
        Today's Nutrition
      </h2>

      {/* Calorie Tracker */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Calories</h3>
            <p className="text-sm text-muted-foreground">Daily target</p>
          </div>
        </div>
        
        <div className="relative h-4 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-secondary to-secondary/70 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(caloriesConsumed / calorieGoal) * 100}%` }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-secondary font-semibold">{caloriesConsumed} kcal</span>
          <span className="text-muted-foreground">/ {calorieGoal} kcal</span>
        </div>
      </motion.div>

      {/* Water Intake */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Water Intake</h3>
              <p className="text-sm text-muted-foreground">{waterIntake} of {waterGoal} glasses</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setWaterIntake(Math.max(0, waterIntake - 1))}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
            >
              <Minus className="w-4 h-4 text-muted-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setWaterIntake(Math.min(waterGoal, waterIntake + 1))}
              className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 text-primary" />
            </motion.button>
          </div>
        </div>
        
        <div className="flex gap-2">
          {Array.from({ length: waterGoal }).map((_, i) => (
            <motion.div
              key={i}
              className={`flex-1 h-16 rounded-xl ${
                i < waterIntake ? "bg-primary/30" : "bg-muted/50"
              } flex items-end justify-center pb-2 transition-colors duration-300`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              style={{ transformOrigin: "bottom" }}
            >
              <Droplets 
                className={`w-4 h-4 ${i < waterIntake ? "text-primary" : "text-muted-foreground/30"}`} 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Capture Food */}
      <motion.button
        className="w-full glass-card p-5 flex items-center justify-center gap-3 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
          <Camera className="w-6 h-6 text-accent" />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-foreground">Capture Meal</h3>
          <p className="text-sm text-muted-foreground">Snap a photo to calculate calories</p>
        </div>
      </motion.button>

      {/* Today's meals */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Apple className="w-5 h-5 text-mood-happy" />
          Today's Meals
        </h3>
        
        <div className="space-y-3">
          {[
            { meal: "Breakfast", items: "Oatmeal, Banana, Coffee", cal: 350 },
            { meal: "Lunch", items: "Grilled Chicken Salad", cal: 520 },
            { meal: "Snack", items: "Greek Yogurt, Almonds", cal: 280 },
          ].map((meal, i) => (
            <motion.div
              key={meal.meal}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div>
                <p className="font-medium text-foreground">{meal.meal}</p>
                <p className="text-sm text-muted-foreground">{meal.items}</p>
              </div>
              <span className="text-secondary font-semibold">{meal.cal}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
