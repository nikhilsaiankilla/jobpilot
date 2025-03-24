"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { sendOTP } from "@/actions/auth/reset-password";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await sendOTP(email);

      if(response?.success){
        setMessage("OTP Sent to your mail id");
        setEmail("");

        // redirecting to the verify otp page
        router.push("/auth/verify-otp?email=" + email);
      }else{
        setMessage(response?.message);
      }
    } catch (error:unknown) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 shadow-lg bg-secondary">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-blue-500">
            Forgot Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-blue-500 cursor-pointer" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-foreground">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
