import { motion } from "framer-motion";
import kabadiLogo from "@/assets/kabadi-man-logo.png";

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-accent/95 backdrop-blur-sm border-b border-accent/20 shadow-soft"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-1.5 shadow-soft">
            <img
              src={kabadiLogo}
              alt="Kabadi Man"
              className="w-10 h-10 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-accent-foreground">Kabadi Man</h1>
            <p className="text-xs text-accent-foreground/80">Scrap Made Simple</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          <a href="#pricing-section" className="text-sm font-medium text-accent-foreground/90 hover:text-accent-foreground transition-colors">
            Pricing
          </a>
          <a href="#about-section" className="text-sm font-medium text-accent-foreground/90 hover:text-accent-foreground transition-colors">
            About
          </a>
          <a href="#contact-section" className="text-sm font-medium text-accent-foreground/90 hover:text-accent-foreground transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
