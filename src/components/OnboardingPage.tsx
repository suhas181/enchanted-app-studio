import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  User, 
  Calendar, 
  Briefcase, 
  Heart,
  Sparkles,
  ChevronLeft 
} from "lucide-react";
import { FloatingParticles } from "./FloatingParticles";

interface OnboardingPageProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  name: string;
  nickname: string;
  age: string;
  gender: string;
  athleticism: string;
  work: string;
  petName: string;
}

const steps = [
  { id: 1, title: "What's your name?", field: "name", icon: User, placeholder: "Your full name" },
  { id: 2, title: "What should I call you?", field: "nickname", icon: Heart, placeholder: "Your nickname" },
  { id: 3, title: "How old are you?", field: "age", icon: Calendar, placeholder: "Your age" },
  { id: 4, title: "What's your gender?", field: "gender", icon: User, placeholder: "Your gender", options: ["Male", "Female", "Non-binary", "Prefer not to say"] },
  { id: 5, title: "How active are you?", field: "athleticism", icon: Sparkles, placeholder: "Activity level", options: ["Beginner", "Moderate", "Active", "Athlete"] },
  { id: 6, title: "What do you do?", field: "work", icon: Briefcase, placeholder: "Your occupation" },
  { id: 7, title: "Name your buddy!", field: "petName", icon: Sparkles, placeholder: "Pet's name" },
];

export const OnboardingPage = ({ onComplete }: OnboardingPageProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    nickname: "",
    age: "",
    gender: "",
    athleticism: "",
    work: "",
    petName: "",
  });

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete(data);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (value: string) => {
    setData({ ...data, [step.field]: value });
  };

  const currentValue = data[step.field as keyof OnboardingData];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background bg-mesh flex flex-col relative overflow-hidden">
      <FloatingParticles />

      {/* Header */}
      <motion.div
        className="p-6 flex items-center justify-between relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        ) : (
          <div className="w-10" />
        )}

        {/* Progress */}
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 w-6 rounded-full transition-colors duration-300 ${
                i <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="w-10" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            className="w-full max-w-sm text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {/* Icon */}
            <motion.div
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-primary/20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <Icon className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Title */}
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              {step.title}
            </h2>

            {/* Input or Options */}
            {step.options ? (
              <div className="grid grid-cols-2 gap-3 mb-8">
                {step.options.map((option) => (
                  <motion.button
                    key={option}
                    onClick={() => handleChange(option)}
                    className={`p-4 rounded-xl text-sm font-medium transition-all ${
                      currentValue === option
                        ? "bg-primary/20 border-2 border-primary text-primary"
                        : "glass-card border-2 border-transparent text-foreground hover:border-border"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            ) : (
              <input
                type={step.field === "age" ? "number" : "text"}
                placeholder={step.placeholder}
                value={currentValue}
                onChange={(e) => handleChange(e.target.value)}
                className="input-magical w-full text-center text-lg mb-8"
                autoFocus
              />
            )}

            {/* Next Button */}
            <motion.button
              onClick={handleNext}
              disabled={!currentValue}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {isLastStep ? "Let's Go!" : "Continue"}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Welcome message for last step */}
      {currentStep === 0 && (
        <motion.p
          className="text-center text-muted-foreground pb-8 px-6 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Welcome! Let's get to know you better so your buddy can help you thrive ✨
        </motion.p>
      )}
    </div>
  );
};
