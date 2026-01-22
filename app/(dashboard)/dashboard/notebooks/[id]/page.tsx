"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MoreHorizontal, Share, ChevronRight, File, Users, Link as LinkIcon, Lock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotebookDetail() {
    const params = useParams();
    const id = params.id;

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10 font-dm-sans flex flex-col">

            {/* Header / Breadcrumbs */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                    <Link href="/dashboard/notebooks" className="hover:text-[#1E2A5E] transition-colors flex items-center gap-1">
                        <ArrowLeft size={16} /> Notebooks
                    </Link>
                    <ChevronRight size={14} className="opacity-30" />
                    <span>Reviews</span>
                    <ChevronRight size={14} className="opacity-30" />
                    <span className="text-[#1E2A5E] font-bold flex items-center gap-2">
                        <File size={14} /> My Review Document
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 mr-2">
                        {[1, 2].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                                AH
                            </div>
                        ))}
                    </div>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors text-gray-500">
                        <MoreHorizontal size={20} />
                    </button>
                    <button className="bg-[#1E2A5E] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-900/10 hover:scale-105 transition-all flex items-center gap-2">
                        <Share size={16} /> Publish
                    </button>
                </div>
            </div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-8 flex-1">

                {/* Center Content (Paper) */}
                <div className="flex-1 bg-white rounded-3xl p-8 lg:p-16 shadow-sm min-h-[800px]">
                    {/* Hero Image Placeholder */}
                    <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                        <File size={32} className="text-green-500" />
                    </div>

                    <h1 className="text-4xl font-bold text-[#1E2A5E] mb-2 tracking-tight">My Review Document</h1>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-8">
                        <span>Created 17 days ago</span>
                        <span>•</span>
                        <span>Last modified 17 hours ago</span>
                    </div>

                    <div className="flex items-center gap-2 mb-10">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-xs font-bold">Document Tag</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold">Notes</span>
                        <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-bold">Review Doc</span>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-600 space-y-8">
                        <h2 className="text-2xl font-bold text-[#1E2A5E]">Sub Title here</h2>

                        <p>
                            Design Thinking: Design, at its core, is about solving problems and enhancing user experiences.
                            Design thinking, a human-centered approach, emphasizes empathy, collaboration, and prototyping
                            to create products that truly resonate with users.
                        </p>

                        <p>
                            Technology, with its power to collect and analyze data, complements this process by providing
                            valuable insights into user behavior and preferences. The design thinking process, when fueled
                            by technology, leads to more intuitive, user-friendly, and aesthetically pleasing products.
                        </p>

                        {/* Callout Box */}
                        <div className="bg-gray-50 border-l-4 border-[#1E2A5E] p-6 rounded-r-xl my-8">
                            <p className="font-medium text-gray-800 italic">
                                "In today's fast-paced and ever-evolving world, the fusion of design and technology plays a
                                pivotal role in shaping the products we use daily. From smartphones to automobiles, this synergy
                                has transformed the way we interact with and experience the world around us."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80 space-y-8">

                    {/* Linked Docs */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#1E2A5E] mb-4 flex items-center gap-2">
                            <LinkIcon size={16} /> Linked Docs
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                <File size={18} className="text-gray-400 group-hover:text-indigo-500" />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 border-b border-gray-200 pb-0.5">Name_of_document_here.pdf</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                                <File size={18} className="text-gray-400 group-hover:text-indigo-500" />
                                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 border-b border-gray-200 pb-0.5">Another_thing_here.pdf</span>
                            </div>
                        </div>
                    </div>

                    {/* Contributors */}
                    {/* Contributors - Commented out as requested
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#1E2A5E] mb-4 flex items-center gap-2">
                            <Users size={16} /> Contributors
                        </h3>
                        <div className="space-y-4">
                            {["Beth Lemke", "Brittany Fisher", "Gertrude Gottlieb Jr.", "Alfredo Prosacco"].map((name, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                                        
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    */}

                </div>
            </div>
        </div>
    );
}
