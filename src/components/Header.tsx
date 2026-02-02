import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";
import kabadiLogo from "@/assets/kabadi-man-logo.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

interface HeaderProps {
  onOpenProfile?: () => void;
}

export function Header({ onOpenProfile }: HeaderProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const getInitials = () => {
    if (profile?.name) {
      return profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-accent-foreground/10 transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.name || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline text-sm font-medium text-accent-foreground truncate max-w-[100px]">
                      {profile?.name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={onOpenProfile} className="cursor-pointer">
                    <User size={16} className="mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
