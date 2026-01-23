"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";
import { Loader2, AlertCircle } from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleOnboarding = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, username }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || data.message || "Onboarding failed");
            }

            // Success -> Dashboard
            router.refresh();
            router.push("/dashboard");

        } catch (err: any) {
            console.error("Onboarding failed:", err);
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    Tell us about yourself
                </h1>
                <p className="text-gray-500">
                    Just a few more details to set up your profile.
                </p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 mb-6">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            <form className="space-y-5" onSubmit={handleOnboarding}>
                <FormInput
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <FormInput
                    label="Username"
                    type="text"
                    placeholder="johndoe123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <div className="pt-2">
                    <FormButton fullWidth type="submit" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin mx-auto" /> : "Complete Setup"}
                    </FormButton>
                </div>
            </form>
        </AuthLayout>
    );
}
