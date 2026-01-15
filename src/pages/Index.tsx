import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthForm } from "@/components/AuthForm";
import { PickupForm } from "@/components/PickupForm";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type Screen = "splash" | "auth" | "form";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const { user, loading } = useAuth();

  useEffect(() => {
    // If user is logged in and past splash, go directly to form
    if (!loading && user && currentScreen === "auth") {
      setCurrentScreen("form");
    }
  }, [user, loading, currentScreen]);

  const handleSplashComplete = () => {
    setCurrentScreen("auth");
  };

  const handleAuthSuccess = () => {
    setCurrentScreen("form");
  };

  const handleLogout = () => {
    setCurrentScreen("auth");
  };

  if (loading && currentScreen !== "splash") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {currentScreen === "splash" && (
        <SplashScreen key="splash" onComplete={handleSplashComplete} />
      )}
      {currentScreen === "auth" && (
        <AuthForm key="auth" onSuccess={handleAuthSuccess} />
      )}
      {currentScreen === "form" && (
        <PickupForm key="form" onLogout={handleLogout} />
      )}
    </AnimatePresence>
  );
};

export default Index;
