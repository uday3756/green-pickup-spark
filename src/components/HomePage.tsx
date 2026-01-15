import { motion } from "framer-motion";
import { Recycle, MapPin, Lock, Users, Phone, Mail, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import kabadiLogo from "@/assets/kabadi-man-logo.png";

interface HomePageProps {
  onBookPickup: () => void;
}

const highlights = [
  {
    icon: Recycle,
    title: "Eco-friendly",
    description: "Sustainable waste management for a greener planet",
  },
  {
    icon: MapPin,
    title: "Real-time Tracking",
    description: "Track your pickup in real-time like a ride-sharing app",
  },
  {
    icon: Lock,
    title: "OTP Verified",
    description: "Secure handover with OTP-based verification",
  },
  {
    icon: Users,
    title: "Verified Partners",
    description: "All our scrap dealers are verified and trained",
  },
];

export function HomePage({ onBookPickup }: HomePageProps) {
  const scrollToAbout = () => {
    document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Background gradient circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-primary/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent/10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        {/* Logo */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl scale-150 rounded-full" />
          <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-card">
            <img
              src={kabadiLogo}
              alt="Kabadi Man Logo"
              className="w-28 h-28 md:w-36 md:h-36 object-contain"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-foreground mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Sell Your Scrap.{" "}
          <span className="text-gradient">Save the Climate.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Doorstep scrap pickup with real-time tracking, verified scrap dealers,
          and transparent pricing.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="gradient-primary shadow-button text-lg px-8 py-6 group"
            onClick={onBookPickup}
          >
            Book Scrap Pickup
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6"
            onClick={scrollToAbout}
          >
            How It Works
            <ChevronDown className="ml-2" />
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ 
            opacity: { delay: 1 },
            y: { delay: 1, duration: 1.5, repeat: Infinity }
          }}
        >
          <ChevronDown size={32} className="text-muted-foreground" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about-section" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What is <span className="text-gradient">Kabadi Man</span>?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kabadi Man is a technology-driven scrap collection platform that
              connects households, businesses, and institutions with verified scrap
              dealers. We simplify scrap pickup by enabling customers to schedule
              doorstep collection, track the scrap dealer in real time, and ensure
              transparent verification through OTP-based confirmation—just like
              ride-sharing apps.
            </p>
          </motion.div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Details Footer */}
      <footer className="py-16 px-6 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-white/90 rounded-full p-3 shadow-soft">
                <img
                  src={kabadiLogo}
                  alt="Kabadi Man"
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              KABADIMAN CLIMATE SOLUTIONS PVT LTD
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Address */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={20} className="text-primary" />
                <span className="font-semibold text-foreground">Address</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Guru Krupa Building,<br />
                Sangam Galli, Matoshree Colony,<br />
                Shahu Nagar,<br />
                Belagavi – 590010
              </p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                <Mail size={20} className="text-primary" />
                <span className="font-semibold text-foreground">Email</span>
              </div>
              <a
                href="mailto:contact.kabadiman@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                contact.kabadiman@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-3">
                <Phone size={20} className="text-primary" />
                <span className="font-semibold text-foreground">Contact</span>
              </div>
              <div className="space-y-1">
                <a
                  href="tel:7975560072"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  7975560072
                </a>
                <a
                  href="tel:8861183111"
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  8861183111
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA at bottom */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              className="gradient-primary shadow-button"
              onClick={onBookPickup}
            >
              Book Scrap Pickup Now
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-center text-muted-foreground text-sm mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            © {new Date().getFullYear()} Kabadiman Climate Solutions Pvt Ltd. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
