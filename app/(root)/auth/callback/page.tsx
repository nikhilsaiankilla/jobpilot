"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { checkUserExist, registerWithOAuth } from "@/actions/auth/auth";

const OAuthCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [user, setUser] = useState<any | null>(null);  // Store user in state
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            setLoading(true);
            const queryReferralCode = searchParams.get("referral") || null;

            // Fetch OAuth session
            const { data, error } = await supabase.auth.getSession();

            if (error || !data.session) {
                console.error("OAuth session error:", error?.message);
                setError("Authentication failed. Please try again.");
                await supabase.auth.signOut();
                router.replace("/login");
                return;
            }

            const authUser = data.session.user;
            if (!authUser || !authUser.email) {
                setError("User session or email not found.");
                return;
            }

            // Store user globally in state
            setUser(authUser);

            // Check if user exists in DB
            const response = await checkUserExist(authUser?.email);
            if (response.success) {
                router.replace("/dashboard");
                return;
            }

            // If user is new, ask for referral code
            setReferralCode(queryReferralCode);
            if (queryReferralCode) {
                finalizeSignup(authUser, queryReferralCode);
            } else {
                setShowDialog(true);
            }
        };

        handleOAuthCallback();
    }, [searchParams, router]);

    const finalizeSignup = async (userData: any, code: string | null) => {
        setShowDialog(false);
        setLoading(true);

        if (!userData) {
            setError("User data not found.");
            return;
        }

        // Extract only required fields
        const formattedUser = {
            id: userData.id,
            email: userData.email,
            name: userData.user_metadata?.full_name || user.email.split("@")[0],
            image: userData.user_metadata?.avatar_url || null,
            provider: user?.app_metadata?.provider,
        };

        const { success, error } = await registerWithOAuth(formattedUser, code);
        if (!success) {
            setError(error || "Failed to register user.");
            return;
        }

        router.push("/dashboard");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {loading && !error && (
                <span className="flex items-center gap-3">
                    <Loader2 className="animate-spin" size={22} />
                    <p>Processing authentication...</p>
                </span>
            )}
            {error && <p className="text-red-500">{error}</p>}

            {/* Referral Code Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
                    <DialogHeader>
                        <DialogTitle>Enter Referral Code (Optional)</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="text"
                        placeholder="Enter referral code"
                        value={referralCode || ""}
                        onChange={(e) => setReferralCode(e.target.value)}
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => finalizeSignup(user, null)}>
                            Skip
                        </Button>
                        <Button onClick={() => finalizeSignup(user, referralCode)}>Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OAuthCallback;
