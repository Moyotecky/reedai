"use client";

import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import FormButton from "@/components/auth/FormButton";

export default function StudyContextPage() {
    return (
        <AuthLayout>
            <div className="mb-8">
                <span className="text-xs font-bold text-[#2EC4B6] tracking-wider uppercase mb-2 block">Step 2 of 2</span>
                <h1 className="text-3xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">
                    What are you studying?
                </h1>
                <p className="text-gray-500 mt-2">
                    This helps ReedAI guide you better.
                </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <FormInput
                    label="Field of study (optional)"
                    type="text"
                    placeholder="e.g. Computer Science, Law, Medicine"
                />

                <FormInput
                    label="Current course / subject (optional)"
                    type="text"
                    placeholder="e.g. Data Structures, Constitutional Law"
                />

                <div className="pt-4 space-y-3">
                    <Link href="/onboarding/success">
                        <FormButton fullWidth type="submit">
                            Start studying
                        </FormButton>
                    </Link>

                    <Link href="/onboarding/success" className="block text-center">
                        <span className="text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
                            Skip for now
                        </span>
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
