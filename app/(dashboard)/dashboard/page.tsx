"use client";

import { motion, Variants } from "framer-motion";
import WelcomeHeader from "@/components/dashboard/widgets/WelcomeHeader";
import PrimaryActionCard from "@/components/dashboard/widgets/PrimaryActionCard";
import CreditsCard from "@/components/dashboard/widgets/CreditsCard";
import ContinueLearningCard from "@/components/dashboard/widgets/ContinueLearningCard";
import NextStepCard from "@/components/dashboard/widgets/NextStepCard";
import RecentNotebooksList from "@/components/dashboard/widgets/RecentNotebooksList";
import RecentActivityList from "@/components/dashboard/widgets/RecentActivityList";
import { Mic, Plus } from "lucide-react";
import Link from "next/link";

// Animation Variants
const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 50
        }
    }
};

export default function DashboardPage() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* 1. Welcome */}
            <motion.div variants={item} className="mb-2">
                <WelcomeHeader username="Alex" />
            </motion.div>

            {/* Main Grid Layout - Consolidated for consistent spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Row 1: Primary Action (2 col) + Credits (1 col) */}
                <motion.div variants={item} className="md:col-span-2">
                    <PrimaryActionCard />
                </motion.div>

                <motion.div variants={item} className="md:col-span-1 h-full">
                    <CreditsCard />
                </motion.div>

                {/* Row 2: Continue (1) + Next (1) + Notebooks (1) */}
                <motion.div variants={item} className="h-full">
                    <ContinueLearningCard />
                </motion.div>

                <motion.div variants={item} className="h-full">
                    <NextStepCard />
                </motion.div>

                <motion.div variants={item} className="h-full">
                    <RecentNotebooksList />
                </motion.div>

                {/* Row 3: Recent Activity (2) + Community (1) */}
                <motion.div variants={item} className="md:col-span-2 h-full">
                    <RecentActivityList />
                </motion.div>

                <motion.div variants={item} className="h-full bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-[#1E2A5E] font-dm-sans mb-2">Community Highlights</h3>
                    <p className="text-sm text-gray-600 mb-4">See what other students in <br /><strong>Computer Science</strong> are discussing.</p>
                    <button className="text-indigo-600 font-medium text-sm hover:underline">View Community →</button>
                </motion.div>
            </div>
        </motion.div>
    );
}
