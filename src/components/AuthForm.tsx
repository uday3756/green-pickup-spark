import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, AlertCircle, Eye, EyeOff, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LoadingSpinner } from "./LoadingSpinner";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface AuthFormProps {
  onSuccess: () => void;
}

type AuthMode = "email" | "phone" | "otp-verify";

export function AuthForm({ onSuccess }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("email");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithPhone, verifyOtp } = useAuth();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setError(error.message);
        } else {
          toast.success("Welcome back!");
          onSuccess();
        }
      } else {
        const { error, data } = await signUpWithEmail(email, password, name);
        if (error) {
          setError(error.message);
        } else if (data.user && !data.session) {
          toast.success("Check your email to confirm your account!");
        } else {
          toast.success("Account created successfully!");
          onSuccess();
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Format phone number (add +91 for India if not present)
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "")}`;
      
      const { error } = await signInWithPhone(formattedPhone);
      if (error) {
        setError(error.message);
      } else {
        toast.success("OTP sent to your phone!");
        setAuthMode("otp-verify");
      }
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) return;
    
    setError("");
    setIsLoading(true);

    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone.replace(/\D/g, "")}`;
      const { error } = await verifyOtp(formattedPhone, otp);
      
      if (error) {
        setError(error.message);
      } else {
        toast.success("Phone verified successfully!");
        onSuccess();
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
        setIsLoading(false);
      }
      // Note: Google OAuth redirects, so we don't need to handle success here
    } catch (err) {
      setError("Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-soft flex flex-col">
      {/* Header */}
      <motion.header
        className="py-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container flex justify-center">
          <Logo size="md" showText />
        </div>
      </motion.header>

      <main className="flex-1 container flex items-center justify-center pb-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl shadow-card p-8 border border-border">
            <AnimatePresence mode="wait">
              {/* OTP Verification Screen */}
              {authMode === "otp-verify" ? (
                <motion.div
                  key="otp-verify"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button
                    onClick={() => setAuthMode("phone")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>

                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-foreground">
                      Verify OTP
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Enter the 6-digit code sent to {phone}
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4"
                      >
                        <p className="text-sm text-destructive flex items-center gap-2">
                          <AlertCircle size={16} />
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleOtpVerify}
                    size="lg"
                    className="w-full"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? <LoadingSpinner size="sm" /> : "Verify OTP"}
                  </Button>

                  <button
                    onClick={handlePhoneSubmit}
                    className="w-full mt-4 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Didn't receive code? Resend
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="auth-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      {isLogin
                        ? "Sign in to schedule pickups"
                        : "Join us and start recycling"}
                    </p>
                  </div>

                  {/* Auth Method Tabs */}
                  <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
                    <button
                      onClick={() => setAuthMode("email")}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        authMode === "email"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Mail size={16} className="inline mr-2" />
                      Email
                    </button>
                    <button
                      onClick={() => setAuthMode("phone")}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        authMode === "phone"
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Phone size={16} className="inline mr-2" />
                      Phone
                    </button>
                  </div>

                  {/* Email Form */}
                  {authMode === "email" && (
                    <form onSubmit={handleEmailSubmit} className="space-y-5">
                      <AnimatePresence mode="wait">
                        {!isLogin && (
                          <motion.div
                            key="name-field"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="name" className="flex items-center gap-2">
                              <User size={16} className="text-primary" />
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              type="text"
                              placeholder="Enter your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required={!isLogin}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail size={16} className="text-primary" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="flex items-center gap-2">
                          <Lock size={16} className="text-primary" />
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                          >
                            <p className="text-sm text-destructive flex items-center gap-2">
                              <AlertCircle size={16} />
                              {error}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <LoadingSpinner size="sm" />
                        ) : isLogin ? (
                          "Sign In"
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  )}

                  {/* Phone Form */}
                  {authMode === "phone" && (
                    <form onSubmit={handlePhoneSubmit} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone size={16} className="text-primary" />
                          Phone Number
                        </Label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 bg-muted border border-input rounded-md text-sm text-muted-foreground">
                            +91
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter 10-digit number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            required
                            maxLength={10}
                            className="flex-1"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We'll send you a 6-digit OTP to verify
                        </p>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                          >
                            <p className="text-sm text-destructive flex items-center gap-2">
                              <AlertCircle size={16} />
                              {error}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isLoading || phone.length !== 10}
                      >
                        {isLoading ? <LoadingSpinner size="sm" /> : "Send OTP"}
                      </Button>
                    </form>
                  )}

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  {/* Google Login Button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>

                  {authMode === "email" && (
                    <div className="mt-6 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setError("");
                        }}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {isLogin
                          ? "Don't have an account? Sign up"
                          : "Already have an account? Sign in"}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skip login option */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="button"
              onClick={onSuccess}
              className="text-sm text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Continue without signing in
            </button>
          </motion.div>

          {/* Provider setup note */}
          <motion.div
            className="mt-6 p-4 bg-muted/50 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-muted-foreground text-center">
              <strong>Note:</strong> Phone OTP requires SMS provider (Twilio) setup. 
              Google login requires OAuth configuration in Supabase dashboard.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}