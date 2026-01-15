import { motion } from "framer-motion";
import { useEffect } from "react";
import { Recycle } from "lucide-react";
import kabadiLogo from "@/assets/kabadi-man-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-soft opacity-50" />

      {/* Animated particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-primary/30"
          initial={{ 
            x: Math.random() * 400 - 200, 
            y: Math.random() * 400 - 200,
            scale: 0 
          }}
          animate={{ 
            x: [null, Math.random() * 300 - 150],
            y: [null, Math.random() * 300 - 150],
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity, 
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated circles in background */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/5"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1.2, 1.8, 1.2], opacity: [0.2, 0.05, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Main logo and text */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo with glow effect and white background for visibility */}
        <motion.div
          className="relative mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Pulsing glow */}
          <motion.div 
            className="absolute inset-0 bg-primary/30 blur-3xl scale-150"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Logo container with bounce */}
          <motion.div 
            className="relative bg-white/95 backdrop-blur-sm rounded-full p-5 shadow-card"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <motion.img
              src={kabadiLogo}
              alt="Kabadi Man Logo"
              className="w-28 h-28 object-contain"
              initial={{ rotate: -10 }}
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>

        {/* App name with staggered animation */}
        <motion.h1
          className="text-4xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            Kabadi{" "}
          </motion.span>
          <motion.span 
            className="text-gradient"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            Man
          </motion.span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-muted-foreground text-lg mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Turning Scrap into Sustainability
        </motion.p>

        {/* Location */}
        <motion.p
          className="text-muted-foreground/70 text-sm flex items-center gap-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          📍 Belagavi, Karnataka
        </motion.p>

        {/* Recycling loop loader */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Rotating recycling icon */}
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <Recycle size={48} className="text-primary" strokeWidth={1.5} />
          </motion.div>
          
          {/* Loading text */}
          <motion.p
            className="mt-4 text-sm text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading...
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-6 w-48 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}