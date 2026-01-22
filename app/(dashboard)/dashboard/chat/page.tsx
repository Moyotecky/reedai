"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload, Paperclip, Send, RefreshCw, Bot, User, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    type?: "text" | "table";
    tableData?: { headers: string[]; rows: string[][] };
}

// Mock AI responses related to Math
const MOCK_RESPONSES: Record<string, Message> = {
    default: {
        id: "1",
        role: "assistant",
        content: "I can help you with various math topics! Try asking about calculus, linear algebra, differential equations, or any specific problem you're working on.",
        type: "text"
    },
    eigenvalues: {
        id: "2",
        role: "assistant",
        content: "Here's a summary of key concepts about Eigenvalues and Eigenvectors:",
        type: "table",
        tableData: {
            headers: ["Concept", "Definition", "Formula", "Key Property"],
            rows: [
                ["Eigenvalue (λ)", "Scalar that scales the eigenvector", "Av = λv", "det(A - λI) = 0"],
                ["Eigenvector (v)", "Non-zero vector unchanged in direction", "(A - λI)v = 0", "Spans eigenspace"],
                ["Characteristic Polynomial", "Polynomial whose roots are eigenvalues", "det(A - λI)", "Degree = n"],
                ["Diagonalization", "A = PDP⁻¹ where D is diagonal", "P = [v₁ v₂ ... vₙ]", "Requires n independent eigenvectors"],
                ["Trace", "Sum of eigenvalues", "tr(A) = Σλᵢ", "Also sum of diagonal entries"],
                ["Determinant", "Product of eigenvalues", "det(A) = Πλᵢ", "Zero if singular"],
            ]
        }
    },
    calculus: {
        id: "3",
        role: "assistant",
        content: "Here's a quick reference for common Calculus formulas:",
        type: "table",
        tableData: {
            headers: ["Rule/Formula", "Expression", "Result", "Notes"],
            rows: [
                ["Power Rule", "d/dx[xⁿ]", "nxⁿ⁻¹", "n can be any real number"],
                ["Product Rule", "d/dx[f·g]", "f'g + fg'", "For products of functions"],
                ["Chain Rule", "d/dx[f(g(x))]", "f'(g(x))·g'(x)", "Composite functions"],
                ["Integration by Parts", "∫u dv", "uv - ∫v du", "Choose u wisely (LIATE)"],
                ["Fundamental Theorem", "∫ₐᵇ f(x)dx", "F(b) - F(a)", "F is antiderivative of f"],
                ["L'Hôpital's Rule", "lim f/g (0/0 form)", "lim f'/g'", "Apply when indeterminate"],
            ]
        }
    },
    diffeq: {
        id: "4",
        role: "assistant",
        content: "Here's a breakdown of First-Order Differential Equations:\n\n**Separable Equations**: dy/dx = f(x)g(y) → ∫(1/g(y))dy = ∫f(x)dx\n\n**Linear First-Order**: dy/dx + P(x)y = Q(x)\nSolution: y = (1/μ)∫μQ(x)dx where μ = e^(∫P(x)dx)\n\n**Exact Equations**: M(x,y)dx + N(x,y)dy = 0 is exact if ∂M/∂y = ∂N/∂x\n\n**Tip**: Always check if the equation is separable first—it's usually the easiest method!",
        type: "text"
    }
};

function getAIResponse(query: string): Message {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("eigen") || lowerQuery.includes("vector") || lowerQuery.includes("matrix")) {
        return { ...MOCK_RESPONSES.eigenvalues, id: Date.now().toString() };
    }
    if (lowerQuery.includes("calculus") || lowerQuery.includes("derivative") || lowerQuery.includes("integral")) {
        return { ...MOCK_RESPONSES.calculus, id: Date.now().toString() };
    }
    if (lowerQuery.includes("differential") || lowerQuery.includes("ode") || lowerQuery.includes("equation")) {
        return { ...MOCK_RESPONSES.diffeq, id: Date.now().toString() };
    }
    return { ...MOCK_RESPONSES.default, id: Date.now().toString() };
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [query, setQuery] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!query.trim() || isGenerating) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: query,
            type: "text"
        };
        setMessages(prev => [...prev, userMessage]);
        setQuery("");
        setIsGenerating(true);

        setTimeout(() => {
            const aiResponse = getAIResponse(userMessage.content);
            setMessages(prev => [...prev, aiResponse]);
            setIsGenerating(false);
        }, 1500);
    };

    const hasMessages = messages.length > 0;

    return (
        <div className="min-h-screen bg-[#F8F9FB] font-dm-sans relative flex flex-col">

            {/* Background Gradients - Behind everything */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-green-50/40 via-transparent to-transparent" />
                <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-green-100/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-teal-50/30 rounded-full blur-3xl" />
            </div>

            {/* Content - Above gradients */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">

                {/* Empty State / Input Prompt */}
                {!hasMessages && !isGenerating && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl text-center"
                    >
                        {/* Logo/Icon */}
                        <div className="w-20 h-20 mx-auto mb-8 relative">
                            <div className="w-full h-full bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
                                <Sparkles size={32} className="text-[#1E2A5E]/80" />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-[#1E2A5E] mb-3 tracking-tight">
                            Research with ReedAI
                        </h1>
                        <p className="text-gray-500 mb-10 max-w-md mx-auto leading-relaxed text-sm">
                            Add a brief description or keywords that summarize your topic. For the best results, specify your desired depth and format.
                        </p>

                        {/* Input Card (Orbitly Style) */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 text-left overflow-hidden">
                            {/* Header Row */}
                            <div className="flex items-center justify-between px-5 pt-4">
                                <span className="text-xs font-medium text-gray-400">Template descriptions</span>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-medium text-gray-500 transition-colors">
                                    Suggest pro... <Sparkles size={12} />
                                </button>
                            </div>

                            {/* Textarea */}
                            <textarea
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ask anything you'd like to know..."
                                className="w-full h-32 px-5 py-4 bg-transparent resize-none focus:outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                            />

                            {/* Bottom Toolbar */}
                            <div className="flex items-center justify-between px-5 pb-5 pt-2">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                        <Upload size={16} /> Upload image
                                    </button>
                                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                        <Plus size={16} /> Add attachment
                                    </button>
                                </div>

                                <button
                                    onClick={handleSend}
                                    disabled={!query.trim() || isGenerating}
                                    className={clsx(
                                        "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
                                        query.trim()
                                            ? "bg-[#1A1D2D] text-white hover:bg-black shadow-lg"
                                            : "bg-[#1A1D2D]/80 text-white/80 cursor-not-allowed"
                                    )}
                                >
                                    Generate with AI <Sparkles size={14} />
                                </button>
                            </div>

                            {/* Progress Bar (During Generation) */}
                            {isGenerating && (
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5 }}
                                    className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                />
                            )}
                        </div>

                        {/* Recent Chats Section */}
                        <div className="mt-10 w-full">
                            <h3 className="text-sm font-medium text-gray-400 mb-4">Recent chats</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { title: "Linear Algebra: Eigenvalues", date: "Today" },
                                    { title: "Calculus III Review", date: "Yesterday" },
                                    { title: "Differential Equations Intro", date: "2 days ago" },
                                    { title: "Probability Basics", date: "Last week" },
                                ].map((chat, i) => (
                                    <button
                                        key={i}
                                        className="flex items-center justify-between p-4 bg-white/60 hover:bg-white border border-gray-100 rounded-xl text-left transition-all hover:shadow-sm group"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-[#1E2A5E]">{chat.title}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">{chat.date}</p>
                                        </div>
                                        <Sparkles size={14} className="text-gray-300 group-hover:text-[#1E2A5E]" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Conversation View */}
                {hasMessages && (
                    <div className="w-full max-w-4xl flex-1 flex flex-col">
                        {/* Messages */}
                        <div className="flex-1 space-y-6 pb-48 overflow-y-auto">
                            <AnimatePresence>
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={clsx(
                                            "flex gap-4",
                                            msg.role === "user" ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        {msg.role === "assistant" && (
                                            <div className="w-10 h-10 rounded-xl bg-[#1E2A5E] text-white flex items-center justify-center shrink-0 shadow-lg">
                                                <Bot size={20} />
                                            </div>
                                        )}

                                        <div className={clsx(
                                            "max-w-2xl rounded-2xl p-5 shadow-sm",
                                            msg.role === "user"
                                                ? "bg-[#1E2A5E] text-white"
                                                : "bg-white border border-gray-100"
                                        )}>
                                            {msg.type === "table" && msg.tableData ? (
                                                <div className="space-y-3">
                                                    <p className="text-gray-700 mb-4">{msg.content}</p>
                                                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                                                        <table className="w-full text-left text-sm">
                                                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                                                <tr>
                                                                    {msg.tableData.headers.map((h, i) => (
                                                                        <th key={i} className="px-4 py-3 whitespace-nowrap">{h}</th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-50">
                                                                {msg.tableData.rows.map((row, i) => (
                                                                    <tr key={i} className="hover:bg-gray-50/50">
                                                                        {row.map((cell, j) => (
                                                                            <td key={j} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                                                                {cell}
                                                                            </td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className={clsx("whitespace-pre-wrap text-sm", msg.role === "user" ? "text-white" : "text-gray-700")}>
                                                    {msg.content}
                                                </p>
                                            )}
                                        </div>

                                        {msg.role === "user" && (
                                            <div className="w-10 h-10 rounded-xl bg-gray-200 text-gray-600 flex items-center justify-center shrink-0">
                                                <User size={20} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator */}
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-4"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#1E2A5E] text-white flex items-center justify-center shrink-0 shadow-lg">
                                        <RefreshCw size={18} className="animate-spin" />
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Fixed Input (Conversation Mode) - Offset for sidebar on desktop */}
                        <div className="fixed bottom-0 left-0 lg:left-64 right-0 p-6 bg-gradient-to-t from-[#F8F9FB] via-[#F8F9FB]/95 to-transparent z-20">
                            <div className="max-w-3xl mx-auto">
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="flex items-center justify-between px-5 pt-4">
                                        <span className="text-xs font-medium text-gray-400">Follow-up question</span>
                                    </div>
                                    <textarea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                        placeholder="Ask a follow-up..."
                                        rows={2}
                                        className="w-full px-5 py-3 bg-transparent resize-none focus:outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                                    />
                                    <div className="flex items-center justify-between px-5 pb-4">
                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                                <Upload size={16} /> Upload image
                                            </button>
                                            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                                <Plus size={16} /> Add attachment
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleSend}
                                            disabled={!query.trim() || isGenerating}
                                            className={clsx(
                                                "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
                                                query.trim() && !isGenerating
                                                    ? "bg-[#1A1D2D] text-white hover:bg-black shadow-lg"
                                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            )}
                                        >
                                            {isGenerating ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
