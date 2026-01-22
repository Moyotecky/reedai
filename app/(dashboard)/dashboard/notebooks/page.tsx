"use client";

import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, FileText, Video, Mic, ChefHat, ShoppingCart, Calendar, CheckSquare, BookOpen, Clock, Folder } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// --- Mock Data ---

const TEMPLATES = [
    { label: "Calculus Set", icon: <BookOpen size={18} className="text-amber-600" />, bg: "bg-amber-100" },
    { label: "Algebra Notes", icon: <FileText size={18} className="text-blue-600" />, bg: "bg-blue-100" },
    { label: "Geometry", icon: <Calendar size={18} className="text-orange-600" />, bg: "bg-orange-100" },
    { label: "Statistics", icon: <CheckSquare size={18} className="text-rose-600" />, bg: "bg-rose-100" },
    { label: "Problem Log", icon: <BookOpen size={18} className="text-purple-600" />, bg: "bg-purple-100" },
];

const DRAFTS = [
    {
        id: "1",
        title: "Differential Equations: First Order Review",
        category: "Notes",
        date: "Sept 05, 2025",
        color: "bg-white",
        iconColor: "bg-purple-100 text-purple-600",
        image: true
    },
    {
        id: "2",
        title: "Linear Algebra: Eigenvalues & Vectors",
        category: "Math",
        date: "Today",
        color: "bg-yellow-50",
        iconColor: "bg-yellow-100 text-yellow-600",
        tags: ["Exam Prep", "Important"]
    },
    {
        id: "3",
        title: "Calculus III: Multiple Integrals",
        category: "Homework",
        date: "June 23, 2025",
        color: "bg-green-50",
        iconColor: "bg-green-100 text-green-600"
    },
    {
        id: "4",
        title: "Probability Theory: Bayes Theorem",
        category: "Lecture",
        date: "October 5, 2025",
        color: "bg-purple-50",
        iconColor: "bg-purple-100 text-purple-600"
    },
    {
        id: "5",
        title: "Real Analysis: Convergence Tests",
        category: "Notes",
        date: "November 12, 2025",
        color: "bg-pink-50",
        iconColor: "bg-pink-100 text-pink-600"
    },
    {
        id: "6",
        title: "Complex Numbers & Polar Coordinates",
        category: "Review",
        date: "July 23, 2025",
        color: "bg-orange-50",
        iconColor: "bg-orange-100 text-orange-600",
        big: true
    },
    {
        id: "7",
        title: "Discrete Math: Graph Theory",
        category: "Research",
        date: "March 7, 2025",
        color: "bg-yellow-50",
        iconColor: "bg-yellow-100 text-yellow-600"
    },
    {
        id: "8",
        title: "Number Theory Basics",
        category: "Notes",
        date: "January 7, 2025",
        color: "bg-rose-50",
        iconColor: "bg-rose-100 text-rose-600"
    }
];

export default function NotebooksDashboard() {
    return (
        <div className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10 font-dm-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-[#1E2A5E]">My Notebooks</h1>
                    <p className="text-gray-500 mt-2">Let's get started and take the first step towards becoming a more productive and organized you!</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-gray-200">
                        <Folder size={16} /> Private Projects
                    </div>
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div className="mb-10">
                <h2 className="text-lg font-bold text-[#1E2A5E] mb-4">Templates</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {TEMPLATES.map((t, i) => (
                        <motion.button
                            whileHover={{ y: -2 }}
                            key={i}
                            className="bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all flex items-center gap-3 text-left"
                        >
                            <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center", t.bg)}>
                                {t.icon}
                            </div>
                            <span className="text-sm font-bold text-gray-700">{t.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Drafts Grid */}
            <div>
                <h2 className="text-lg font-bold text-[#1E2A5E] mb-4">My drafts</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {DRAFTS.map((draft) => (
                        <Link href={`/dashboard/notebooks/${draft.id}`} key={draft.id} className="block break-inside-avoid">
                            <motion.div
                                whileHover={{ y: -4 }}
                                className={clsx(
                                    "p-6 rounded-3xl transition-all hover:shadow-lg relative group",
                                    draft.color
                                )}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className={clsx("px-3 py-1 rounded-lg text-xs font-bold", draft.iconColor)}>
                                        {draft.category}
                                    </span>
                                    <button className="p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                                        <FileText size={14} className="opacity-50" />
                                    </button>
                                </div>

                                {draft.image && (
                                    <div className="mb-6 rounded-2xl bg-[#a0a8ff] h-40 w-full flex items-end justify-center pb-0 overflow-hidden relative">
                                        {/* Mock illustration */}
                                        <div className="w-24 h-32 bg-white/20 rounded-t-xl mx-auto" />
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-[#1E2A5E] mb-6 leading-tigher">
                                    {draft.title}
                                </h3>

                                <div className="flex items-center justify-between text-xs font-medium text-gray-500 border-t border-black/5 pt-4">
                                    <span>{draft.date}</span>
                                    <div className="w-6 h-6 rounded-lg bg-white/50 flex items-center justify-center">
                                        <FileText size={12} />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
