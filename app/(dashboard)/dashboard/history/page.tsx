"use client";

import { motion } from "framer-motion";
import { Phone, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CallHistoryPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center font-dm-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-md mx-auto px-6"
            >
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                    <Phone size={36} className="text-indigo-500" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                        <Clock size={14} className="text-white" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-[#1E2A5E] mb-3">Call History</h1>

                {/* Coming Soon Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-4">
                    <Clock size={14} />
                    Coming Soon
                </div>

                {/* Description */}
                <p className="text-gray-500 leading-relaxed mb-8">
                    Your tutoring session history will appear here. Review past conversations, revisit key insights, and track your learning progress.
                </p>

                {/* Action */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E2A5E] text-white font-medium rounded-xl hover:bg-black transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>
            </motion.div>
        </div>
    );
}
