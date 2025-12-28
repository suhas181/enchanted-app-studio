import { motion } from "framer-motion";
import { Pet, PetMood } from "../Pet";
import { TalkButton } from "../TalkButton";
import { useState } from "react";

interface HomeTabProps {
  petName: string;
  petMood: PetMood;
}

export const HomeTab = ({ petName, petMood }: HomeTabProps) => {
  const [isListening, setIsListening] = useState(false);
  const [petReaction, setPetReaction] = useState<string | null>(null);

  const handleTalk = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  const handlePetTap = () => {
    const reactions = ["*happy bounce*", "*purrs*", "*giggles*", "*wiggles ears*"];
    setPetReaction(reactions[Math.floor(Math.random() * reactions.length)]);
    setTimeout(() => setPetReaction(null), 2000);
  };

  return (
    <motion.div
      className="tab-content flex flex-col items-center justify-center px-4 -mt-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pet Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <Pet 
          mood={petMood} 
          name={petName}
          onTap={handlePetTap}
        />
        
        {/* Pet reaction bubble */}
        <motion.div
          className="mt-4 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: petReaction ? 1 : 0 }}
        >
          {petReaction && (
            <motion.div
              className="px-4 py-2 rounded-full bg-card/80 backdrop-blur text-sm text-foreground/80"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              {petReaction}
            </motion.div>
          )}
        </motion.div>

        {/* Status indicators */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { label: "Energy", value: 85, color: "bg-mood-happy" },
            { label: "Mood", value: 92, color: "bg-primary" },
            { label: "Health", value: 78, color: "bg-accent" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center relative overflow-hidden">
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 ${stat.color}/30`}
                  initial={{ height: 0 }}
                  animate={{ height: `${stat.value}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                />
                <span className="relative text-sm font-bold text-foreground">{stat.value}</span>
              </div>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Talk Button */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <TalkButton onPress={handleTalk} isListening={isListening} />
      </motion.div>
    </motion.div>
  );
};
