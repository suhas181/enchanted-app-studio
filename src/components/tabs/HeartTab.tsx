import { motion } from "framer-motion";
import { Heart, AlertTriangle, Activity, Clock } from "lucide-react";
import { useState } from "react";

export const HeartTab = () => {
  const [isRecording, setIsRecording] = useState(false);
  const currentBPM = 72;

  const heartRateHistory = [
    { time: "8:00 AM", bpm: 68, status: "resting" },
    { time: "12:30 PM", bpm: 85, status: "active" },
    { time: "3:00 PM", bpm: 72, status: "normal" },
  ];

  return (
    <motion.div
      className="tab-content p-4 space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-display font-bold text-foreground mb-6">
        Heart Rate
      </h2>

      {/* Current Heart Rate */}
      <motion.div
        className="glass-card p-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="relative inline-flex items-center justify-center w-40 h-40 mx-auto mb-4"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/20"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-accent/10"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.2,
            }}
          />
          
          {/* Heart container */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-accent fill-accent/50" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-5xl font-display font-bold text-foreground">{currentBPM}</p>
          <p className="text-muted-foreground">BPM</p>
        </motion.div>
      </motion.div>

      {/* Measure Button */}
      <motion.button
        className={`w-full glass-card p-5 flex items-center justify-center gap-3 transition-all duration-300 ${
          isRecording ? "ring-2 ring-accent/50" : ""
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={() => setIsRecording(!isRecording)}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
          isRecording ? "bg-accent/30" : "bg-primary/20"
        }`}>
          <Activity className={`w-6 h-6 ${isRecording ? "text-accent" : "text-primary"}`} />
        </div>
        <div className="text-left">
          <h3 className="font-semibold text-foreground">
            {isRecording ? "Recording..." : "Measure Heart Rate"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isRecording ? "Place finger on camera" : "Use camera + flashlight"}
          </p>
        </div>
      </motion.button>

      {/* Panic Attack Logger */}
      <motion.button
        className="w-full glass-card p-5 flex items-center gap-3 border-destructive/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <div className="text-left flex-1">
          <h3 className="font-semibold text-foreground">Log Panic Attack</h3>
          <p className="text-sm text-muted-foreground">Record and reflect on triggers</p>
        </div>
      </motion.button>

      {/* History */}
      <motion.div
        className="glass-card p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Today's Readings
        </h3>
        
        <div className="space-y-3">
          {heartRateHistory.map((reading, i) => (
            <motion.div
              key={reading.time}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  reading.status === "resting" ? "bg-primary" :
                  reading.status === "active" ? "bg-secondary" : "bg-mood-happy"
                }`} />
                <div>
                  <p className="font-medium text-foreground">{reading.time}</p>
                  <p className="text-sm text-muted-foreground capitalize">{reading.status}</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-accent">{reading.bpm} BPM</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
