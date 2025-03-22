"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useActionState, useState } from "react";
import { registerResponse } from "@/types/auth";
import { registerWithEmail } from "@/actions/auth/auth";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import OAuthSignupBtn from "./OAuthSignupBtn";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter();
    const supabase = createClient();
    // STATE MANAGEMENT FOR SHOW AND HIDE PASSWORD 
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [state, formAction, isPending] = useActionState<registerResponse, FormData>(registerWithEmail, {
        status: 0,
        success: false,
        errors: [],
        message: "",
        error: "",
    });

    if (state?.success) {
        return router.push('/auth/login');
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8 lg:w-md" action={formAction}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold text-blue-500">Welcome to Job Pilot</h1>
                                <p className="text-muted-foreground">Sign up to track your job applications efficiently.</p>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" type="text" name="name" placeholder="Your Name" required />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="m@example.com" required />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
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

                            <div className="grid gap-3">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} required />
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

                            <div className="grid gap-3">
                                <Label htmlFor="referralCode">Referral Code (optional)</Label>
                                <Input id="referralCode" name="referralCode" type="text" />
                            </div>

                            {/* Login Button */}
                            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={isPending}>
                                {isPending ? <> <Loader2 className="animate-spin" size={18} /> Signing up.. </> : "Signup"}
                            </Button>

                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">Or continue with</span>
                            </div>

                            {/* Social Login Buttons */}
                            <OAuthSignupBtn />

                            <div className="text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="underline underline-offset-4">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>

                    {/* Right-side Image (SEO-friendly) */}
                    <div className="relative hidden md:block">
                        <Image
                            src="https://www.postergully.com/cdn/shop/products/ef5ab36a2a816e2828eba31aef97e784.jpg?v=1578651186"
                            alt="Job tracking platform preview"
                            className="absolute inset-0 h-full w-full object-cover"
                            width={400}
                            height={400}
                            priority
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
