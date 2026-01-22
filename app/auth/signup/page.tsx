"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";

export default function SignupPage() {
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

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <FormInput
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                />
                <FormInput
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                />
                <div className="space-y-1">
                    <FormInput
                        label="Confirm password"
                        type="password"
                        placeholder="Confirm your password"
                    />
                    <p className="text-xs text-gray-500 pl-1">
                        Password must be at least 8 characters
                    </p>
                </div>

                <div className="pt-2">
                    <Link href="/auth/verify">
                        <FormButton fullWidth type="submit">
                            Create account
                        </FormButton>
                    </Link>
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
