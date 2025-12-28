import { motion } from "framer-motion";
import { BookOpen, Send, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export const DiaryTab = () => {
  const [entry, setEntry] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hey there! ✨ How was your day? Tell me about your highs and lows, and let's reflect together."
    }
  ]);

  const handleSend = () => {
    if (!entry.trim()) return;
    
    setMessages(prev => [...prev, { role: "user" as const, content: entry }]);
    setEntry("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant" as const,
        content: "That's really thoughtful of you to share! It sounds like you're making progress. What do you think helped you get through that moment?"
      }]);
    }, 1000);
  };

  return (
    <motion.div
      className="tab-content p-4 flex flex-col h-[calc(100vh-180px)]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-glow-purple/20 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-glow-purple" />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Daily Reflection
          </h2>
          <p className="text-sm text-muted-foreground">Let's talk about your day</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, i) => (
          <motion.div
            key={i}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.role === "user"
                  ? "bg-primary/20 text-foreground rounded-br-sm"
                  : "glass-card rounded-bl-sm"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">Your Buddy</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.content}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Prompts */}
      <motion.div
        className="flex gap-2 overflow-x-auto pb-3 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {["Today I felt...", "I'm grateful for...", "I struggled with..."].map((prompt, i) => (
          <motion.button
            key={prompt}
            className="flex-shrink-0 px-4 py-2 rounded-full bg-muted/50 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={() => setEntry(prompt)}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            {prompt}
          </motion.button>
        ))}
      </motion.div>

      {/* Input */}
      <motion.div
        className="glass-card p-3 flex items-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Share your thoughts..."
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <motion.button
          onClick={handleSend}
          className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
          whileTap={{ scale: 0.9 }}
        >
          <Send className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
