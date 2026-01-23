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



import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotebooksDashboard() {
    const [notebooks, setNotebooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotebooks = async () => {
            try {
                const res = await axios.get('/api/notebooks');
                if (res.data.success) {
                    setNotebooks(res.data.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchNotebooks();
    }, []);

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
                <h2 className="text-lg font-bold text-[#1E2A5E] mb-4">My Notebooks</h2>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 rounded-3xl animate-pulse" />)}
                    </div>
                ) : notebooks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                            <BookOpen className="text-indigo-500" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#1E2A5E] mb-2">No notebooks yet</h3>
                        <p className="text-gray-500 mb-6">Create your first notebook to start documenting your research.</p>
                        <Link href="/dashboard/chat" className="px-6 py-2.5 bg-[#1E2A5E] text-white rounded-xl font-medium hover:bg-black transition-colors">
                            Start Research Chat
                        </Link>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {notebooks.map((notebook: any) => (
                            <Link href={`/dashboard/notebooks/${notebook._id}`} key={notebook._id} className="block break-inside-avoid">
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="p-6 rounded-3xl transition-all hover:shadow-lg relative group bg-white border border-gray-100"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-600">
                                            {notebook.subject || 'General'}
                                        </span>
                                        <button className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                                            <FileText size={14} className="opacity-50" />
                                        </button>
                                    </div>

                                    <h3 className="text-xl font-bold text-[#1E2A5E] mb-6 leading-tigher line-clamp-2">
                                        {notebook.title}
                                    </h3>

                                    <div className="flex items-center justify-between text-xs font-medium text-gray-500 border-t border-black/5 pt-4">
                                        <span>{new Date(notebook.createdAt).toLocaleDateString()}</span>
                                        <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center">
                                            <FileText size={12} />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
