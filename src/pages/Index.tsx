import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { PickupForm } from "@/components/PickupForm";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
      ) : (
        <PickupForm key="form" />
      )}
    </AnimatePresence>
  );
};

export default Index;
