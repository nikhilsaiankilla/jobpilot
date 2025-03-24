"use client"
import { resetPassword } from "@/actions/auth/reset-password";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (password === confirmPassword) {
            const response = await resetPassword(password);

            console.log('response', response);

            if (response.success) {
                setMessage(response.message);
                router.push("/auth/login");
            } else {
                setMessage(response.message);
            }
        } else {
            setMessage("Passwords do not match");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Card className="w-full max-w-md p-6 shadow-lg bg-secondary">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold text-blue-500">
                        Reset Password
                    </CardTitle>
                    <CardDescription>
                        Enter your new password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 w-80">
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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

                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
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
                        <Button type="submit" className="bg-blue-500 cursor-pointer">{isLoading ? <><Loader2 className="animate-spin" size={16}/>Reseting Password</> : "Reset Password"}</Button>
                    </form>
                    {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
                </CardContent>
            </Card>
        </div >
    );
};

export default page;