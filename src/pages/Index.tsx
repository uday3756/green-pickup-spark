import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";
import { HomePage } from "@/components/HomePage";
import { AuthForm } from "@/components/AuthForm";
import { PickupForm } from "@/components/PickupForm";
import { OrderTracking } from "@/components/OrderTracking";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner";

type Screen = "splash" | "home" | "form" | "auth" | "tracking";

interface OrderData {
  orderId: string;
  verificationOtp: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    // If user is logged in and on auth screen, go to tracking if we have order data
    if (!loading && user && currentScreen === "auth") {
      if (orderData) {
        setCurrentScreen("tracking");
      }
    }
  }, [user, loading, currentScreen, orderData]);

  const handleSplashComplete = () => {
    setCurrentScreen("home");
  };

  const handleBookPickup = () => {
    setCurrentScreen("form");
  };

  const handleFormSubmit = (orderId: string, otp: string) => {
    setOrderData({ orderId, verificationOtp: otp });
    // Check if user is logged in
    if (user) {
      setCurrentScreen("tracking");
    } else {
      setCurrentScreen("auth");
    }
  };

  const handleAuthSuccess = () => {
    if (orderData) {
      setCurrentScreen("tracking");
    } else {
      setCurrentScreen("home");
    }
  };

  const handleNewPickup = () => {
    setOrderData(null);
    setCurrentScreen("home");
  };

  const handleBackToHome = () => {
    setCurrentScreen("home");
  };

  if (loading && currentScreen !== "splash" && currentScreen !== "home") {
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
      {currentScreen === "home" && (
        <HomePage key="home" onBookPickup={handleBookPickup} />
      )}
      {currentScreen === "form" && (
        <PickupForm key="form" onSubmit={handleFormSubmit} onBack={handleBackToHome} />
      )}
      {currentScreen === "auth" && (
        <AuthForm key="auth" onSuccess={handleAuthSuccess} />
      )}
      {currentScreen === "tracking" && orderData && (
        <OrderTracking 
          key="tracking" 
          orderId={orderData.orderId} 
          verificationOtp={orderData.verificationOtp}
          onNewPickup={handleNewPickup} 
        />
      )}
    </AnimatePresence>
  );
};

export default Index;
