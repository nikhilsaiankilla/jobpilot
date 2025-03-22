"use client";

import { createClient } from '@/utils/supabase/client';
import React from 'react'
import { Button } from './ui/button';
import Image from 'next/image';

const OAuthSignupBtn = () => {
    const supabase = createClient();

    const handleSocialLogin = async (provider: "google" | "github") => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: { redirectTo: `${window.location.origin}/auth/callback` },
        });

        if (error) console.error(`Error signing in with ${provider}:`, error.message);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant="outline"
                type="button"
                className="flex items-center justify-center gap-2 w-full bg-gray-200"
                onClick={() => handleSocialLogin("google")}
                aria-label="Sign up with Google"
            >
                <Image src="/googleLogo.png" width={20} height={20} alt="Google logo" />
                Google
            </Button>

            <Button
                variant="outline"
                type="button"
                className="flex items-center justify-center gap-2 w-full bg-gray-200"
                onClick={() => handleSocialLogin("github")}
                aria-label="Sign up with GitHub"
            >
                <Image src="/githubLogo.png" width={25} height={25} alt="GitHub logo" />
                GitHub
            </Button>
        </div>
    )
}

export default OAuthSignupBtn