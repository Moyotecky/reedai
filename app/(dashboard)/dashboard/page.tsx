"use client";

import { motion, Variants } from "framer-motion";
import WelcomeHeader from "@/components/dashboard/widgets/WelcomeHeader";
import PrimaryActionCard from "@/components/dashboard/widgets/PrimaryActionCard";
import CreditsCard from "@/components/dashboard/widgets/CreditsCard";
import ContinueLearningCard from "@/components/dashboard/widgets/ContinueLearningCard";
import NextStepCard from "@/components/dashboard/widgets/NextStepCard";
import RecentNotebooksList from "@/components/dashboard/widgets/RecentNotebooksList";
import RecentActivityList from "@/components/dashboard/widgets/RecentActivityList";

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
            <motion.div variants={item}>
                <WelcomeHeader username="Alex" />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. Primary Action (Spans 2 columns) */}
                <motion.div variants={item} className="lg:col-span-2">
                    <PrimaryActionCard />
                </motion.div>

                {/* 3. Credits (Spans 1 column) */}
                <motion.div variants={item} className="lg:col-span-1 h-full">
                    <CreditsCard />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 4. Continue Learning */}
                <motion.div variants={item} className="h-full">
                    <ContinueLearningCard />
                </motion.div>

                {/* 5. Suggested Next Step */}
                <motion.div variants={item} className="h-full">
                    <NextStepCard />
                </motion.div>

                {/* 6. Recent Notebooks */}
                <motion.div variants={item} className="h-full">
                    <RecentNotebooksList />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7. Recent Activity */}
                <motion.div variants={item} className="lg:col-span-2 h-full">
                    <RecentActivityList />
                </motion.div>
                {/* 8. Community / Optional placeholder */}
                <motion.div variants={item} className="h-full bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-[#1E2A5E] font-dm-sans mb-2">Community Highlights</h3>
                    <p className="text-sm text-gray-600 mb-4">See what other students in <br /><strong>Computer Science</strong> are discussing.</p>
                    <button className="text-indigo-600 font-medium text-sm hover:underline">View Community →</button>
                </motion.div>
            </div>
        </motion.div>
    );
}
