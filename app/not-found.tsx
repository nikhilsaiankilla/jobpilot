"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
            <div className="bg-secondary shadow-lg rounded-2xl p-8 max-w-md text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
                <p className="text-gray-600 mt-2">
                    The page you are looking for doesn’t exist or has been moved.
                </p>
                <Button 
                    className="mt-6 w-full bg-blue-500 hover:bg-blue-600 cursor-pointer" 
                    onClick={() => router.push("/")}
                >
                    Go to Home
                </Button>
            </div>
        </div>
    );
}
