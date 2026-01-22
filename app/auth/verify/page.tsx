"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormButton from "@/components/auth/FormButton";

export default function VerifyEmailPage() {
    return (
        <AuthLayout>
            <div className="space-y-4 mb-8 text-center sm:text-left">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto sm:mx-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    Check your email
                </h1>
                <p className="text-gray-500 leading-relaxed">
                    We’ve sent a verification link to your email address. <br className="hidden sm:block" />
                    Please verify your email to unlock all features.
                </p>
            </div>

            <div className="space-y-4">
                <Link href="/onboarding/profile">
                    <FormButton fullWidth variant="secondary">
                        Resend email
                    </FormButton>
                </Link>

                <p className="text-sm text-gray-500 text-center sm:text-left border-t border-gray-100 pt-6 mt-6">
                    You can continue exploring ReedAI, but posting and payments are locked until verification.
                </p>

                <div className="pt-2 flex justify-center sm:justify-start">
                    <Link href="/auth/login" className="text-sm font-medium text-gray-400 hover:text-gray-600 flex items-center gap-2">
                        ← Back to sign in
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
