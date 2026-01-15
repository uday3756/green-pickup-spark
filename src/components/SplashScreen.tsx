import { motion } from "framer-motion";
import { useEffect } from "react";
import kabadiLogo from "@/assets/kabadi-logo.png";
import runningMan from "@/assets/running-man.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 gradient-soft opacity-50" />

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
        {/* Logo with glow effect */}
        <motion.div
          className="relative mb-6"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-primary/30 blur-2xl scale-150" />
          <motion.img
            src={kabadiLogo}
            alt="Kabadi Man Logo"
            className="relative w-32 h-32 object-contain"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* App name */}
        <motion.h1
          className="text-4xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Kabadi <span className="text-gradient">Man</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Recycle Smart. Earn Clean.
        </motion.p>

        {/* Running man loader */}
        <motion.div
          className="mt-12 relative overflow-hidden"
          style={{ width: 160, height: 48 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {/* Green trail behind the runner */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 h-3 bg-gradient-to-r from-transparent via-primary to-primary/30 rounded-full"
            initial={{ width: 0, right: "70%" }}
            animate={{ 
              width: [0, 100, 0],
              right: ["70%", "20%", "70%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Running man */}
          <motion.img
            src={runningMan}
            alt="Loading"
            className="absolute top-0 w-12 h-12 object-contain"
            animate={{
              x: [0, 100, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
