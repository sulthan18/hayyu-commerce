"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logout } from "../lib/actions";

export default function FormLogout() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await Logout();
            if (result.error) {
                setError(result.error);
            } else {
                router.push("/dashboard/sign-in");
            }
        } catch (err) {
            console.error("Logout failed", err);
            setError("Logout failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <form onSubmit={handleLogout}>
                    <Button
                        variant="link"
                        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                        disabled={loading}
                    >
                        <LogOut className="h-5 w-5" />
                    </Button>
                </form>
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
            {error && <p className="text-red-500">{error}</p>}
        </Tooltip>
    );
}
