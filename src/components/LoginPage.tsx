import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ArrowRight, Sparkles } from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";

interface LoginPageProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export const LoginPage = ({ onLogin, onSignUp }: LoginPageProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      onSignUp();
    } else {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Logo/Title */}
      <motion.div
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
          animate={{ 
            boxShadow: [
              "0 0 20px hsl(174 72% 56% / 0.3)",
              "0 0 40px hsl(174 72% 56% / 0.5)",
              "0 0 20px hsl(174 72% 56% / 0.3)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        
        <h1 className="text-4xl font-display font-bold text-gradient mb-2">
          Buddy
        </h1>
        <p className="text-muted-foreground">Your magical wellness companion</p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        className="w-full max-w-sm glass-card p-8 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.form
            key={isSignUp ? "signup" : "login"}
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-display font-bold text-foreground text-center mb-6">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-magical w-full pl-12"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-magical w-full pl-12"
                  required
                />
              </div>

              {isSignUp && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-magical w-full pl-12"
                    required
                  />
                </motion.div>
              )}
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.form>
        </AnimatePresence>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {isSignUp 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
