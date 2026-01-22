"use client";

import { useEffect, useState } from "react";
import { Mic, MicOff, Video, VideoOff, MonitorUp, MoreHorizontal, PhoneOff, Settings, Pin } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useVoiceSession } from "@/hooks/use-voice-session";
import clsx from "clsx";

export default function CallPage() {
    const { status, activeSpeaker, volume, connect, startSpeaking, stopSpeaking } = useVoiceSession();
    const [isMicOn, setIsMicOn] = useState(false);

    // Auto-connect on mount
    useEffect(() => {
        connect();
    }, [connect]);

    // Handle Mic Toggle (Simulates Push-to-Talk or Toggle)
    const toggleMic = () => {
        if (isMicOn) {
            setIsMicOn(false);
            stopSpeaking();
        } else {
            setIsMicOn(true);
            startSpeaking();
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#0B0E14] text-white font-dm-sans flex flex-col">

            {/* TOP BAR */}
            <header className="px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1F2937]/50 rounded-lg border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-gray-200">Voice Session</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* User Profile / Status */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border-2 border-[#0B0E14]">
                            AH
                        </div>
                        <span className="text-sm font-medium">Albert Howard</span>
                        <span className="text-xs text-green-400">Available</span>
                    </div>
                </div>
            </header>

            {/* MAIN GRID */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl h-full max-h-[600px]">

                    {/* CARD 1: USER (You) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={clsx(
                            "relative rounded-3xl bg-[#1A1D2D] border-4 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden group transition-all duration-300",
                            activeSpeaker === "user" ? "border-[#4ADE80]" : "border-transparent"
                        )}
                    >
                        {/* Top Corner Controls */}
                        <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#2D3244] hover:bg-[#373D54] cursor-pointer text-white/70 hover:text-white transition-colors">
                            <Pin size={16} />
                        </div>
                        <div className="absolute top-4 right-4 p-2 rounded-xl bg-[#2D3244] hover:bg-[#373D54] cursor-pointer text-white/70 hover:text-white transition-colors">
                            <MoreHorizontal size={16} />
                        </div>

                        {/* Avatar */}
                        <div className="relative">
                            <div className={clsx(
                                "w-32 h-32 rounded-full bg-blue-400 border-4 border-[#1A1D2D] flex items-center justify-center text-5xl shadow-lg relative z-10 transition-transform duration-300",
                                activeSpeaker === "user" && "scale-110"
                            )}>
                                👱‍♂️
                            </div>
                            {/* Audio Ring */}
                            {activeSpeaker === "user" && (
                                <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-50 scale-150" />
                            )}
                        </div>

                        {/* Name Tag */}
                        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#0B0E14]/80 backdrop-blur-md rounded-lg flex items-center gap-2">
                            {!isMicOn && <MicOff size={14} className="text-red-400" />}
                            <span className="text-sm font-medium">Albert Howard (You)</span>
                        </div>
                    </motion.div>

                    {/* CARD 2: TUTOR (Jane Cooper / Exam Tutor) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className={clsx(
                            "relative rounded-3xl bg-[#1A1D2D] border-4 flex flex-col items-center justify-center relative shadow-2xl overflow-hidden group transition-all duration-300",
                            activeSpeaker === "agent" ? "border-[#4ADE80]" : "border-transparent"
                        )}
                    >
                        {/* Top Corner Controls */}
                        <div className="absolute top-4 left-4 p-2 rounded-xl bg-[#2D3244] hover:bg-[#373D54] cursor-pointer text-white/70 hover:text-white transition-colors">
                            <Pin size={16} />
                        </div>
                        <div className="absolute top-4 right-4 p-2 rounded-xl bg-[#2D3244] hover:bg-[#373D54] cursor-pointer text-white/70 hover:text-white transition-colors">
                            <MoreHorizontal size={16} />
                        </div>

                        {/* Avatar */}
                        <div className="relative">
                            <div className={clsx(
                                "w-32 h-32 rounded-full bg-yellow-200 border-4 border-[#1A1D2D] flex items-center justify-center text-5xl shadow-lg relative z-10 transition-transform duration-300",
                                activeSpeaker === "agent" && "scale-110"
                            )}>
                                👩‍🏫
                            </div>
                            {activeSpeaker === "agent" && (
                                <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-50 scale-150" />
                            )}
                        </div>

                        {/* Name Tag */}
                        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-[#0B0E14]/80 backdrop-blur-md rounded-lg flex items-center gap-2">
                            <span className="text-sm font-medium">Exam Tutor</span>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* BOTTOM FLOATING BAR */}
            <div className="pb-8 px-4 flex justify-center">
                <div className="bg-[#1A1D2D] border border-white/5 rounded-2xl px-2 py-2 flex items-center gap-2 shadow-2xl">

                    {/* Room Info */}
                    <div className="hidden sm:flex items-center gap-2 px-4 border-r border-white/10 mr-2">
                        <span className="text-gray-400">⚡</span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Voice Room</span>
                            <span className="text-[10px] text-gray-500">2 participants</span>
                        </div>
                    </div>

                    {/* Controls */}
                    <button
                        onClick={toggleMic}
                        className={clsx(
                            "p-3 rounded-xl transition-all",
                            isMicOn ? "bg-[#2D3244] text-white hover:bg-[#373D54]" : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        )}
                        title="Toggle Mic"
                    >
                        {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button className="p-3 rounded-xl bg-[#2D3244] text-white hover:bg-[#373D54] transition-all">
                        <VideoOff size={20} className="opacity-50" /> {/* Video disabled for voice */}
                    </button>

                    <button className="p-3 rounded-xl bg-[#2D3244] text-white hover:bg-[#373D54] transition-all">
                        <MonitorUp size={20} />
                    </button>

                    <button className="p-3 rounded-xl bg-[#2D3244] text-white hover:bg-[#373D54] transition-all">
                        <MoreHorizontal size={20} />
                    </button>

                    <Link href="/dashboard/tutor" className="ml-4 p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all">
                        <PhoneOff size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
