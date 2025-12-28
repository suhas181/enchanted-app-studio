import { motion } from "framer-motion";
import { Mic } from "lucide-react";

interface TalkButtonProps {
  onPress: () => void;
  isListening?: boolean;
}

export const TalkButton = ({ onPress, isListening = false }: TalkButtonProps) => {
  return (
    <motion.button
      onClick={onPress}
      className="relative"
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/30"
        animate={isListening ? {
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{ transform: "scale(1.5)" }}
      />
      
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        animate={isListening ? {
          scale: [1, 1.8, 1],
          opacity: [0.3, 0, 0.3],
        } : {}}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.2,
        }}
        style={{ transform: "scale(1.8)" }}
      />
      
      {/* Main button */}
      <motion.div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isListening 
            ? "bg-gradient-to-br from-accent to-accent/80" 
            : "bg-gradient-to-br from-primary to-primary/80"
        }`}
        animate={{
          boxShadow: isListening 
            ? "0 0 40px hsl(340 65% 70% / 0.5)"
            : "0 0 30px hsl(174 72% 56% / 0.4)",
        }}
      >
        <Mic className="w-7 h-7 text-primary-foreground" />
        
        {/* Inner shine */}
        <div className="absolute top-2 left-3 w-4 h-4 rounded-full bg-foreground/20 blur-sm" />
      </motion.div>
      
      {/* Label */}
      <motion.p
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-muted-foreground whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {isListening ? "Listening..." : "Talk to me"}
      </motion.p>
    </motion.button>
  );
};
