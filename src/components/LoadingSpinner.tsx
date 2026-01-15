import { motion } from "framer-motion";
import { Recycle } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const sizeMap = {
  sm: 20,
  md: 32,
  lg: 48,
};

export function LoadingSpinner({ size = "md", text }: LoadingSpinnerProps) {
  const iconSize = sizeMap[size];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="text-primary"
      >
        <Recycle size={iconSize} strokeWidth={2} />
      </motion.div>
      {text && (
        <p className="text-sm text-muted-foreground font-medium">{text}</p>
      )}
    </motion.div>
  );
}
