"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutGrid,
    Mic,
    MessageSquare,
    BookOpen,
    CheckSquare,
    UploadCloud,
    History,
    Users,
    CreditCard,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft,
    PanelLeftClose,
    PanelLeftOpen
} from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_ITEMS = [
    {
        category: "Primary",
        items: [
            { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
            { label: "Tutor", href: "/dashboard/tutor", icon: Mic },
            { label: "Chat", href: "/dashboard/chat", icon: MessageSquare },
            { label: "Notebooks", href: "/dashboard/notebooks", icon: BookOpen },
            { label: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
        ]
    },
    {
        category: "Study Resources",
        items: [
            { label: "Uploads", href: "/dashboard/uploads", icon: UploadCloud },
            { label: "Call History", href: "/dashboard/history", icon: History },
        ]
    },
    {
        category: "Community",
        items: [
            { label: "Community", href: "/dashboard/community", icon: Users },
        ]
    },
    {
        category: "Account & Billing",
        items: [
            { label: "Credits", href: "/dashboard/credits", icon: CreditCard },
            { label: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
    }
];

interface SidebarProps {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleCollapse: () => void;
    closeMobile: () => void;
}

const Sidebar = ({ isCollapsed, isMobileOpen, toggleCollapse, closeMobile }: SidebarProps) => {
    const pathname = usePathname();

    const sidebarClasses = clsx(
        "fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out",
        // Desktop width
        isCollapsed ? "lg:w-20" : "lg:w-64",
        // Mobile transform
        isMobileOpen ? "translate-x-0 w-64 shadow-2xl" : "-translate-x-full lg:translate-x-0"
    );

    return (
        <motion.aside className={sidebarClasses}>
            {/* Logo Area */}
            <div className={clsx("h-16 flex items-center", isCollapsed ? "justify-center" : "px-6 justify-between")}>
                {!isCollapsed ? (
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="text-xl font-bold font-dm-sans tracking-tight text-[#1E2A5E]">ReedAI</span>
                    </Link>
                ) : (
                    <Link href="/dashboard">
                        <span className="text-xl font-bold text-[#1E2A5E]">R</span>
                    </Link>
                )}

                {/* Desktop Collapse Toggle */}
                <button
                    onClick={toggleCollapse}
                    className="hidden lg:flex p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 space-y-8 overflow-y-auto overflow-x-hidden scrollbar-thin">
                {SIDEBAR_ITEMS.map((group) => (
                    <div key={group.category}>
                        {!isCollapsed && (
                            <h3 className="px-6 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest opacity-80 decoration-none">
                                {group.category}
                            </h3>
                        )}
                        <ul className="space-y-1 px-3">
                            {group.items.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className={clsx(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg text-[15px] font-medium transition-all group relative",
                                                isActive
                                                    ? "bg-[#F3F5F9] text-[#1E2A5E]"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                                isCollapsed && "justify-center"
                                            )}
                                            title={isCollapsed ? item.label : undefined}
                                        >
                                            <item.icon
                                                size={20}
                                                className={clsx(
                                                    "shrink-0",
                                                    isActive ? "text-[#1E2A5E]" : "text-gray-400 group-hover:text-gray-600"
                                                )}
                                            />
                                            {!isCollapsed && (
                                                <span className="whitespace-nowrap opacity-100 transition-opacity duration-200">
                                                    {item.label}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {isCollapsed && <div className="mx-4 my-4 h-[1px] bg-gray-100" />}
                    </div>
                ))}
            </nav>

            {/* Footer Items */}
            <div className="p-4 mt-auto border-t border-gray-50 space-y-1 bg-white">
                <Link
                    href="/help"
                    className={clsx(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors",
                        isCollapsed && "justify-center"
                    )}
                >
                    <HelpCircle size={20} className="text-gray-400" />
                    {!isCollapsed && <span>Help</span>}
                </Link>
                <button
                    className={clsx(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors text-left",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut size={20} />
                    {!isCollapsed && <span>Log out</span>}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;
