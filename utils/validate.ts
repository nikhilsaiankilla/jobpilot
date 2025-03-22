import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
});