"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check, Download, Filter, Mic, MessageSquare, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import clsx from "clsx";

// --- Types ---
interface CreditPack {
    id: string;
    name: string;
    credits: number;
    price: string;
    description: string;
    features: string[];
    popular?: boolean;
}

interface UsageItem {
    id: string;
    description: string;
    credits: number;
    date: string;
    type: "voice" | "chat";
}

// --- Mock Data ---
const CREDIT_PACKS: CreditPack[] = [
    {
        id: "starter",
        name: "Starter Pack",
        credits: 100,
        price: "₦1,000",
        description: "Perfect for trying out ReedAI.",
        features: [
            "100 credits for sessions",
            "Voice & chat access",
            "Credits never expire",
            "Basic email support"
        ]
    },
    {
        id: "exam",
        name: "Exam Pack",
        credits: 300,
        price: "₦2,500",
        description: "Best value for exam prep.",
        features: [
            "300 credits for sessions",
            "Voice & chat access",
            "Priority tutoring queue",
            "Session summaries",
            "Email support"
        ],
        popular: true
    },
    {
        id: "power",
        name: "Power Pack",
        credits: 800,
        price: "₦5,000",
        description: "Unlimited learning potential.",
        features: [
            "800 credits for sessions",
            "Voice & chat access",
            "Priority tutoring queue",
            "Detailed session analytics",
            "Priority support"
        ]
    },
];

const USAGE_HISTORY: UsageItem[] = [
    { id: "1", description: "Voice Session - Calculus", credits: 18, date: "Jan 20, 2024", type: "voice" },
    { id: "2", description: "Chat Session - Linear Algebra", credits: 4, date: "Jan 19, 2024", type: "chat" },
    { id: "3", description: "Voice Session - Statistics", credits: 22, date: "Jan 18, 2024", type: "voice" },
    { id: "4", description: "Chat Session - Probability", credits: 6, date: "Jan 17, 2024", type: "chat" },
    { id: "5", description: "Voice Session - Diff Equations", credits: 15, date: "Jan 16, 2024", type: "voice" },
    { id: "6", description: "Chat Session - Discrete Math", credits: 3, date: "Jan 15, 2024", type: "chat" },
];

export default function CreditsPage() {
    const [balance] = useState(240);
    const [selectedPack, setSelectedPack] = useState("exam");
    const [showAllHistory, setShowAllHistory] = useState(false);

    const displayedHistory = showAllHistory ? USAGE_HISTORY : USAGE_HISTORY.slice(0, 4);

    return (
        <div className="font-dm-sans max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1E2A5E] mb-2">Credits</h1>
                <p className="text-gray-500">Your balance for tutoring sessions. Credits never expire.</p>
            </motion.div>

            {/* Current Balance Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-gradient-to-r from-[#1E2A5E] to-[#3D5A80] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Zap size={24} className="text-amber-300" />
                    </div>
                    <div>
                        <p className="text-white/70 text-sm">Current Balance</p>
                        <p className="text-3xl font-bold text-white">{balance} <span className="text-lg font-normal text-white/60">credits</span></p>
                    </div>
                </div>
                <button className="px-6 py-3 bg-white text-[#1E2A5E] font-medium rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap">
                    Buy more credits
                </button>
            </motion.div>

            {/* Credit Packs */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-10"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                    {CREDIT_PACKS.map((pack, i) => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                            onClick={() => setSelectedPack(pack.id)}
                            className={clsx(
                                "rounded-2xl p-6 border-2 transition-all cursor-pointer relative",
                                selectedPack === pack.id
                                    ? "border-[#1E2A5E] bg-white shadow-lg"
                                    : "border-gray-100 bg-white hover:border-gray-200"
                            )}
                        >
                            {/* Selected Indicator */}
                            {selectedPack === pack.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#1E2A5E] rounded-full flex items-center justify-center">
                                    <Check size={14} className="text-white" />
                                </div>
                            )}

                            {/* Popular Badge */}
                            {pack.popular && (
                                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full mb-3">
                                    Popular
                                </div>
                            )}

                            <h3 className="text-sm text-gray-500 mb-1">{pack.name}</h3>
                            <p className="text-3xl font-bold text-[#1E2A5E] mb-2">
                                {pack.price}
                            </p>
                            <p className="text-sm text-gray-500 mb-5">{pack.description}</p>

                            {/* Features */}
                            <ul className="space-y-2.5 mb-6">
                                {pack.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                                        <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={clsx(
                                "w-full py-3 rounded-xl font-medium transition-colors",
                                selectedPack === pack.id
                                    ? "bg-[#1E2A5E] text-white hover:bg-black"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            )}>
                                {selectedPack === pack.id ? "Selected" : "Select"}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Usage History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-[#1E2A5E]">Credit History</h2>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Filter size={14} /> Filter
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download size={14} /> Download all
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    {/* Table Header (Desktop) */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
                        <div className="col-span-5">Description</div>
                        <div className="col-span-2 text-right">Credits</div>
                        <div className="col-span-3">Date</div>
                        <div className="col-span-2">Type</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-gray-50">
                        <AnimatePresence>
                            {displayedHistory.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors items-center"
                                >
                                    <div className="sm:col-span-5 flex items-center gap-3">
                                        <div className={clsx(
                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                            item.type === "voice" ? "bg-purple-50 text-purple-500" : "bg-blue-50 text-blue-500"
                                        )}>
                                            {item.type === "voice" ? <Mic size={14} /> : <MessageSquare size={14} />}
                                        </div>
                                        <span className="text-sm font-medium text-gray-900 truncate">{item.description}</span>
                                    </div>
                                    <div className="sm:col-span-2 text-sm font-medium text-gray-900 sm:text-right">
                                        -{item.credits} credits
                                    </div>
                                    <div className="sm:col-span-3 text-sm text-gray-500">
                                        {item.date}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className={clsx(
                                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                            item.type === "voice"
                                                ? "bg-purple-50 text-purple-600"
                                                : "bg-blue-50 text-blue-600"
                                        )}>
                                            {item.type === "voice" ? "Voice" : "Chat"}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Show More */}
                    {USAGE_HISTORY.length > 4 && (
                        <div className="px-6 py-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowAllHistory(!showAllHistory)}
                                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors"
                            >
                                {showAllHistory ? (
                                    <>Show less <ChevronUp size={14} /></>
                                ) : (
                                    <>Show all history <ChevronDown size={14} /></>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
