"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import FormButton from "@/components/auth/FormButton";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Verification failed");
            }

            // Success -> Go to Onboarding
            router.push("/onboarding");

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Invalid code");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="text-center">
                <p className="text-red-500 mb-4">Email not found. Please sign up again.</p>
                <Link href="/auth/signup" className="text-blue-600 underline">Back to Signup</Link>
            </div>
        );
    }

    return (
        <AuthLayout>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    Check your email
                </h1>
                <p className="text-gray-500">
                    We sent a verification code to <span className="font-medium text-gray-900">{email}</span>.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 mb-6">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-0.5">
                        Verification Code
                    </label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10 focus:border-[#1E2A5E] text-center text-2xl tracking-[1em] font-mono transition-all"
                        placeholder="000000"
                        required
                    />
                </div>

                <FormButton fullWidth type="submit" disabled={loading || otp.length < 6}>
                    {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify Email"}
                </FormButton>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-500">Didn't receive code? </span>
                <button className="font-medium text-[#2EC4B6] hover:underline" onClick={() => alert("Resend feature coming soon")}>
                    Resend
                </button>
            </div>
        </AuthLayout>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>}>
            <VerifyContent />
        </Suspense>
    );
}
