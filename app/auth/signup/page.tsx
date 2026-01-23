"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Frontend Validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Registration failed");
            }

            // Success
            router.refresh();
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`);

        } catch (err: any) {
            console.error("Signup failed:", err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    Create your account
                </h1>
                <p className="text-gray-500">
                    Start learning by talking it through.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 mb-6">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSignup}>
                <FormInput
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="space-y-1">
                    <FormInput
                        label="Confirm password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <p className="text-xs text-gray-500 pl-1">
                        Password must be at least 8 characters
                    </p>
                </div>

                <div className="pt-2">
                    <FormButton fullWidth type="submit" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Continue"}
                    </FormButton>
                </div>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-500">Already have an account? </span>
                <Link href="/auth/login" className="font-medium text-[#2EC4B6] hover:underline">
                    Sign in
                </Link>
            </div>
        </AuthLayout>
    );
}
