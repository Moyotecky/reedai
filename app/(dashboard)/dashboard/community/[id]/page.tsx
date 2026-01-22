"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, MessageSquare, Share2, MoreHorizontal, Send, ChevronDown, ChevronUp, GraduationCap, Calculator, Award } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import clsx from "clsx";

// --- Types ---
interface Comment {
    id: string;
    author: { name: string; avatar: string };
    content: string;
    likes: number;
    createdAt: string;
    replies?: Comment[];
}

interface Contributor {
    name: string;
    avatar: string;
    posts: number;
}

// --- Mock Data ---
const POST = {
    id: "1",
    author: { name: "Sarah Chen", org: "MIT", avatar: "SC" },
    topic: "Linear Algebra",
    category: "Study Tips",
    title: "How would you explain eigenvalues to someone who's never seen them?",
    content: `Imagine your friend asks you about linear algebra and why you always have your notebook with eigenvalue problems. In one sentence, how would you describe what eigenvalues are and what we do here in our study group?

For example, if I were a member of a discussion forum on Volkswagen cars - I'd describe it as "A community of Volkswagen owners discussing every detail on their beloved cars".

It may not be as appealing, that's why I'm asking you for advice and ideas.`,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    likes: 42,
    comments: 32,
    createdAt: "3 days ago"
};

const COMMENTS: Comment[] = [
    {
        id: "1",
        author: { name: "Alex Johnson", avatar: "AJ" },
        content: "A community of math enthusiasts who explore the hidden patterns in linear transformations. Eigenvalues tell us which directions stay stable!",
        likes: 16,
        createdAt: "3h",
        replies: [
            {
                id: "1a",
                author: { name: "Sarah Chen", avatar: "SC" },
                content: "Very accurate. I love how you framed it as 'hidden patterns'!",
                likes: 3,
                createdAt: "3h"
            }
        ]
    },
    {
        id: "2",
        author: { name: "Maria Garcia", avatar: "MG" },
        content: "I would never say I have too much time, actually I hardly have any. But thanks to this study group I do my best to find a while each day to find something pretty, interesting or important for me, what is worth to be in the picture.",
        likes: 8,
        createdAt: "3 min"
    },
    {
        id: "3",
        author: { name: "James Wilson", avatar: "JW" },
        content: "Eigenvalues are like asking: 'When I apply this transformation, what stays pointing in the same direction?' The answer reveals so much about the structure.",
        likes: 24,
        createdAt: "1h"
    }
];

const TOP_CONTRIBUTORS: Contributor[] = [
    { name: "Sarah Chen", avatar: "SC", posts: 103 },
    { name: "Alex Johnson", avatar: "AJ", posts: 84 },
    { name: "Maria Garcia", avatar: "MG", posts: 79 },
    { name: "James Wilson", avatar: "JW", posts: 76 },
    { name: "Emily Davis", avatar: "ED", posts: 72 },
    { name: "Michael Brown", avatar: "MB", posts: 69 },
    { name: "Lisa Anderson", avatar: "LA", posts: 42 },
    { name: "David Lee", avatar: "DL", posts: 32 },
];

const UNANSWERED = [
    { author: "ponzu", title: "The only thing worse than being a GWC is being a GWoC: Guy Without a Camera" },
    { author: "Sarah Chen", title: "If there was one thing you could change about calculus courses..." },
];

// --- Components ---

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
    const [showReplies, setShowReplies] = useState(true);
    const [liked, setLiked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={clsx("py-4", depth > 0 && "ml-6 sm:ml-12 border-l-2 border-gray-100 pl-4 sm:pl-6")}
        >
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {comment.author.avatar}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-sm">{comment.author.name}</span>
                        <span className="text-xs text-gray-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-2">{comment.content}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <button
                            onClick={() => setLiked(!liked)}
                            className={clsx("hover:text-pink-500 transition-colors", liked && "text-pink-500")}
                        >
                            {liked ? "Liked" : "Like"}
                        </button>
                        <button className="hover:text-blue-500 transition-colors">Reply</button>
                        <span>{comment.likes + (liked ? 1 : 0)} likes</span>
                    </div>
                </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-2">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 ml-11 mb-2"
                    >
                        {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        {showReplies ? "Hide" : "Show"} {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"}
                    </button>
                    <AnimatePresence>
                        {showReplies && comment.replies.map(reply => (
                            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}

export default function PostDetailPage() {
    const params = useParams();
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState<Comment[]>(COMMENTS);
    const [liked, setLiked] = useState(false);

    const handlePostComment = () => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            author: { name: "You", avatar: "YU" },
            content: newComment,
            likes: 0,
            createdAt: "Just now"
        };

        setComments(prev => [comment, ...prev]);
        setNewComment("");
    };

    // Simulate real-time new comment
    useEffect(() => {
        const timer = setTimeout(() => {
            const newReply: Comment = {
                id: "realtime-" + Date.now(),
                author: { name: "Live User", avatar: "LU" },
                content: "Just joined this discussion! Great insights everyone.",
                likes: 0,
                createdAt: "Just now"
            };
            setComments(prev => [...prev, newReply]);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-4 sm:p-6 lg:p-10 font-dm-sans overflow-x-hidden">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto">

                {/* Main Content */}
                <main className="flex-1 w-full lg:max-w-3xl">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/dashboard/community" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
                            <span className="hover:text-[#1E2A5E] cursor-pointer">Back to Community</span>
                            <span className="text-blue-500 cursor-pointer">Mute</span>
                            <span className="text-blue-500 cursor-pointer">Edit</span>
                            <span className="text-gray-400 cursor-pointer">Report</span>
                        </div>
                    </div>

                    {/* Post Content */}
                    <article className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6">
                        {/* Author */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                                {POST.author.avatar}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{POST.author.name}</p>
                                <p className="text-sm text-gray-400 flex items-center gap-1">
                                    <GraduationCap size={14} /> {POST.author.org} • {POST.createdAt}
                                </p>
                            </div>
                        </div>

                        {/* Category */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-lg flex items-center gap-1.5">
                                <Calculator size={14} /> {POST.topic}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1E2A5E] mb-6 leading-tight">
                            {POST.title}
                        </h1>

                        {/* Image */}
                        {POST.image && (
                            <div className="rounded-xl overflow-hidden mb-6">
                                <img src={POST.image} alt="" className="w-full h-64 object-cover" />
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-4 mb-8">
                            {POST.content.split('\n\n').map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={clsx(
                                    "flex items-center gap-2 text-sm font-medium transition-colors",
                                    liked ? "text-pink-500" : "text-gray-500 hover:text-pink-500"
                                )}
                            >
                                <Heart size={18} fill={liked ? "currentColor" : "none"} /> {POST.likes + (liked ? 1 : 0)}
                            </button>
                            <span className="flex items-center gap-2 text-sm text-gray-500">
                                <MessageSquare size={18} /> {comments.length} comments
                            </span>
                            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors ml-auto">
                                <Share2 size={18} /> Share
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    </article>

                    {/* Comment Input */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold shrink-0">
                                YU
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder={`Type here to reply to ${POST.author.name}...`}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10 focus:border-[#1E2A5E]"
                                    rows={3}
                                />
                                <button
                                    onClick={handlePostComment}
                                    disabled={!newComment.trim()}
                                    className={clsx(
                                        "mt-3 px-5 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2",
                                        newComment.trim()
                                            ? "bg-[#1E2A5E] text-white hover:bg-black"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    Post comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comments */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">{comments.length} comments</h3>
                        <div className="divide-y divide-gray-50">
                            {comments.map(comment => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="hidden lg:block w-72 space-y-6">
                    {/* Top Contributors */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                            <Award size={18} className="text-amber-500" /> Top Contributors
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">People who started the most discussions on Talks.</p>

                        <div className="space-y-3">
                            {TOP_CONTRIBUTORS.slice(0, 8).map((c, i) => (
                                <div key={c.name} className="flex items-center gap-3 group cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                                        {c.avatar}
                                    </div>
                                    <span className="flex-1 text-sm font-medium text-gray-700 group-hover:text-[#1E2A5E] truncate">{c.name}</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <MessageSquare size={12} /> {c.posts}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Unanswered Talks */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-900 mb-1">Unanswered Talks</h3>
                        <p className="text-xs text-gray-400 mb-4">Discussions with no comments. Be first to post a comment.</p>

                        <div className="space-y-4">
                            {UNANSWERED.map((item, i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">
                                            {item.author[0].toUpperCase()}
                                        </div>
                                        <span className="text-xs text-gray-500">{item.author} <span className="text-gray-300">posted</span></span>
                                    </div>
                                    <p className="text-sm text-gray-700 group-hover:text-[#1E2A5E] leading-snug">{item.title}</p>
                                    <p className="text-xs text-gray-400 mt-1">0 comments</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
