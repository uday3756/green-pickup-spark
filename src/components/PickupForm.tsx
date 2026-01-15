import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarIcon, Clock, MapPin, Package, Phone, User, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoadingSpinner } from "./LoadingSpinner";
import { Logo } from "./Logo";

interface FormData {
  name: string;
  phone: string;
  scrap_type: string;
  weight: string;
  pickup_date: string;
  pickup_time: string;
  address: string;
  notes: string;
}

const initialFormData: FormData = {
  name: "",
  phone: "",
  scrap_type: "",
  weight: "",
  pickup_date: "",
  pickup_time: "",
  address: "",
  notes: "",
};

const scrapTypes = [
  { value: "paper", label: "Paper" },
  { value: "plastic", label: "Plastic" },
  { value: "metal", label: "Metal" },
  { value: "mixed", label: "Mixed" },
];

const timeSlots = [
  { value: "morning", label: "Morning (9 AM - 12 PM)" },
  { value: "afternoon", label: "Afternoon (12 PM - 4 PM)" },
  { value: "evening", label: "Evening (4 PM - 7 PM)" },
];

export function PickupForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    if (!formData.scrap_type) newErrors.scrap_type = "Please select a scrap type";
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = "Enter a valid weight";
    }
    if (!formData.pickup_date) newErrors.pickup_date = "Select a pickup date";
    if (!formData.pickup_time) newErrors.pickup_time = "Select a time slot";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitStatus("idle");

    // Simulate API call - Replace with actual Supabase integration
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Here you would insert into Supabase
      // const { error } = await supabase.from('orders').insert({
      //   name: formData.name,
      //   phone: formData.phone,
      //   scrap_type: formData.scrap_type,
      //   weight: parseFloat(formData.weight),
      //   pickup_date: formData.pickup_date,
      //   pickup_time: formData.pickup_time,
      //   address: formData.address,
      //   notes: formData.notes,
      //   status: 'Pending'
      // });

      setSubmitStatus("success");
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const today = new Date().toISOString().split("T")[0];

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

      <main className="container py-6 pb-12">
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-button mb-6"
              >
                <CheckCircle2 size={40} className="text-primary-foreground" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Request Submitted!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-sm">
                Your scrap pickup request has been received. We'll contact you soon to confirm.
              </p>
              <Button onClick={() => setSubmitStatus("idle")} variant="outline">
                Submit Another Request
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Schedule a Pickup
                </h2>
                <p className="text-muted-foreground">
                  Fill in your details and we'll collect your scrap
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
                {/* Full Name */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                    <User size={16} className="text-primary" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </p>
                  )}
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-2"
                >
                  <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                    <Phone size={16} className="text-primary" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.phone}
                    </p>
                  )}
                </motion.div>

                {/* Scrap Type */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-2"
                >
                  <Label className="flex items-center gap-2 text-foreground">
                    <Package size={16} className="text-primary" />
                    Scrap Type
                  </Label>
                  <Select
                    value={formData.scrap_type}
                    onValueChange={(value) => handleInputChange("scrap_type", value)}
                  >
                    <SelectTrigger className={errors.scrap_type ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select scrap type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {scrapTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.scrap_type && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.scrap_type}
                    </p>
                  )}
                </motion.div>

                {/* Weight */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-2"
                >
                  <Label htmlFor="weight" className="flex items-center gap-2 text-foreground">
                    <Package size={16} className="text-primary" />
                    Approximate Weight (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder="Enter weight in kg"
                    value={formData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className={errors.weight ? "border-destructive" : ""}
                  />
                  {errors.weight && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.weight}
                    </p>
                  )}
                </motion.div>

                {/* Pickup Date */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label htmlFor="pickup_date" className="flex items-center gap-2 text-foreground">
                    <CalendarIcon size={16} className="text-primary" />
                    Pickup Date
                  </Label>
                  <Input
                    id="pickup_date"
                    type="date"
                    min={today}
                    value={formData.pickup_date}
                    onChange={(e) => handleInputChange("pickup_date", e.target.value)}
                    className={errors.pickup_date ? "border-destructive" : ""}
                  />
                  {errors.pickup_date && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.pickup_date}
                    </p>
                  )}
                </motion.div>

                {/* Time Slot */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-2"
                >
                  <Label className="flex items-center gap-2 text-foreground">
                    <Clock size={16} className="text-primary" />
                    Pickup Time Slot
                  </Label>
                  <Select
                    value={formData.pickup_time}
                    onValueChange={(value) => handleInputChange("pickup_time", value)}
                  >
                    <SelectTrigger className={errors.pickup_time ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.pickup_time && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.pickup_time}
                    </p>
                  )}
                </motion.div>

                {/* Address */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label htmlFor="address" className="flex items-center gap-2 text-foreground">
                    <MapPin size={16} className="text-primary" />
                    Pickup Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete pickup address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`min-h-[100px] ${errors.address ? "border-destructive" : ""}`}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.address}
                    </p>
                  )}
                </motion.div>

                {/* Notes */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  className="space-y-2"
                >
                  <Label htmlFor="notes" className="flex items-center gap-2 text-foreground">
                    <FileText size={16} className="text-primary" />
                    Additional Notes <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions..."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="min-h-[80px]"
                  />
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
                    >
                      <p className="text-sm text-destructive flex items-center gap-2">
                        <AlertCircle size={16} />
                        Something went wrong. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4"
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      "Submit Pickup Request"
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
