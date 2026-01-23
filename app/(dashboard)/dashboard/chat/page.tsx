"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Upload, Send, RefreshCw, Bot, User, Plus } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import { useChat } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';

export default function ChatPage() {
    // 1. Vercel AI SDK Hook
    // Note: In newer @ai-sdk/react, we manage input/submission manually if helpers are missing
    const { messages, status, sendMessage, setMessages } = useChat({
        // api defaults to /api/chat
    });

    // Set initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{
                id: '1',
                role: 'assistant',
                parts: [{ type: 'text', text: "Hi there! I'm ReedAI. How can I help you with your studies today?" }]
            }]);
        }
    }, [messages.length, setMessages]);

    // Manual Input State (Backwards compatibility or Headless mode)
    const [input, setInput] = useState('');
    const isLoading = status === 'streaming' || status === 'submitted';

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            role: 'user' as const,
            content: input,
            parts: [{ type: 'text' as const, text: input }]
        };

        // Append handles the optimistic update + API call
        await sendMessage(userMessage);
        setInput('');
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const hasMessages = messages.length > 1; // > 1 because we have initial greeting

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
                {!hasMessages && (
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
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Ask anything you'd like to know..."
                                    className="w-full h-32 px-5 py-4 bg-transparent resize-none focus:outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e as any);
                                        }
                                    }}
                                />

                                {/* Bottom Toolbar */}
                                <div className="flex items-center justify-between px-5 pb-5 pt-2">
                                    <div className="flex items-center gap-4">
                                        <button type="button" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                            <Upload size={16} /> Upload image
                                        </button>
                                        <button type="button" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                            <Plus size={16} /> Add attachment
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className={clsx(
                                            "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
                                            input.trim()
                                                ? "bg-[#1A1D2D] text-white hover:bg-black shadow-lg"
                                                : "bg-[#1A1D2D]/80 text-white/80 cursor-not-allowed"
                                        )}
                                    >
                                        Generate with AI <Sparkles size={14} />
                                    </button>
                                </div>
                            </form>

                            {/* Progress Bar (During Generation) */}
                            {isLoading && (
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
                    <div className="w-full max-w-4xl flex-1 flex flex-col pt-4">
                        {/* Messages */}
                        <div className="flex-1 space-y-6 pb-48 overflow-y-auto">
                            <AnimatePresence>
                                {messages.map((msg: any) => (
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
                                            <div className="w-10 h-10 rounded-xl bg-[#1E2A5E] text-white flex items-center justify-center shrink-0 shadow-lg mt-2">
                                                <Bot size={20} />
                                            </div>
                                        )}

                                        <div className={clsx(
                                            "max-w-2xl rounded-2xl p-5 shadow-sm",
                                            msg.role === "user"
                                                ? "bg-[#1E2A5E] text-white"
                                                : "bg-white border border-gray-100"
                                        )}>
                                            <div className={clsx("prose prose-sm max-w-none", msg.role === "user" ? "prose-invert" : "text-gray-700")}>
                                                <ReactMarkdown>
                                                    {msg.content || (msg.parts?.map((p: any) => p.text).join(''))}
                                                </ReactMarkdown>
                                            </div>
                                        </div>

                                        {msg.role === "user" && (
                                            <div className="w-10 h-10 rounded-xl bg-gray-200 text-gray-600 flex items-center justify-center shrink-0 mt-2">
                                                <User size={20} />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Typing Indicator */}
                            {isLoading && (
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex items-center justify-between px-5 pt-4">
                                            <span className="text-xs font-medium text-gray-400">Follow-up question</span>
                                        </div>
                                        <textarea
                                            value={input}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSubmit(e as any);
                                                }
                                            }}
                                            placeholder="Ask a follow-up..."
                                            rows={2}
                                            className="w-full px-5 py-3 bg-transparent resize-none focus:outline-none text-gray-700 placeholder:text-gray-400 text-sm"
                                        />
                                        <div className="flex items-center justify-between px-5 pb-4">
                                            <div className="flex items-center gap-4">
                                                <button type="button" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                                    <Upload size={16} /> Upload image
                                                </button>
                                                <button type="button" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1E2A5E] transition-colors">
                                                    <Plus size={16} /> Add attachment
                                                </button>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={!input.trim() || isLoading}
                                                className={clsx(
                                                    "flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all",
                                                    input.trim() && !isLoading
                                                        ? "bg-[#1A1D2D] text-white hover:bg-black shadow-lg"
                                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                )}
                                            >
                                                {isLoading ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
