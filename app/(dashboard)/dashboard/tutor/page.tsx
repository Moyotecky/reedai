"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TutorCard, { TutorProps } from "@/components/dashboard/tutor/TutorCard";
import { Search, Mic } from "lucide-react";
import Link from "next/link";

const TUTORS: TutorProps[] = [
    {
        id: "exam",
        name: "Exam Tutor",
        description: "Focused on what gets marks. Explains concepts the way examiners expect.",
        tags: ["Exam-focused", "Direct", "Practical"],
        avatar: "👨‍🏫",
        avatarColor: "bg-orange-100 text-orange-600"
    },
    {
        id: "beginner",
        name: "Beginner Tutor",
        description: "Explains topics from scratch. Perfect if you feel lost or need things slowed down.",
        tags: ["Beginner-friendly", "Slow", "Very clear"],
        avatar: "🌱",
        avatarColor: "bg-green-100 text-green-600"
    },
    {
        id: "revision",
        name: "Revision Tutor",
        description: "Helps you quickly revise and recall what you already know. Best for last-minute prep.",
        tags: ["Fast", "Summary-based", "Recall"],
        avatar: "⚡",
        avatarColor: "bg-yellow-100 text-yellow-600"
    },
    {
        id: "practice",
        name: "Practice Tutor",
        description: "Asks you questions and tests your understanding. Good for active learning.",
        tags: ["Question-based", "Interactive", "Testing"],
        avatar: "🎯",
        avatarColor: "bg-blue-100 text-blue-600"
    },
    {
        id: "math",
        name: "Math Tutor",
        description: "Specialized in Calculus, Algebra, and Geometry. Step-by-step problem solving.",
        tags: ["Math", "Step-by-step", "Logic"],
        avatar: "📐",
        avatarColor: "bg-red-100 text-red-600"
    },
    {
        id: "cs",
        name: "CS Tutor",
        description: "Coding concepts, algorithms, and system design. Technical and precise.",
        tags: ["Coding", "Algorithms", "Technical"],
        avatar: "💻",
        avatarColor: "bg-slate-100 text-slate-600"
    },
    {
        id: "literature",
        name: "Literature Tutor",
        description: "Analysis of themes, characters, and essay structure. Conversational style.",
        tags: ["Essay-help", "Themes", "Discussion"],
        avatar: "📚",
        avatarColor: "bg-rose-100 text-rose-600"
    },
    {
        id: "history",
        name: "History Tutor",
        description: "Contextualizes events and timelines. Story-driven explanations.",
        tags: ["History", "Timeline", "Story"],
        avatar: "🏛️",
        avatarColor: "bg-amber-100 text-amber-600"
    }
];

export default function TutorPage() {
    const [selectedTutorId, setSelectedTutorId] = useState<string>("exam");
    const [searchQuery, setSearchQuery] = useState("");

    const selectedTutor = TUTORS.find(t => t.id === selectedTutorId);

    // Filter Logic
    const filteredTutors = TUTORS.filter(tutor => {
        const query = searchQuery.toLowerCase();
        return (
            tutor.name.toLowerCase().includes(query) ||
            tutor.description.toLowerCase().includes(query) ||
            tutor.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="w-full space-y-8 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E2A5E] to-[#2D3A75] text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold font-dm-sans tracking-tight">
                            Tutors
                        </h1>
                        <p className="text-indigo-100 mt-2 max-w-xl text-lg">
                            Choose a tutor that matches how you want to learn. You can switch anytime.
                        </p>
                        {selectedTutor && (
                            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#1E2A5E] bg-white px-4 py-1.5 rounded-full w-fit shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Current: {selectedTutor.name}
                            </div>
                        )}
                    </div>

                    {/* Search Bar - Integrated into Header */}
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-indigo-300" />
                        </div>
                        <input
                            type="text"
                            placeholder="Filter by style..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all w-full backdrop-blur-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-300 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Grid - Full Width Responsive */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
            >
                {filteredTutors.map((tutor) => (
                    <motion.div key={tutor.id} variants={item}>
                        <TutorCard
                            tutor={tutor}
                            isSelected={selectedTutorId === tutor.id}
                            onSelect={setSelectedTutorId}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Sticky/Fixed Bottom CTA */}
            {selectedTutorId && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-8 right-8 z-30"
                >
                    {/* <link rel="import" href="component.html" /> */}
                    <Link href="/dashboard/call">
                        <button className="flex items-center gap-3 bg-[#1E2A5E] text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-900/20 hover:bg-[#15204a] hover:scale-105 transition-all text-lg border border-indigo-700">
                            <Mic size={24} />
                            Start voice session
                        </button>
                    </Link>
                </motion.div>
            )}
        </div>
    );
}
