"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Mic, MessageSquare, ChevronDown, ChevronUp, Clock, Check, Shield } from "lucide-react";
import clsx from "clsx";

// --- Types ---
interface CreditPack {
    id: string;
    name: string;
    credits: number;
    price: string;
    popular?: boolean;
}

interface UsageItem {
    type: "voice" | "chat";
    credits: number;
    date: string;
}

// --- Mock Data ---
const CREDIT_PACKS: CreditPack[] = [
    { id: "starter", name: "Starter Pack", credits: 100, price: "₦1,000" },
    { id: "exam", name: "Exam Pack", credits: 300, price: "₦2,500", popular: true },
    { id: "power", name: "Power Pack", credits: 800, price: "₦5,000" },
];

const USAGE_HISTORY: UsageItem[] = [
    { type: "voice", credits: 18, date: "Today" },
    { type: "chat", credits: 4, date: "Yesterday" },
    { type: "voice", credits: 22, date: "Yesterday" },
    { type: "chat", credits: 6, date: "2 days ago" },
    { type: "voice", credits: 15, date: "3 days ago" },
];

export default function CreditsPage() {
    const [balance] = useState(240);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="max-w-3xl mx-auto font-dm-sans">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-[#1E2A5E] mb-2">Credits</h1>
                <p className="text-gray-500">Your balance for tutoring sessions.</p>
                <p className="text-sm text-gray-400 mt-1">Credits never expire.</p>
            </motion.div>

            {/* Balance Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#1E2A5E] to-[#3D5A80] rounded-3xl p-8 text-white mb-8 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap size={20} className="text-amber-400" />
                        <span className="text-white/70 text-sm font-medium">Current Balance</span>
                    </div>

                    <div className="text-6xl font-bold mb-2">{balance}</div>
                    <p className="text-white/60 text-sm mb-6">Credits</p>

                    <p className="text-white/50 text-sm mb-6">Used for voice sessions and AI responses.</p>

                    <button className="px-6 py-3 bg-white text-[#1E2A5E] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                        Buy more credits
                    </button>
                </div>
            </motion.div>

            {/* How Credits Work */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 mb-8"
            >
                <h2 className="font-bold text-[#1E2A5E] mb-4 flex items-center gap-2">
                    <Zap size={18} className="text-amber-500" /> How credits work
                </h2>
                <ul className="space-y-3 text-gray-600 text-sm">
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                        Credits are used when you interact with the tutor
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                        Voice sessions use credits gradually
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                        Chat uses fewer credits
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0" />
                        Credits never expire
                    </li>
                </ul>
            </motion.div>

            {/* Credit Packs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
            >
                <h2 className="font-bold text-[#1E2A5E] mb-4">Buy Credits</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {CREDIT_PACKS.map((pack, i) => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className={clsx(
                                "rounded-2xl p-6 border-2 transition-all hover:shadow-lg cursor-pointer relative",
                                pack.popular
                                    ? "border-[#1E2A5E] bg-white"
                                    : "border-gray-100 bg-white hover:border-gray-200"
                            )}
                        >
                            {pack.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#1E2A5E] text-white text-xs font-bold rounded-full">
                                    Popular
                                </div>
                            )}
                            <h3 className="font-bold text-gray-900 mb-1">{pack.name}</h3>
                            <p className="text-2xl font-bold text-[#1E2A5E] mb-1">{pack.credits} <span className="text-sm font-normal text-gray-500">credits</span></p>
                            <p className="text-gray-500 text-sm mb-4">{pack.price}</p>
                            <button className={clsx(
                                "w-full py-2.5 rounded-xl font-medium transition-colors",
                                pack.popular
                                    ? "bg-[#1E2A5E] text-white hover:bg-black"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            )}>
                                Buy
                            </button>
                        </motion.div>
                    ))}
                </div>
                <p className="text-xs text-gray-400 text-center mt-4 flex items-center justify-center gap-1">
                    <Shield size={12} /> Payments are processed securely.
                </p>
            </motion.div>

            {/* Usage History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                    <span className="font-bold text-gray-700">Recent usage</span>
                    {showHistory ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </button>

                <AnimatePresence>
                    {showHistory && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="px-5 pb-5 space-y-3">
                                {USAGE_HISTORY.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className={clsx(
                                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                                item.type === "voice" ? "bg-purple-50 text-purple-500" : "bg-blue-50 text-blue-500"
                                            )}>
                                                {item.type === "voice" ? <Mic size={16} /> : <MessageSquare size={16} />}
                                            </div>
                                            <span className="text-sm text-gray-700">
                                                {item.type === "voice" ? "Voice session" : "Chat session"}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-gray-900">{item.credits} credits</span>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
