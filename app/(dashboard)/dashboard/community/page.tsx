"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Inbox, Plus, MessageSquare, Heart, Share2, GraduationCap, Calculator, ChevronRight, X, Clock } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// --- Types ---
interface Post {
    id: string;
    author: { name: string; org: string; avatar: string };
    topic: string;
    category: string;
    title: string;
    preview: string;
    image?: string;
    likes: number;
    comments: number;
    createdAt: string;
}

interface Network {
    id: string;
    name: string;
    color: string;
}

// --- Mock Data ---
const NETWORKS: Network[] = [
    { id: "1", name: "Math Study Group", color: "bg-purple-500" },
    { id: "2", name: "Exam Prep Hub", color: "bg-orange-500" },
    { id: "3", name: "Calculus Masters", color: "bg-blue-500" },
];

const TOPICS = ["Linear Algebra", "Calculus", "Statistics", "Differential Equations", "Discrete Math"];

const INITIAL_POSTS: Post[] = [
    {
        id: "1",
        author: { name: "Sarah Chen", org: "MIT", avatar: "SC" },
        topic: "Linear Algebra",
        category: "Study Tips",
        title: "Balancing Speed and Precision in Exam Problem Solving",
        preview: "In the fast-paced world of mathematics exams, finding harmony between speed and precision is key...",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
        likes: 42,
        comments: 12,
        createdAt: "2 hours ago"
    },
    {
        id: "2",
        author: { name: "Alex Johnson", org: "Stanford", avatar: "AJ" },
        topic: "Calculus",
        category: "Question",
        title: "How do you approach integration by parts?",
        preview: "I keep running into integrals that cycle back to the original. What's the trick?",
        likes: 28,
        comments: 8,
        createdAt: "5 hours ago"
    },
    {
        id: "3",
        author: { name: "Maria Garcia", org: "UCLA", avatar: "MG" },
        topic: "Statistics",
        category: "Resource",
        title: "My complete notes on Probability Distributions",
        preview: "After struggling with probability distributions, I created comprehensive notes...",
        likes: 156,
        comments: 32,
        createdAt: "Yesterday"
    },
    {
        id: "4",
        author: { name: "James Wilson", org: "Berkeley", avatar: "JW" },
        topic: "Differential Equations",
        category: "Discussion",
        title: "What's the most intuitive way to understand Laplace Transforms?",
        preview: "I've been trying to wrap my head around Laplace transforms...",
        likes: 89,
        comments: 24,
        createdAt: "2 days ago"
    }
];

// --- Components ---

function CreatePostDrawer({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (title: string, content: string, topic: string) => void }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState(TOPICS[0]);

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) return;
        onSubmit(title, content, topic);
        setTitle("");
        setContent("");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#1E2A5E]">Create Post</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                                    <select
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10"
                                    >
                                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="What's your question or topic?"
                                        className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Share your thoughts, questions, or resources..."
                                        rows={6}
                                        className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!title.trim() || !content.trim()}
                                    className={clsx(
                                        "w-full py-3 rounded-xl font-medium transition-all",
                                        title.trim() && content.trim()
                                            ? "bg-[#1E2A5E] text-white hover:bg-black"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    Post to Community
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function CommunitySidebar({ activeTab, onTabChange, onCreateClick }: { activeTab: string; onTabChange: (tab: string) => void; onCreateClick: () => void }) {
    return (
        <aside className="w-64 shrink-0 space-y-6">
            {/* Create Button */}
            <button
                onClick={onCreateClick}
                className="w-full flex items-center justify-between px-4 py-3 bg-[#1E2A5E] text-white font-medium rounded-xl hover:bg-black transition-colors shadow-lg"
            >
                Create <Plus size={18} />
            </button>

            {/* Navigation */}
            <nav className="space-y-1">
                {[
                    { id: "home", label: "Home", icon: <Home size={18} />, comingSoon: false },
                    { id: "discover", label: "Discover", icon: <Search size={18} />, comingSoon: false },
                    { id: "inbox", label: "Inbox", icon: <Inbox size={18} />, comingSoon: true },
                ].map(item => (
                    <button
                        key={item.id}
                        onClick={() => !item.comingSoon && onTabChange(item.id)}
                        className={clsx(
                            "w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all",
                            activeTab === item.id
                                ? "bg-[#1E2A5E] text-white"
                                : item.comingSoon
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-600 hover:bg-gray-100"
                        )}
                    >
                        <span className="flex items-center gap-3">{item.icon} {item.label}</span>
                        {item.comingSoon && <span className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded">Soon</span>}
                    </button>
                ))}
            </nav>

            {/* Networks */}
            <div>
                <div className="flex items-center justify-between px-2 mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Your Networks</span>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Soon</span>
                </div>
                <div className="space-y-1 opacity-50">
                    {NETWORKS.map(network => (
                        <div key={network.id} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700">
                            <div className={clsx("w-3 h-3 rounded", network.color)} />
                            {network.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Topics */}
            <div>
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wide px-2 mb-3">Topics</span>
                <div className="space-y-1">
                    {TOPICS.map(topic => (
                        <button
                            key={topic}
                            onClick={() => onTabChange(topic)}
                            className={clsx(
                                "w-full text-left px-4 py-2 text-sm rounded-lg transition-colors",
                                activeTab === topic
                                    ? "bg-purple-50 text-purple-700 font-medium"
                                    : "text-gray-600 hover:text-[#1E2A5E] hover:bg-gray-50"
                            )}
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
}

function PostCard({ post, index }: { post: Post; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full min-w-0"
        >
            <Link href={`/dashboard/community/${post.id}`} className="block">
                <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all group">
                    <div className="p-4 sm:p-5 pb-3">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                {post.author.avatar}
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-gray-900 text-sm truncate">{post.author.name}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <GraduationCap size={12} /> {post.author.org}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-lg flex items-center gap-1 shrink-0">
                                <Calculator size={12} /> {post.topic}
                            </span>
                        </div>

                        <h3 className="font-bold text-[#1E2A5E] text-base sm:text-lg leading-tight group-hover:text-purple-700 transition-colors break-words">
                            {post.title}
                        </h3>
                    </div>

                    {post.image && (
                        <div className="px-4 sm:px-5">
                            <div className="rounded-xl overflow-hidden">
                                <img src={post.image} alt="" className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    )}

                    <div className="p-4 sm:p-5 pt-3">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{post.preview}</p>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                            <span className="flex items-center gap-1.5"><Heart size={16} /> {post.likes}</span>
                            <span className="flex items-center gap-1.5"><MessageSquare size={16} /> {post.comments}</span>
                            <span className="flex items-center gap-1.5 ml-auto"><Share2 size={16} /></span>
                        </div>
                    </div>
                </article>
            </Link>
        </motion.div>
    );
}

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState("home");
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
    const [showCreateDrawer, setShowCreateDrawer] = useState(false);

    // Filter posts based on active tab (topic)
    const filteredPosts = TOPICS.includes(activeTab)
        ? posts.filter(p => p.topic === activeTab)
        : posts;

    const handleCreatePost = (title: string, content: string, topic: string) => {
        const newPost: Post = {
            id: Date.now().toString(),
            author: { name: "You", org: "Your University", avatar: "YU" },
            topic,
            category: "Discussion",
            title,
            preview: content.substring(0, 120) + "...",
            likes: 0,
            comments: 0,
            createdAt: "Just now"
        };
        setPosts(prev => [newPost, ...prev]);
    };

    // Simulate real-time new post
    useEffect(() => {
        const timer = setTimeout(() => {
            const newPost: Post = {
                id: "realtime-" + Date.now(),
                author: { name: "New User", org: "Princeton", avatar: "NU" },
                topic: "Calculus",
                category: "Question",
                title: "Anyone struggling with epsilon-delta proofs?",
                preview: "I understand the concept but writing formal proofs is challenging...",
                likes: 0,
                comments: 0,
                createdAt: "Just now"
            };
            setPosts(prev => [newPost, ...prev]);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FB] font-dm-sans overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-10 max-w-full">
                <div className="flex gap-4 lg:gap-8 max-w-full">

                    {/* Sidebar (Desktop) */}
                    <div className="hidden lg:block">
                        <CommunitySidebar
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            onCreateClick={() => setShowCreateDrawer(true)}
                        />
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 max-w-full overflow-hidden">
                        {/* Mobile Create Button */}
                        <div className="lg:hidden mb-4 max-w-full">
                            <button
                                onClick={() => setShowCreateDrawer(true)}
                                className="w-full max-w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1E2A5E] text-white font-medium rounded-xl"
                            >
                                <Plus size={18} /> Create Post
                            </button>
                        </div>

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 lg:mb-6 overflow-hidden">
                            <span className="hover:text-[#1E2A5E] cursor-pointer shrink-0">Home</span>
                            <ChevronRight size={14} className="opacity-40 shrink-0" />
                            <span className="text-[#1E2A5E] font-medium truncate">
                                {TOPICS.includes(activeTab) ? activeTab : activeTab === "discover" ? "Discover" : "Feed"}
                            </span>
                        </div>

                        {/* Topic Pills (Mobile Scrollable) */}
                        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
                            <button
                                onClick={() => setActiveTab("home")}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0",
                                    activeTab === "home" ? "bg-[#1E2A5E] text-white" : "bg-white border border-gray-200 text-gray-600"
                                )}
                            >
                                All
                            </button>
                            {TOPICS.map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => setActiveTab(topic)}
                                    className={clsx(
                                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0",
                                        activeTab === topic ? "bg-[#1E2A5E] text-white" : "bg-white border border-gray-200 text-gray-600"
                                    )}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>

                        {/* Discover Tab Content */}
                        {activeTab === "discover" && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Search size={28} className="text-purple-500" />
                                </div>
                                <h2 className="text-xl font-bold text-[#1E2A5E] mb-2">Discover New Topics</h2>
                                <p className="text-gray-500 mb-6">Explore trending discussions and find study groups</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {TOPICS.map(topic => (
                                        <button
                                            key={topic}
                                            onClick={() => setActiveTab(topic)}
                                            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-purple-300 hover:text-purple-600 transition-colors"
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Posts Grid */}
                        {activeTab !== "discover" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-full overflow-hidden">
                                <AnimatePresence>
                                    {filteredPosts.map((post, i) => (
                                        <PostCard key={post.id} post={post} index={i} />
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Empty State */}
                        {activeTab !== "discover" && filteredPosts.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No posts in this topic yet.</p>
                                <button
                                    onClick={() => setShowCreateDrawer(true)}
                                    className="mt-4 px-6 py-2 bg-[#1E2A5E] text-white rounded-xl font-medium"
                                >
                                    Be the first to post
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Create Post Drawer */}
            <CreatePostDrawer
                isOpen={showCreateDrawer}
                onClose={() => setShowCreateDrawer(false)}
                onSubmit={handleCreatePost}
            />
        </div>
    );
}
