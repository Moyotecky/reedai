"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";

export default function ProfileSetupPage() {
    return (
        <AuthLayout>
            <div className="mb-8">
                <span className="text-xs font-bold text-[#2EC4B6] tracking-wider uppercase mb-2 block">Step 1 of 2</span>
                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    Let’s set up your profile
                </h1>
                <p className="text-gray-500 mt-2">
                    This is how you’ll appear in the community.
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl border-2 border-dashed border-gray-300 text-gray-400 cursor-pointer hover:bg-gray-50 transition-colors">
                        📷
                    </div>
                    <button className="text-sm font-medium text-[#1E2A5E] hover:underline">
                        Choose avatar
                    </button>
                    <span className="text-xs text-gray-400">(optional)</span>
                </div>

                <div className="space-y-1">
                    <FormInput
                        label="Username"
                        type="text"
                        placeholder="@username"
                    />
                    <p className="text-xs text-green-600 pl-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" /> Available
                    </p>
                </div>

                <FormInput
                    label="Display name (optional)"
                    type="text"
                    placeholder="e.g. Alex Smith"
                />

                <div className="pt-4">
                    <Link href="/onboarding/study">
                        <FormButton fullWidth type="submit">
                            Continue
                        </FormButton>
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
