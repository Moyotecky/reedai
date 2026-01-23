"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                // If the backend returns a specific error message, use it.
                // Otherwise fallback to status text.
                throw new Error(data.error || data.message || "Invalid credentials");
            }

            // Success: Cookie is set by the backend.
            // Just redirect to dashboard.
            router.refresh(); // Ensure middleware/server components re-run
            router.push("/dashboard");

        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    Welcome back
                </h1>
                <p className="text-gray-500">
                    Sign in to continue studying.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 mb-6">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
                <FormInput
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="space-y-1">
                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="flex justify-end">
                        <Link href="#" className="text-sm font-medium text-gray-400 hover:text-gray-600">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className="pt-2">
                    <FormButton fullWidth type="submit" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Sign in"}
                    </FormButton>
                </div>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-500">Don’t have an account? </span>
                <Link href="/auth/signup" className="font-medium text-[#2EC4B6] hover:underline">
                    Create one
                </Link>
            </div>
        </AuthLayout>
    );
}
