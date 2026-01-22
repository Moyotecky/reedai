"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedIllustration from "./AnimatedIllustration";

interface AuthLayoutProps {
    children: React.ReactNode;
    showSidebar?: boolean;
}

const AuthLayout = ({ children, showSidebar = true }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen w-full flex bg-white font-dm-sans text-[#1F2937]">
            {/* Left Panel - Form Content */}
            <div className="w-full lg:w-[50%] flex flex-col p-6 sm:p-12 lg:p-20 relative overflow-y-auto">
                <div className="max-w-[420px] w-full mx-auto flex flex-col flex-1 justify-center">
                    {/* Logo */}
                    <Link href="/" className="mb-12 block w-fit">
                        <span className="text-xl font-bold tracking-tight text-[#1E2A5E]">ReedAI</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Illustration */}
            {showSidebar && (
                <div className="hidden lg:block lg:w-[50%] relative bg-[#F8F9FB] sticky top-0 h-screen">
                    <AnimatedIllustration />
                </div>
            )}
        </div>
    );
};

export default AuthLayout;
