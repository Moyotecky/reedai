"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";

export default function LoginPage() {
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

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <FormInput
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                />

                <div className="space-y-1">
                    <FormInput
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <div className="flex justify-end">
                        <Link href="#" className="text-sm font-medium text-gray-400 hover:text-gray-600">
                            Forgot your password?
                        </Link>
                    </div>
                </div>

                <div className="pt-2">
                    <Link href="/dashboard">
                        <FormButton fullWidth type="submit">
                            Sign in
                        </FormButton>
                    </Link>
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
