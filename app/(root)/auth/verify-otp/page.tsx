"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const Page = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) { // Only allow a single digit
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input field if a digit is entered
            if (value && index < otp.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/auth/reset-password");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <Card className="w-full max-w-md p-6 shadow-lg bg-secondary">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold text-blue-500">
                        Verify OTP
                    </CardTitle>
                    <CardDescription>
                        Enter the OTP sent to your email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                        <div className="flex gap-2">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    ref={(el) => {
                                        inputRefs.current[index] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-12 text-center text-xl"
                                />
                            ))}
                        </div>
                        <Button type="submit">Verify OTP</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
