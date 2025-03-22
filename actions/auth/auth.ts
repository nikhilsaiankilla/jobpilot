"use server"

import { loginWithEmailResponse, registerResponse } from "@/types/auth";
import { generateUniqueReferralCode } from "@/utils/helpers";
import { prisma } from "@/utils/prisma/prismaClient";
import { createClient } from "@/utils/supabase/server";
import { registerSchema } from "@/utils/validate";
import { cookies } from "next/headers";

//register
export const registerWithEmail = async (_prevState: registerResponse, formData: FormData): Promise<registerResponse> => {
    const supabase = createClient();

    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const name = formData.get("name") as string;
        const referralCode = formData.get("referralCode") as string | null;

        // Validate input
        const parsedData = registerSchema.safeParse({ email, password, confirmPassword, name });
        if (!parsedData.success) {
            return {
                errors: parsedData.error.errors.map(err => ({ error: err.message })) || [{ error: "Validation failed" }],
                status: 400,
                success: false,
            };
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            return { errors: [{ error: "Passwords do not match" }], status: 400, success: false };
        }

        // Step 1: Generate Auth ID using Supabase
        const { data, error } = await (await supabase).auth.signUp({ email, password });

        if (error || !data?.user?.id) {
            return { error: error?.message || "Failed to create authentication", status: 500, success: false };
        }

        const authId = data.user.id;

        // Step 2: Handle Referral (if applicable)
        let referrer = null;
        if (referralCode) {
            referrer = await prisma.user.findUnique({
                where: { referralCode },
                select: { id: true },
            });

            if (!referrer) {
                return { error: "Invalid referral code", status: 400, success: false };
            }
        }

        // Step 3: Generate Referral Code for New User
        const uniqueReferralCode = await generateUniqueReferralCode(name);

        // Step 4: Store User in Database
        const newUser = await prisma.user.create({
            data: {
                authId,
                email,
                name,
                role: "REGULAR",
                image: null,
                provider: "email",
                referralCode: uniqueReferralCode,
                preferences: {},
            },
        });

        // Step 5: Store Referral Information if referralCode was valid
        if (referrer) {
            await prisma.referral.create({
                data: {
                    referredBy: referrer.id,
                    referredWhom: newUser.id,
                },
            });
        }

        return { status: 200, success: true, message: "User registered successfully" };
    } catch (error) {
        console.error(error);
        return { error: "Internal server error", status: 500, success: false };
    }
};

export const registerWithOAuth = async (user: any, referralCode: string | null) => {
    try {
        if (!user || !user.email) {
            return { error: "Invalid user data", status: 400, success: false };
        }

        //Step 1: Ensure the user does not already exist
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (existingUser) {
            return { error: "User already exists", status: 409, success: false };
        }

        // Step 2: Handle Referral (if applicable)
        let referrer = null;
        if (referralCode) {
            referrer = await prisma.user.findUnique({
                where: { referralCode },
                select: { id: true },
            });

            if (!referrer) {
                return { error: "Invalid referral code", status: 400, success: false };
            }
        }

        // Step 3: Generate Referral Code for New User
        const uniqueReferralCode = await generateUniqueReferralCode(user?.user_metadata?.full_name || user?.email.split('@')[0]);

        // Step 4: Store User in Database
        const newUser = await prisma.user.create({
            data: {
                authId: user?.id,
                email: user?.email,
                name: user?.name,
                role: "REGULAR",
                image: user?.image,
                provider: user?.provider,
                referralCode: uniqueReferralCode,
                preferences: {},
            },
        });


        // Step 5: Store Referral Information if referralCode was valid
        if (referrer) {
            await prisma.referral.create({
                data: {
                    referredBy: referrer.id,
                    referredWhom: newUser.id,
                },
            });
        }

        return { message: "User registered successfully", success: true, user: newUser };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { error: error?.message || "Internal Server Wrong", status: 500, success: false }
        } else {
            console.log(error);
            return { error: "Internal Server Wrong", status: 500, success: false }
        }
    }
};

// //login
export const loginWithEmail = async (email: string, password: string): Promise<loginWithEmailResponse> => {
    const cookieStore = await cookies();
    const supabase = createClient();

    try {
        if (!email || !password) {
            return { error: "Email and password are required", status: 400, success: false };
        }

        // 1. Check if the user exists in Prisma
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, authId: true }
        });

        if (!user) {
            return { error: "User not found", status: 404, success: false };
        }

        // 2. Validate password using Supabase Auth
        const { data: session, error: authError } = await (await supabase).auth.signInWithPassword({ email, password });

        if (authError || !session?.session) {
            return { error: "Invalid credentials", status: 401, success: false };
        }

        const { access_token } = session.session;

        // 3. Set HTTP-only cookies using Next.js cookies()
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        };

        cookieStore.set("accessToken", access_token, cookieOptions);
        cookieStore.set("authId", user?.authId, cookieOptions);
        cookieStore.set("userId", user?.id, cookieOptions);

        return {
            success: true,
            status: 200,
            message: "Login successful",
        };

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            return { error: error.message || "Internal Server Error", status: 500, success: false };
        } else {
            console.error(error);
            return { error: "Internal Server Error", status: 500, success: false };
        }
    }
};


//logout
export const logout = async () => {
    const cookieStore = await cookies();
    const supabase = createClient();
    try {
        const { error } = await (await supabase).auth.signOut();

        if (error) {
            console.error("Logout Error:", error.message);
            return { error: error.message, status: 500, success: false };
        }

        cookieStore.delete('accessToken');
        cookieStore.delete('userId');
        cookieStore.delete('authId');

        return { message: "logout successfull", status: 200, success: true };

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { error: error?.message || "Internal Server Wrong", status: 500, success: false }
        } else {
            console.log(error);
            return { error: "Internal Server Wrong", status: 500, success: false }
        }
    }
}

// //forget password 
// export const forgetPassword = () => {
//     try {

//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.log(error);
//             return { error: error?.message || "Internal Server Wrong", status: 500, success: false }
//         } else {
//             console.log(error);
//             return { error: "Internal Server Wrong", status: 500, success: false }
//         }
//     }
// }

// // reset password 
// export const resetPassword = () => {
//     try {

//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.log(error);
//             return { error: error?.message || "Internal Server Wrong", status: 500, success: false }
//         } else {
//             console.log(error);
//             return { error: "Internal Server Wrong", status: 500, success: false }
//         }
//     }
// }

// //verify otp
// export const verifyOtp = async (otp: string) => {
//     try {
//         // Your logic here
//     } catch (error: unknown) {
//         if (error instanceof Error) {
//             console.log(error);
//             return { error: error.message || "Internal Server Error", status: 500, success: false };
//         } else {
//             console.log(error);
//             return { error: "Internal Server Error", status: 500, success: false };
//         }
//     }
// };


//fetching user

export const checkUserExist = async (email: string) => {
    const cookieStore = await cookies();
    const supabase = createClient();

    try {
        if (!email) {
            return { error: "Email is required to check the user", status: 400, success: false };
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }, select: {
                authId: true,
                id: true
            }
        });

        if (!existingUser) {
            return { message: "User not found in DB", success: false, status: 404 };
        }

        const { data, error } = await (await supabase).auth.getSession();

        if (error || !data?.session) {
            return { message: "something went wrong in supabase auth", success: false, status: 404 }
        }

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict" as "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        };

        const access_token = data?.session?.access_token || "";

        cookieStore.set("accessToken", access_token, cookieOptions);
        cookieStore.set("authId", existingUser?.authId, cookieOptions);
        cookieStore.set("userId", existingUser?.id, cookieOptions);


        return { message: "User found in DB", success: true, status: 200, user: existingUser };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error);
            return { error: error?.message || "Internal Server Wrong", status: 500, success: false }
        } else {
            console.log(error);
            return { error: "Internal Server Wrong", status: 500, success: false }
        }
    }
};
