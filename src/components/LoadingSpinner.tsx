import { motion } from "framer-motion";
import runningMan from "@/assets/running-man.png";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 80,
};

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const iconSize = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative overflow-hidden" style={{ width: iconSize * 2, height: iconSize }}>
        {/* Green trail */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-2 bg-gradient-to-r from-transparent via-primary to-primary/50 rounded-full"
          initial={{ width: 0, right: "50%" }}
          animate={{ 
            width: [0, iconSize * 1.5, 0],
            right: ["50%", "10%", "50%"]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Running man animation */}
        <motion.img
          src={runningMan}
          alt="Loading"
          width={iconSize}
          height={iconSize}
          className="absolute top-0 object-contain"
          animate={{
            x: [0, iconSize * 0.8, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      
      {text && (
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
