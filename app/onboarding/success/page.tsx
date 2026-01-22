"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormButton from "@/components/auth/FormButton";

export default function OnboardingSuccessPage() {
    return (
        <AuthLayout>
            <div className="text-center sm:text-left space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 text-3xl shadow-sm">
                    🎉
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                        You’re all set
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Welcome to ReedAI.
                    </p>
                </div>

                <p className="text-gray-600 max-w-sm mx-auto sm:mx-0 leading-relaxed">
                    You can now start learning by talking things through with your tutor.
                </p>

                <div className="pt-6 space-y-3">
                    <Link href="/dashboard">
                        <FormButton fullWidth>
                            Start a voice session
                        </FormButton>
                    </Link>

                    <Link href="/dashboard">
                        <FormButton fullWidth variant="ghost">
                            Explore the dashboard
                        </FormButton>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
