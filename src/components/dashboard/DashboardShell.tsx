"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar"; // We'll update this next
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardShell({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Desktop collapse state
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
    const pathname = usePathname();

    // Auto-close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[#F8F9FB] font-dm-sans flex">
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar (Desktop + Mobile Wrapper) */}
            <Sidebar
                isCollapsed={!isSidebarOpen}
                isMobileOpen={isMobileMenuOpen}
                toggleCollapse={() => setSidebarOpen(!isSidebarOpen)}
                closeMobile={() => setMobileMenuOpen(false)}
            />

            {/* Main Content */}
            <motion.div
                layout
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out overflow-x-hidden ${isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
                    }`}
            >
                {/* Mobile Header / Top Bar */}
                <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-100 lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-[#1E2A5E]">ReedAI</span>
                    <div className="w-8" /> {/* Spacer for centering if needed */}
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-full mx-auto overflow-x-hidden">
                    {children}
                </main>
            </motion.div>
        </div>
    );
}
