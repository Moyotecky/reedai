"use client";

import { motion } from "framer-motion";

const AnimatedIllustration = () => {
    return (
        <div className="relative w-full h-full bg-gradient-to-br from-[#F0F4FF] to-[#E6F7F5] overflow-hidden flex items-center justify-center">
            {/* Background Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-200 rounded-full blur-3xl opacity-20"
            />

            {/* Central Content */}
            <div className="relative z-10 w-full max-w-lg p-12">
                {/* Floating Cards / Elements */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute top-0 right-10 p-4 bg-white rounded-2xl shadow-xl shadow-blue-900/5 rotate-6"
                >
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-2xl">⚡</div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-20 left-10 p-5 bg-white rounded-2xl shadow-xl shadow-blue-900/5 -rotate-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">🎤</div>
                        <div className="space-y-1">
                            <div className="h-2 w-20 bg-gray-100 rounded-full" />
                            <div className="h-2 w-12 bg-gray-100 rounded-full" />
                        </div>
                    </div>
                </motion.div>

                {/* Main Illustration Placeholder (Abstract Study Concept) */}
                <div className="relative glass-card bg-white/40 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-2xl shadow-blue-900/5">
                    <div className="flex flex-col gap-6">
                        <div className="h-4 w-3/4 bg-white/60 rounded-full" />
                        <div className="space-y-3">
                            <div className="h-20 w-full bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-2xl border border-white/50" />
                            <div className="flex gap-3">
                                <div className="h-20 w-1/2 bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-2xl border border-white/50" />
                                <div className="h-20 w-1/2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-white/50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedIllustration;
