"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMessage("If your email is registered, you will receive an OTP.");
    }, 2000);
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </Button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
