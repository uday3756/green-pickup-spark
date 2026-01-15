import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import kabadiLogo from "@/assets/kabadi-man-logo.png";

interface FooterProps {
  onBookPickup: () => void;
}

export function Footer({ onBookPickup }: FooterProps) {
  return (
    <footer id="contact-section" className="py-16 px-6 bg-accent text-accent-foreground">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3 shadow-soft">
              <img
                src={kabadiLogo}
                alt="Kabadi Man"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">
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
              <MapPin size={20} className="text-primary-foreground" />
              <span className="font-semibold">Address</span>
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed">
              Guru Krupa Building,<br />
              Sangam Galli, Matoshree Colony,<br />
              Shahu Nagar,<br />
              Belagavi – 590010
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <Mail size={20} className="text-primary-foreground" />
              <span className="font-semibold">Email</span>
            </div>
            <a
              href="mailto:contact.kabadiman@gmail.com"
              className="text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
            >
              contact.kabadiman@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-3">
              <Phone size={20} className="text-primary-foreground" />
              <span className="font-semibold">Contact</span>
            </div>
            <div className="space-y-1">
              <a
                href="tel:7975560072"
                className="block text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
              >
                7975560072
              </a>
              <a
                href="tel:8861183111"
                className="block text-accent-foreground/80 hover:text-accent-foreground transition-colors text-sm"
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
            className="bg-white text-accent hover:bg-white/90 shadow-button"
            onClick={onBookPickup}
          >
            Book Scrap Pickup Now
            <ArrowRight className="ml-2" />
          </Button>
        </motion.div>

        {/* Copyright */}
        <motion.p
          className="text-center text-accent-foreground/70 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          © {new Date().getFullYear()} Kabadiman Climate Solutions Pvt Ltd. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
