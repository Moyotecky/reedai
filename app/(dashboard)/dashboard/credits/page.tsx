"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check, Download, Filter, Mic, MessageSquare, ChevronDown, ChevronUp, RefreshCw, ShoppingCart, AlertCircle, Loader2 } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

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

interface Transaction {
    _id: string;
    credits: number;
    amount: number;
    status: 'pending' | 'success' | 'failed';
    createdAt: string;
    packId: string;
    reference: string;
}

// --- Mock Data (Packs) ---
const CREDIT_PACKS: CreditPack[] = [
    {
        id: "starter",
        name: "Starter Pack",
        credits: 100,
        price: "₦1,000",
        description: "Perfect for trying out ReedAI.",
        features: ["100 credits for sessions", "Voice & chat access", "Credits never expire", "Basic email support"]
    },
    {
        id: "exam",
        name: "Exam Pack",
        credits: 300,
        price: "₦2,500",
        description: "Best value for exam prep.",
        features: ["300 credits for sessions", "Voice & chat access", "Priority tutoring queue", "Session summaries", "Email support"],
        popular: true
    },
    {
        id: "power",
        name: "Power Pack",
        credits: 800,
        price: "₦5,000",
        description: "Unlimited learning potential.",
        features: ["800 credits for sessions", "Voice & chat access", "Priority tutoring queue", "Detailed session analytics", "Priority support"]
    },
];

export default function CreditsPage() {
    const [balance, setBalance] = useState<number | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPack, setSelectedPack] = useState("exam");
    const [showAllHistory, setShowAllHistory] = useState(false);
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch User Balance
                const userRes = await fetch('/api/auth/me');
                if (userRes.ok) {
                    const data = await userRes.json();
                    setBalance(data.data.user.credits);
                }

                // 2. Fetch Transactions
                const historyRes = await fetch('/api/payments/history');
                if (historyRes.ok) {
                    const data = await historyRes.json();
                    setTransactions(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch credits data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePurchase = async (packId: string) => {
        setProcessingPayment(true);
        try {
            const pack = CREDIT_PACKS.find(p => p.id === packId);
            if (!pack) return;

            // Strip currency symbol and comma for simple parsing
            const amount = parseInt(pack.price.replace(/[^\d]/g, ''));

            const res = await fetch('/api/payments/initialize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    packId,
                    amount,
                    credits: pack.credits
                })
            });

            const data = await res.json();
            if (data.success && data.data.authorization_url) {
                // Redirect to Paystack
                window.location.href = data.data.authorization_url;
            } else {
                alert("Payment initialization failed");
            }

        } catch (error) {
            console.error(error);
            alert("Error initializing payment");
        } finally {
            setProcessingPayment(false);
        }
    };

    const displayedHistory = showAllHistory ? transactions : transactions.slice(0, 5);

    return (
        <div className="font-dm-sans max-w-6xl mx-auto pb-20">
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
                className="bg-gradient-to-r from-[#1E2A5E] to-[#3D5A80] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl shadow-indigo-900/10"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Zap size={24} className="text-amber-300" />
                    </div>
                    <div>
                        <p className="text-white/70 text-sm font-medium">Current Balance</p>
                        {isLoading ? (
                            <div className="h-9 w-24 bg-white/10 rounded animate-pulse mt-1" />
                        ) : (
                            <p className="text-3xl font-bold text-white">{balance} <span className="text-lg font-normal text-white/60">credits</span></p>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 bg-white text-[#1E2A5E] font-bold rounded-xl hover:bg-indigo-50 transition-all whitespace-nowrap shadow-sm"
                >
                    Buy more credits
                </button>
            </motion.div>

            {/* Credit Packs */}
            <motion.div
                id="packs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
            >
                <h2 className="text-xl font-bold text-[#1E2A5E] mb-6">Purchase Credits</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {CREDIT_PACKS.map((pack, i) => (
                        <motion.div
                            key={pack.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.05 }}
                            onClick={() => setSelectedPack(pack.id)}
                            className={clsx(
                                "rounded-2xl p-6 border-2 transition-all cursor-pointer relative flex flex-col h-full",
                                selectedPack === pack.id
                                    ? "border-[#1E2A5E] bg-white shadow-xl shadow-indigo-900/10 scale-[1.02]"
                                    : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg"
                            )}
                        >
                            {/* Selected Indicator */}
                            {selectedPack === pack.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 bg-[#1E2A5E] rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-200">
                                    <Check size={14} className="text-white" />
                                </div>
                            )}

                            {/* Popular Badge */}
                            {pack.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-[#1E2A5E] px-4 py-1 text-xs font-bold rounded-full shadow-sm">
                                    MOST POPULAR
                                </div>
                            )}

                            <h3 className="text-sm font-bold text-gray-500 mb-1 uppercase tracking-wider">{pack.name}</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-3xl font-bold text-[#1E2A5E]">{pack.price}</span>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">{pack.description}</p>

                            {/* Features */}
                            <ul className="space-y-3 mb-8 flex-1">
                                {pack.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3 text-sm text-gray-600">
                                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check size={12} className="text-green-600" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePurchase(pack.id);
                                }}
                                disabled={processingPayment}
                                className={clsx(
                                    "w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                                    selectedPack === pack.id
                                        ? "bg-[#1E2A5E] text-white hover:bg-[#15204a]"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                )}>
                                {processingPayment && selectedPack === pack.id ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
                                {processingPayment && selectedPack === pack.id ? "Processing..." : "Purchase Now"}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Transaction History */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1E2A5E]">Transaction History</h2>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium">
                            <RefreshCw size={14} className={clsx(isLoading && "animate-spin")} /> Refresh
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-4">Description</div>
                        <div className="col-span-3">Status</div>
                        <div className="col-span-3">Date</div>
                        <div className="col-span-2 text-right">Amount</div>
                    </div>

                    {/* Empty State */}
                    {!isLoading && transactions.length === 0 && (
                        <div className="py-16 flex flex-col items-center justify-center text-center px-4">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <ShoppingCart size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No transactions yet</h3>
                            <p className="text-gray-500 max-w-sm">When you purchase credits, your history will appear here.</p>
                        </div>
                    )}

                    {/* Rows */}
                    <div className="divide-y divide-gray-50">
                        <AnimatePresence>
                            {displayedHistory.map((item, i) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors items-center"
                                >
                                    <div className="sm:col-span-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-[#1E2A5E] font-bold shrink-0">
                                            {item.packId === 'starter' ? 'S' : item.packId === 'power' ? 'P' : 'E'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{item.packId.charAt(0).toUpperCase() + item.packId.slice(1)} Pack</p>
                                            <p className="text-xs text-gray-500 uppercase">{item.reference.slice(0, 8)}...</p>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <span className={clsx(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold",
                                            item.status === 'success' ? "bg-green-100 text-green-700" :
                                                item.status === 'pending' ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-red-100 text-red-700"
                                        )}>
                                            <span className={clsx("w-1.5 h-1.5 rounded-full",
                                                item.status === 'success' ? "bg-green-500" :
                                                    item.status === 'pending' ? "bg-yellow-500" : "bg-red-500"
                                            )} />
                                            {item.status.toUpperCase()}
                                        </span>
                                    </div>

                                    <div className="sm:col-span-3 text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                                            month: 'short', day: 'numeric', year: 'numeric',
                                            hour: 'numeric', minute: 'numeric'
                                        })}
                                    </div>

                                    <div className="sm:col-span-2 text-right">
                                        <p className="font-bold text-gray-900">
                                            {(item.amount / 100).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                        </p>
                                        <p className="text-xs text-green-600 font-medium">+{item.credits} credits</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Show More */}
                    {transactions.length > 5 && (
                        <div className="px-6 py-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowAllHistory(!showAllHistory)}
                                className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors font-medium"
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
