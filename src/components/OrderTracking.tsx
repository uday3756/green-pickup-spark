import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  Phone, 
  Shield, 
  PartyPopper,
  ArrowRight,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { supabase } from "@/integrations/supabase/client";

interface OrderTrackingProps {
  orderId: string;
  verificationOtp: string;
  onNewPickup: () => void;
}

type OrderStatus = "pending" | "assigned" | "on_the_way" | "arrived" | "verifying" | "completed";

interface PartnerInfo {
  name: string;
  phone: string;
}

const trackingSteps = [
  {
    status: "pending" as OrderStatus,
    icon: Clock,
    title: "Order Submitted",
    description: "Your scrap pickup request has been submitted to Kabadi Man",
  },
  {
    status: "assigned" as OrderStatus,
    icon: User,
    title: "Assigned to Dealer",
    description: "Your order is assigned to a verified scrap dealer",
  },
  {
    status: "on_the_way" as OrderStatus,
    icon: Truck,
    title: "On the Way",
    description: "Kabadi Man is on the way! Please wait until the scrapper comes to your doorstep.",
  },
  {
    status: "arrived" as OrderStatus,
    icon: MapPin,
    title: "Arrived",
    description: "Scrapper has reached your location",
  },
  {
    status: "verifying" as OrderStatus,
    icon: Shield,
    title: "OTP Verification",
    description: "Share this OTP with the scrapper to verify pickup",
  },
  {
    status: "completed" as OrderStatus,
    icon: PartyPopper,
    title: "Completed",
    description: "Pickup completed! Thank you for recycling with Kabadi Man",
  },
];

const statusOrder: OrderStatus[] = ["pending", "assigned", "on_the_way", "arrived", "verifying", "completed"];

export function OrderTracking({ orderId, verificationOtp, onNewPickup }: OrderTrackingProps) {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>("pending");
  const [partner, setPartner] = useState<PartnerInfo | null>(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    // Fetch initial order status
    const fetchOrderStatus = async () => {
      const { data: order } = await supabase
        .from("orders")
        .select("status, partner_id, otp_verified")
        .eq("id", orderId)
        .single();

      if (order) {
        setCurrentStatus(order.status as OrderStatus);
        setIsOtpVerified(order.otp_verified || false);
        
        if (order.partner_id) {
          const { data: partnerData } = await supabase
            .from("partners")
            .select("name, phone")
            .eq("id", order.partner_id)
            .single();
          
          if (partnerData) {
            setPartner(partnerData);
          }
        }
      }
    };

    fetchOrderStatus();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as OrderStatus;
          setCurrentStatus(newStatus);
          setIsOtpVerified(payload.new.otp_verified || false);
          
          // Fetch partner info if assigned
          if (payload.new.partner_id && !partner) {
            supabase
              .from("partners")
              .select("name, phone")
              .eq("id", payload.new.partner_id)
              .single()
              .then(({ data }) => {
                if (data) setPartner(data);
              });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, partner]);

  const currentStepIndex = statusOrder.indexOf(currentStatus);

  const getStepState = (stepStatus: OrderStatus): "completed" | "current" | "upcoming" => {
    const stepIndex = statusOrder.indexOf(stepStatus);
    if (stepIndex < currentStepIndex) return "completed";
    if (stepIndex === currentStepIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="min-h-screen gradient-soft">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="container flex items-center justify-center py-4">
          <Logo size="sm" showText />
        </div>
      </motion.header>

      <main className="container py-8 px-4 max-w-lg mx-auto">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Order Tracking
          </h1>
          <p className="text-muted-foreground">
            Track your scrap pickup in real-time
          </p>
        </motion.div>

        {/* Tracking Steps */}
        <motion.div
          className="bg-card rounded-2xl shadow-card border border-border p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-0">
            {trackingSteps.map((step, index) => {
              const state = getStepState(step.status);
              const Icon = step.icon;
              const isLast = index === trackingSteps.length - 1;

              return (
                <div key={step.status} className="relative">
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      className={`absolute left-5 top-10 w-0.5 h-16 transition-colors duration-500 ${
                        state === "completed" ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}

                  <motion.div
                    className={`flex gap-4 py-4 ${
                      state === "current" ? "opacity-100" : state === "completed" ? "opacity-70" : "opacity-40"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: state === "upcoming" ? 0.4 : state === "completed" ? 0.7 : 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        state === "completed"
                          ? "bg-primary text-primary-foreground"
                          : state === "current"
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {state === "completed" ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        <Icon size={20} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold mb-1 ${
                          state === "current" ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                        {step.status === "assigned" && partner && (
                          <span className="text-primary ml-2">({partner.name})</span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>

                      {/* Show partner phone when arrived */}
                      {step.status === "arrived" && state === "current" && partner && (
                        <motion.a
                          href={`tel:${partner.phone}`}
                          className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <Phone size={16} />
                          Call {partner.name}: {partner.phone}
                        </motion.a>
                      )}

                      {/* Show OTP */}
                      {step.status === "verifying" && state === "current" && !isOtpVerified && (
                        <motion.div
                          className="mt-4 p-4 bg-primary/10 rounded-xl border border-primary/20"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <p className="text-sm text-muted-foreground mb-2">
                            Share this OTP with the scrapper:
                          </p>
                          <div className="flex gap-2 justify-center">
                            {verificationOtp.split("").map((digit, i) => (
                              <motion.div
                                key={i}
                                className="w-12 h-14 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-2xl font-bold"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.1 }}
                              >
                                {digit}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Completed state */}
        <AnimatePresence>
          {currentStatus === "completed" && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center shadow-button"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <PartyPopper size={40} className="text-primary-foreground" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Thank You!
              </h2>
              <p className="text-muted-foreground mb-8">
                You've helped make the planet a little greener today.
              </p>
              <Button
                size="lg"
                className="gradient-primary shadow-button"
                onClick={onNewPickup}
              >
                Book Another Pickup
                <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Waiting message */}
        {currentStatus !== "completed" && (
          <motion.p
            className="text-center text-muted-foreground text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            This page updates automatically. Please stay on this screen.
          </motion.p>
        )}
      </main>
    </div>
  );
}
