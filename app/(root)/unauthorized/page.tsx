"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function UnauthorizedPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
            <div className="bg-secondary shadow-lg rounded-2xl p-8 max-w-md text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
                <p className="text-gray-600 mt-2">
                    You are not authorized to view this page. Please log in with valid credentials.
                </p>
                <Button 
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 cursor-pointer" 
                    onClick={() => router.push("/auth/login")}
                >
                    Go to Login
                </Button>
            </div>
        </div>
    );
}
