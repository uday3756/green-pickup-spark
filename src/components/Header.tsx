import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";
import kabadiLogo from "@/assets/kabadi-man-logo.png";
import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
    }
  };

  return (
    <>
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
          
          <div className="flex items-center gap-4">
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

            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent-foreground/10 rounded-full">
                  <User size={16} className="text-accent-foreground" />
                  <span className="text-sm font-medium text-accent-foreground truncate max-w-[120px]">
                    {user.email?.split('@')[0] || 'User'}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-white/90 hover:bg-white border-accent-foreground/20 text-accent-foreground"
                >
                  <LogOut size={16} className="mr-1.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white/90 hover:bg-white border-accent-foreground/20 text-accent-foreground"
              >
                <LogIn size={16} className="mr-1.5" />
                Login
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
