"use client"

import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { FaFacebook, FaApple } from "react-icons/fa"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { Separator } from "@workspace/ui/components/separator"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@workspace/ui/components/input-otp"
import { useIsMobile } from "@workspace/ui/hooks/useMobile"
import { FormEvent, ReactNode, useEffect, useState } from "react"
import { toast } from "sonner"

type AuthView = 'login' | 'register' | 'forgot' | 'otp' | 'success';

interface LoginModalProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultView?: 'login' | 'register' | 'forgot';
}

export function LoginModal({ children, open: controlledOpen, onOpenChange, defaultView = 'login' }: LoginModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [view, setView] = useState<AuthView>(defaultView)
  const [registeredEmail, setRegisteredEmail] = useState('')
  const isMobile = useIsMobile()

  // Support both controlled and uncontrolled modes
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (onOpenChange ?? (() => { })) : setInternalOpen;

  // Reset view when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setView(defaultView);
        setRegisteredEmail('');
      }, 300);
    }
  }, [open, defaultView]);

  const getTitle = () => {
    switch (view) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Create Account';
      case 'forgot': return 'Reset Password';
      case 'otp': return 'Verify Your Email';
      case 'success': return 'Welcome to ShopLy!';
    }
  };

  const getDescription = () => {
    switch (view) {
      case 'login': return 'Sign in to your account to continue shopping';
      case 'register': return 'Join ShopLy for exclusive deals and faster checkout';
      case 'forgot': return 'Enter your email and we\'ll send you a reset link';
      case 'otp': return `We've sent a 6-digit code to ${registeredEmail}`;
      case 'success': return 'Your account has been created successfully';
    }
  };

  const handleRegistrationSuccess = (email: string) => {
    setRegisteredEmail(email);
    setView('otp');
  };

  const handleOtpSuccess = () => {
    setView('success');
    // Auto close after showing success
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const content = (
    <AuthContent
      view={view}
      setView={setView}
      onSuccess={() => setOpen(false)}
      onRegistrationSuccess={handleRegistrationSuccess}
      onOtpSuccess={handleOtpSuccess}
    />
  );

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 bg-linear-to-r from-primary/10 to-secondary/10">
            <DialogTitle className="text-2xl">{getTitle()}</DialogTitle>
            <DialogDescription>{getDescription()}</DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left bg-linear-to-r from-primary/10 to-secondary/10">
          <DrawerTitle className="text-2xl">{getTitle()}</DrawerTitle>
          <DrawerDescription>{getDescription()}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6 max-h-[70vh] overflow-y-auto">
          {content}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

interface AuthContentProps {
  view: AuthView;
  setView: (view: AuthView) => void;
  onSuccess: () => void;
  onRegistrationSuccess: (email: string) => void;
  onOtpSuccess: () => void;
}

function AuthContent({ view, setView, onSuccess, onRegistrationSuccess, onOtpSuccess }: AuthContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // OTP states
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Start resend timer when entering OTP view
  useEffect(() => {
    if (view === 'otp') {
      setResendTimer(60);
    }
  }, [view]);

  // Countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (view === 'register') {
      // After registration, go to OTP verification
      setIsLoading(false);
      onRegistrationSuccess(email);
    } else {
      // For login and forgot password
      console.log({ view, email, password, name, rememberMe, agreeTerms });
      setIsLoading(false);
      onSuccess();
    }
  };

  const handleOtpSubmit = async () => {
    if (otpValue.length !== 6) return;

    setIsLoading(true);
    setOtpError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Dummy validation - code is 123456
    if (otpValue === '123456') {
      setIsLoading(false);
      onOtpSuccess();
    } else {
      setIsLoading(false);
      setOtpError('Invalid verification code. Please try again.');
      setOtpValue('');
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setResendTimer(60);
    setOtpError('');
    toast.success('A new verification code has been sent to your email.');
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    // TODO: Implement social login
    console.log('Social login:', provider);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Auto-submit OTP when complete
  const otpLength = otpValue.length;
  useEffect(() => {
    if (otpLength === 6 && view === 'otp' && !isLoading) {
      handleOtpSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpLength]);

  // Success View
  if (view === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <div className="rounded-full bg-green-100 p-4">
          <CheckCircle2 className="size-12 text-green-600" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold">Account Created!</h3>
          <p className="text-sm text-muted-foreground">
            You&apos;re now logged in and ready to shop.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span>Redirecting...</span>
        </div>
      </div>
    );
  }

  // OTP View
  if (view === 'otp') {
    return (
      <div className="space-y-6 pt-4">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => setView('register')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to registration
        </button>

        {/* OTP Input */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(value) => {
                setOtpValue(value);
                setOtpError('');
              }}
              disabled={isLoading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="size-12 text-lg" />
                <InputOTPSlot index={1} className="size-12 text-lg" />
                <InputOTPSlot index={2} className="size-12 text-lg" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} className="size-12 text-lg" />
                <InputOTPSlot index={4} className="size-12 text-lg" />
                <InputOTPSlot index={5} className="size-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Error Message */}
          {otpError && (
            <p className="text-sm text-destructive text-center">{otpError}</p>
          )}

          {/* Demo Hint */}
          <p className="text-xs text-muted-foreground text-center">
            Demo: Use code <span className="font-mono font-bold">123456</span>
          </p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleOtpSubmit}
          className="w-full"
          size="lg"
          disabled={isLoading || otpValue.length !== 6}
        >
          {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
          Verify Email
        </Button>

        {/* Resend Code */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Didn&apos;t receive the code?{' '}
            {resendTimer > 0 ? (
              <span className="text-muted-foreground">
                Resend in <span className="font-medium text-foreground">{resendTimer}s</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-primary font-medium hover:underline disabled:opacity-50"
              >
                Resend Code
              </button>
            )}
          </p>
        </div>

        {/* Change Email */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              setView('register');
              setOtpValue('');
              setOtpError('');
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Wrong email? Change it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4">
      {/* Social Login Buttons */}
      {view !== 'forgot' && (
        <>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
            >
              <FcGoogle className="size-5" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
            >
              <FaFacebook className="size-5 text-blue-600" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('apple')}
              disabled={isLoading}
            >
              <FaApple className="size-5" />
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              or continue with email
            </span>
          </div>
        </>
      )}

      {/* Auth Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field - Register only */}
        {view === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field - Not for forgot password */}
        {view !== 'forgot' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {view === 'login' && (
                <button
                  type="button"
                  onClick={() => setView('forgot')}
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                minLength={8}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {view === 'register' && (
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            )}
          </div>
        )}

        {/* Confirm Password - Register only */}
        {view === 'register' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Remember Me - Login only */}
        {view === 'login' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>
        )}

        {/* Terms Agreement - Register only */}
        {view === 'register' && (
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              disabled={isLoading}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-tight">
              I agree to the{' '}
              <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
            </Label>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading || (view === 'register' && !agreeTerms)}
        >
          {isLoading && <Loader2 className="size-4 mr-2 animate-spin" />}
          {view === 'login' && 'Sign In'}
          {view === 'register' && 'Create Account'}
          {view === 'forgot' && 'Send Reset Link'}
        </Button>
      </form>

      {/* View Switchers */}
      <div className="text-center text-sm">
        {view === 'login' && (
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => setView('register')}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        )}
        {view === 'register' && (
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setView('login')}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        )}
        {view === 'forgot' && (
          <p className="text-muted-foreground">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => setView('login')}
              className="text-primary font-medium hover:underline"
            >
              Back to sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
