"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";
import { checkUserExist, registerWithOAuth } from "@/actions/auth/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/slicer/authSlicer";

const OAuthCallback = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const supabase = createClient();

    const [userGlobally, setUserGlobally] = useState<any | null>(null);
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const queryReferralCode = searchParams.get("referral") || null;

        const handleOAuthCallback = async () => {
            setLoading(true);

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

            // Store user in state
            setUserGlobally(authUser);

            // Check if user exists in DB
            const response = await checkUserExist(authUser.email);
            if (response.success) {
                const userId = response?.user?.id;
                const userName = response?.user?.name;
                const userEmail = response?.user?.email;

                // Ensure all required fields are present before logging in
                if (!userId || !userName || !userEmail) {
                    setError("User data is incomplete. Please contact support.");
                    return;
                }

                const user = {
                    id: userId,
                    name: userName,
                    email: userEmail,
                    image: response?.user?.image || "",
                };

                dispatch(setUser(user));
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
    }, [router, supabase, searchParams]);

    const finalizeSignup = async (userData: any, code: string | null) => {
        setShowDialog(false);
        setLoading(true);

        if (!userData) {
            setError("User data not found.");
            return;
        }

        const formattedUser = {
            id: userData.id,
            email: userData.email,
            name: userData.user_metadata?.full_name || userGlobally?.email?.split("@")[0],
            image: userData.user_metadata?.avatar_url || null,
            provider: userGlobally?.app_metadata?.provider,
        };

        const response = await registerWithOAuth(formattedUser, code);
        if (!response?.success) {
            setError(response?.error || "Failed to register user.");
            return;
        }

        const userId = response?.user?.id;
        const userName = response?.user?.name;
        const userEmail = response?.user?.email;

        // Ensure all required fields are present before logging in
        if (!userId || !userName || !userEmail) {
            setError("User data is incomplete. Please contact support.");
            return;
        }

        const user = {
            id: userId,
            name: userName,
            email: userEmail,
            image: response?.user?.image || "",
        };

        dispatch(setUser(user));
        router.replace("/dashboard");
        return;
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
                        <Button variant="outline" onClick={() => finalizeSignup(userGlobally, null)}>
                            Skip
                        </Button>
                        <Button onClick={() => finalizeSignup(userGlobally, referralCode)}>Continue</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default OAuthCallback;
