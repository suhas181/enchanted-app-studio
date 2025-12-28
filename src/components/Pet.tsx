import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type PetMood = "happy" | "tired" | "hungry" | "energetic" | "sleepy" | "neutral";

interface PetProps {
  mood?: PetMood;
  name?: string;
  onTap?: () => void;
}

const moodExpressions: Record<PetMood, { eyes: string; mouth: string; blush: boolean }> = {
  happy: { eyes: "◠ ◠", mouth: "◡", blush: true },
  tired: { eyes: "— —", mouth: "︿", blush: false },
  hungry: { eyes: "◕ ◕", mouth: "○", blush: false },
  energetic: { eyes: "✧ ✧", mouth: "▽", blush: true },
  sleepy: { eyes: "－ －", mouth: "～", blush: false },
  neutral: { eyes: "• •", mouth: "‿", blush: false },
};

const moodColors: Record<PetMood, string> = {
  happy: "from-mood-happy/30 to-primary/30",
  tired: "from-mood-tired/30 to-glow-purple/30",
  hungry: "from-mood-hungry/30 to-secondary/30",
  energetic: "from-mood-energetic/30 to-accent/30",
  sleepy: "from-mood-tired/30 to-muted/30",
  neutral: "from-primary/20 to-glow-teal/20",
};

export const Pet = ({ mood = "neutral", name = "Buddy", onTap }: PetProps) => {
  const [isTapped, setIsTapped] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const expression = moodExpressions[mood];
  const glowColor = moodColors[mood];

  const reactions = [
    "♡", "✦", "★", "♪", "❀", "⋆"
  ];

  const handleTap = () => {
    setIsTapped(true);
    setReaction(reactions[Math.floor(Math.random() * reactions.length)]);
    onTap?.();
    
    setTimeout(() => {
      setIsTapped(false);
      setReaction(null);
    }, 600);
  };

  return (
    <div className="pet-container flex flex-col items-center gap-4">
      <motion.div
        className="relative cursor-pointer select-none"
        onClick={handleTap}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Outer glow */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${glowColor} blur-3xl opacity-60`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "scale(1.5)" }}
        />
        
        {/* Pet body */}
        <motion.div
          className="relative w-48 h-48 md:w-56 md:h-56"
          animate={isTapped ? { rotate: [0, -5, 5, -3, 3, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Main blob body */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="petGradient" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="hsl(174 72% 66%)" />
                <stop offset="50%" stopColor="hsl(174 72% 46%)" />
                <stop offset="100%" stopColor="hsl(180 50% 35%)" />
              </radialGradient>
              <filter id="petGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Body blob */}
            <motion.ellipse
              cx="100"
              cy="110"
              rx="70"
              ry="65"
              fill="url(#petGradient)"
              filter="url(#petGlow)"
              animate={{
                ry: [65, 68, 65],
                rx: [70, 68, 70],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Shine highlight */}
            <ellipse
              cx="75"
              cy="85"
              rx="20"
              ry="15"
              fill="hsl(174 72% 80%)"
              opacity="0.4"
            />
            
            {/* Ears/Antenna */}
            <motion.ellipse
              cx="55"
              cy="55"
              rx="12"
              ry="20"
              fill="url(#petGradient)"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "55px 70px" }}
            />
            <motion.ellipse
              cx="145"
              cy="55"
              rx="12"
              ry="20"
              fill="url(#petGradient)"
              animate={{ rotate: [5, -5, 5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ transformOrigin: "145px 70px" }}
            />
            
            {/* Blush */}
            {expression.blush && (
              <>
                <circle cx="55" cy="115" r="10" fill="hsl(340 65% 70%)" opacity="0.4" />
                <circle cx="145" cy="115" r="10" fill="hsl(340 65% 70%)" opacity="0.4" />
              </>
            )}
          </svg>
          
          {/* Face */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            {/* Eyes */}
            <motion.div
              className="text-3xl md:text-4xl tracking-[0.5em] font-bold text-background/90 mb-2"
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                times: [0, 0.45, 0.5, 0.55, 1],
                ease: "easeInOut" 
              }}
            >
              {expression.eyes}
            </motion.div>
            
            {/* Mouth */}
            <div className="text-2xl md:text-3xl text-background/80">
              {expression.mouth}
            </div>
          </div>
        </motion.div>
        
        {/* Reaction particles */}
        <AnimatePresence>
          {reaction && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ 
                    opacity: 1, 
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{ 
                    opacity: 0, 
                    scale: 1.5,
                    x: (Math.random() - 0.5) * 100,
                    y: -50 - Math.random() * 50,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ 
                    left: "50%", 
                    top: "30%",
                    color: i % 2 === 0 ? "hsl(174 72% 56%)" : "hsl(340 65% 70%)",
                  }}
                >
                  {reaction}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Pet name */}
      <motion.p 
        className="text-lg font-display font-semibold text-foreground/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {name}
      </motion.p>
    </div>
  );
};
