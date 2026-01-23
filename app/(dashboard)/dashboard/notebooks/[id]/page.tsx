"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MoreHorizontal, Share, ChevronRight, File, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function NotebookDetail() {
    const params = useParams();
    const id = params.id as string;

    const [notebook, setNotebook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Editable States
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [content]);

    useEffect(() => {
        const fetchNotebook = async () => {
            try {
                const res = await axios.get(`/api/notebooks/${id}`);
                if (res.data.success) {
                    setNotebook(res.data.data);
                    setTitle(res.data.data.title);
                    setContent(res.data.data.content);
                } else {
                    setError("Notebook not found");
                }
            } catch (e) {
                setError("Error loading notebook");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchNotebook();
    }, [id]);

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put(`/api/notebooks/${id}`, {
                title,
                content
            });
            // Optional: Show toast success
        } catch (e) {
            console.error("Save failed", e);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-600" size={32} />
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
            <Link href="/dashboard/notebooks" className="mt-4 text-indigo-600 hover:underline">Go back</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10 font-dm-sans flex flex-col">

            {/* Header / Breadcrumbs */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Link href="/dashboard/notebooks" className="hover:text-[#1E2A5E] transition-colors flex items-center gap-1">
                        <ArrowLeft size={16} /> Notebooks
                    </Link>
                    <ChevronRight size={14} className="opacity-30" />
                    <span className="text-[#1E2A5E] font-bold flex items-center gap-2 truncate max-w-[200px]">
                        <File size={14} /> {title || "Untitled"}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="text-xs text-gray-400 font-medium mr-2">
                        {saving ? "Saving..." : "Saved"}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-[#1E2A5E] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-900/10 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-8 flex-1">

                {/* Center Content (Paper) */}
                <div className="flex-1 bg-white rounded-3xl p-8 lg:p-16 shadow-sm min-h-[800px] border border-gray-100">

                    {/* Editable Title */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-4xl font-bold text-[#1E2A5E] mb-6 tracking-tight border-none focus:ring-0 placeholder:text-gray-300"
                        placeholder="Untitled Notebook"
                    />

                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-8">
                        <span>Created {new Date(notebook.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Last modified {new Date(notebook.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-10">
                        {/* Tags (Hardcoded for now / future feature) */}
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold">{notebook.subject || 'General'}</span>
                    </div>

                    {/* Editor Area (Write/Edit functionality) */}
                    <textarea
                        ref={textareaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Start typying your notes here..."
                        className="w-full min-h-[500px] resize-none border-none focus:ring-0 text-gray-700 text-lg leading-relaxed p-0 placeholder:text-gray-300"
                    />
                </div>

                {/* Right Sidebar (Simplified) */}
                <div className="w-full lg:w-80 space-y-8 hidden lg:block">
                    {/* Info Widget */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#1E2A5E] mb-4 text-sm uppercase tracking-wide">
                            Notebook Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Subject</label>
                                <p className="text-sm font-medium text-gray-700">{notebook.subject || 'Unassigned'}</p>
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 font-bold uppercase block mb-1">Owner</label>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">ME</div>
                                    <span className="text-sm font-medium text-gray-700">You</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
