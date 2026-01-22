"use client";

import { useEffect, useState, useRef, memo } from "react";
import { Mic, MicOff, VideoOff, MonitorUp, MoreHorizontal, PhoneOff, Settings, Pin, MessageSquare, X, Send } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useVoiceSession } from "@/hooks/use-voice-session";
import clsx from "clsx";

// --- Sub-Components (Avoid re-renders) ---

interface ParticipantCardProps {
    id: string;
    name: string;
    role: "user" | "agent";
    avatar: string;
    avatarColor: string;
    isActive: boolean;
    isMicOn: boolean;
    pinnedId: string | null;
    onPin: (id: string, e: React.MouseEvent) => void;
    activeMenu: string | null;
    onMenu: (id: string, e: React.MouseEvent) => void;
}

const ParticipantCard = memo(({
    id, name, role, avatar, avatarColor, isActive, isMicOn, pinnedId, onPin, activeMenu, onMenu
}: ParticipantCardProps) => {
    const isPinned = pinnedId === role;

    return (
        <motion.div
            layout // Keep layout for smooth resizing when pinning
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
                opacity: 1,
                scale: 1,
                flex: isPinned ? 2 : 1 // Flex grow if pinned
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={clsx(
                "relative rounded-3xl bg-[#1A1D2D] border-4 flex flex-col items-center justify-center shadow-2xl overflow-hidden group transition-all duration-300 min-h-[250px] sm:min-h-[300px]",
                isActive ? "border-[#4ADE80]" : "border-transparent",
                pinnedId && !isPinned ? "scale-95 opacity-50 blur-[1px]" : "scale-100 opacity-100"
            )}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Top Corner Controls */}
            <div onClick={(e) => onPin(role, e)} className={clsx("absolute top-4 left-4 p-2 rounded-xl cursor-pointer transition-colors z-20", isPinned ? "bg-indigo-500 text-white" : "bg-[#2D3244] text-white/70 hover:bg-[#373D54]")}>
                <Pin size={16} className={clsx(isPinned && "fill-current")} />
            </div>

            <div className="absolute top-4 right-4 z-20">
                <div onClick={(e) => onMenu(role, e)} className="p-2 rounded-xl bg-[#2D3244] hover:bg-[#373D54] cursor-pointer text-white/70 hover:text-white transition-colors">
                    <MoreHorizontal size={16} />
                </div>

                {/* Context Menu */}
                <AnimatePresence>
                    {activeMenu === role && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="absolute top-12 right-0 w-48 bg-[#252836] border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-30"
                        >
                            <button onClick={(e) => onPin(role, e)} className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                                <Pin size={14} /> {isPinned ? "Unpin" : "Pin for everyone"}
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                                <MessageSquare size={14} /> Send private message
                            </button>
                            <div className="h-px bg-white/5 my-1" />
                            <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                                <MicOff size={14} /> Mute participant
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Avatar */}
            <div className="relative">
                <div className={clsx(
                    "w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#1A1D2D] flex items-center justify-center text-4xl sm:text-5xl shadow-lg relative z-10 transition-transform duration-300",
                    avatarColor,
                    isActive && "scale-110"
                )}>
                    {avatar}
                </div>
                {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-50 scale-150" />
                )}
            </div>

            {/* Name Tag */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#0B0E14]/80 backdrop-blur-md rounded-lg flex items-center gap-2 max-w-[80%]">
                {role === "user" && !isMicOn && <MicOff size={14} className="text-red-400 flex-shrink-0" />}
                <span className="text-xs sm:text-sm font-medium text-white truncate">{name}</span>
            </div>
        </motion.div>
    );
});
ParticipantCard.displayName = "ParticipantCard";

// --- Main Page Component ---

export default function CallPage() {
    const { status, activeSpeaker, transcript, connect, startSpeaking, stopSpeaking } = useVoiceSession();
    const [isMicOn, setIsMicOn] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [pinnedId, setPinnedId] = useState<string | null>(null);
    const [activeMenu, setActiveMenu] = useState<string | null>(null); // 'user' | 'agent' | null
    const [chatInput, setChatInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-connect on mount
    useEffect(() => {
        connect();
    }, [connect]);

    // Handle Mic Toggle
    const toggleMic = () => {
        if (isMicOn) {
            setIsMicOn(false);
            stopSpeaking();
        } else {
            setIsMicOn(true);
            startSpeaking();
        }
    };

    // Auto-scroll chat
    useEffect(() => {
        if (isChatOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [transcript, isChatOpen]);

    const handlePin = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setPinnedId(pinnedId === id ? null : id);
        setActiveMenu(null);
    };

    const handleMenu = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMenu(activeMenu === id ? null : id);
    };

    // Close menus on click outside
    useEffect(() => {
        const handleClick = () => setActiveMenu(null);
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    // Sending message (mock)
    const sendMessage = () => {
        if (!chatInput.trim()) return;
        // In reality, this would use a chat hook
        setChatInput("");
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0B0E14] text-white font-dm-sans flex flex-col h-[100dvh]"> {/* Use 100dvh for mobile browsers */}

            {/* TOP BAR */}
            <header className="px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between z-10 border-b border-white/5 bg-[#0B0E14] shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1F2937]/50 rounded-lg border border-white/5">
                        <span className={clsx("w-2 h-2 rounded-full animate-pulse", status === "connected" || status === "listening" || status === "speaking" ? "bg-green-500" : "bg-yellow-500")} />
                        <span className="text-xs sm:text-sm font-medium text-gray-200">
                            {status === "speaking" ? "Tutor Speaking..." : "Voice Session"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border-2 border-[#0B0E14]">AH</div>
                        <span className="text-sm font-medium hidden sm:inline">Albert Howard</span>
                        <span className="text-xs text-green-400 hidden sm:inline">Available</span>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT ROW (Grid + Chat) */}
            <div className="flex-1 overflow-hidden flex relative">

                {/* GRID AREA */}
                <main className={clsx(
                    "flex-1 p-4 flex items-center justify-center transition-all duration-300",
                    isChatOpen ? "mr-0 pr-0 sm:mr-[320px] sm:pr-0" : "mr-0" // On mobile, chat overlays. On desktop, it pushes.
                )}>
                    <div className={clsx(
                        "grid gap-4 w-full h-full max-h-[calc(100vh-160px)] transition-all overflow-y-auto",
                        pinnedId ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2" // Stack on mobile
                    )}>
                        {(!pinnedId || pinnedId === "user") && (
                            <ParticipantCard
                                id="user-1"
                                role="user"
                                name="Albert Howard (You)"
                                avatar="👱‍♂️"
                                avatarColor="bg-blue-400"
                                isActive={activeSpeaker === "user"}
                                isMicOn={isMicOn}
                                pinnedId={pinnedId}
                                onPin={handlePin}
                                activeMenu={activeMenu}
                                onMenu={handleMenu}
                            />
                        )}

                        {(!pinnedId || pinnedId === "agent") && (
                            <ParticipantCard
                                id="agent-1"
                                role="agent"
                                name="Exam Tutor"
                                avatar="👩‍🏫"
                                avatarColor="bg-yellow-200"
                                isActive={activeSpeaker === "agent"}
                                isMicOn={true}
                                pinnedId={pinnedId}
                                onPin={handlePin}
                                activeMenu={activeMenu}
                                onMenu={handleMenu}
                            />
                        )}
                    </div>
                </main>

                {/* CHAT SIDEBAR */}
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.aside
                            initial={{ x: "100%", opacity: 0 }} // Slide in from right
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 right-0 bottom-0 w-full sm:w-[320px] bg-[#13161F] border-l border-white/5 flex flex-col z-20 shadow-2xl"
                        >
                            <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                                <h3 className="font-bold flex items-center gap-2"><MessageSquare size={16} /> In-Call Chat</h3>
                                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white p-2"><X size={16} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {transcript.length === 0 && (
                                    <div className="text-center text-gray-500 text-sm mt-10">
                                        <p>No messages yet.</p>
                                        <p className="text-xs mt-2">Transcript will appear here.</p>
                                    </div>
                                )}
                                {transcript.map((msg, i) => (
                                    <div key={i} className={clsx("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                                        <div className={clsx("max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                                            msg.role === 'user' ? "bg-indigo-600 text-white" : "bg-[#252836] text-gray-200"
                                        )}>
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-gray-500 mt-1">{msg.role === 'user' ? "You" : "Tutor"}</span>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-4 border-t border-white/5 shrink-0 pb-safe">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                        placeholder="Type a message..."
                                        className="w-full bg-[#0B0E14] border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                                    />
                                    <button onClick={sendMessage} className="absolute right-2 top-2 p-1 text-indigo-400 hover:text-indigo-300">
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>

            {/* BOTTOM FLOATING BAR */}
            <div className="pb-8 px-4 flex justify-center z-30 shrink-0">
                <div className="bg-[#1A1D2D] border border-white/5 rounded-2xl px-3 py-2 flex items-center gap-3 sm:gap-4 shadow-2xl overflow-x-auto max-w-full">

                    {/* Mic Toggle */}
                    <button
                        onClick={toggleMic}
                        className={clsx(
                            "p-3 rounded-xl transition-all shrink-0",
                            isMicOn ? "bg-[#2D3244] text-white hover:bg-[#373D54]" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        )}
                        title={isMicOn ? "Mute" : "Unmute"}
                    >
                        {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button className="p-3 rounded-xl bg-[#2D3244] text-white hover:bg-[#373D54] transition-all shrink-0">
                        <VideoOff size={20} className="opacity-50" />
                    </button>

                    <button className="p-3 rounded-xl bg-[#2D3244] text-white hover:bg-[#373D54] transition-all shrink-0 hidden sm:block">
                        <MonitorUp size={20} />
                    </button>

                    {/* Chat Toggle */}
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className={clsx(
                            "p-3 rounded-xl transition-all shrink-0",
                            isChatOpen ? "bg-indigo-600 text-white" : "bg-[#2D3244] text-white hover:bg-[#373D54]"
                        )}
                    >
                        <MessageSquare size={20} />
                    </button>

                    <button className="p-3 rounded-xl bg-[#2D3244] text-white hover:bg-[#373D54] transition-all shrink-0 hidden sm:block">
                        <Settings size={20} />
                    </button>

                    <Link href="/dashboard/tutor" className="ml-2 sm:ml-4 p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all shrink-0">
                        <PhoneOff size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
