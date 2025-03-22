"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "@/actions/auth/auth";
import OAuthSignupBtn from "./OAuthSignupBtn";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); // Used for async transitions

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    // 1. Basic frontend validation
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await loginWithEmail(email, password);

        // 2. Handle authentication response
        if (!result.success) {
          setErrorMessage(result?.error || "An unknown error occurred. Please try again.");
          return;
        }

        // 3. Redirect to dashboard on success
        router.push("/dashboard");

      } catch (error) {
        console.error("Unexpected login error:", error);
        setErrorMessage("Something went wrong. Please try again later.");
      }
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 lg:w-md" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-blue-500">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to JobPilot Account
                </p>
              </div>

              {/* Display Errors */}
              {errorMessage && (
                <div className="text-red-500 text-sm text-center" aria-live="polite">
                  {errorMessage}
                </div>
              )}

              {/* Email Input */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgetPassword"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isPending}>
                {isPending ? <Loader2 className="animate-spin" size={18} /> : "Login"}
              </Button>

              {/* Divider */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t">
                <span className="bg-background text-foreground px-2 absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                  Or continue with
                </span>
              </div>

              {/* Social Login */}
              <OAuthSignupBtn />

              {/* Sign Up Link */}
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>

          <div className="relative hidden md:block">
            <Image
              src="https://www.postergully.com/cdn/shop/products/ef5ab36a2a816e2828eba31aef97e784.jpg?v=1578651186"
              alt="Login Image"
              className="absolute inset-0 h-full w-full object-cover"
              width={400}
              height={400}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
