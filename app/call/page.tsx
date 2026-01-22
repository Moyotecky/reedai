"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, useTracks, VideoTrack, AudioTrack, ControlBar, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { Mic, MicOff, PhoneOff, Video, VideoOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CallPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [connect, setConnect] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                // Fetch token
                const resp = await fetch("/api/livekit/token?room=study-room-1");
                const data = await resp.json();

                if (data.data?.token) {
                    setToken(data.data.token);
                    setServerUrl(data.data.serverUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL);
                    setConnect(true);
                } else {
                    console.error("Failed to get token", data);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    if (!token || !serverUrl) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#F8F9FB]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-[#1E2A5E]" />
                    <p className="text-gray-500 font-dm-sans">Connecting to secure room...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#111] overflow-hidden relative">
            <LiveKitRoom
                video={false} // Audio-first for tutoring
                audio={true}
                token={token}
                serverUrl={serverUrl}
                connect={connect}
                data-lk-theme="default"
                className="h-full w-full"
                onDisconnected={() => {
                    router.push("/dashboard/tutor");
                }}
            >
                <div className="flex flex-col h-full relative z-10">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                <span className="text-xl">👨‍🏫</span>
                            </div>
                            <div>
                                <h2 className="text-white font-bold font-dm-sans">Exam Tutor</h2>
                                <p className="text-white/60 text-xs">Connected • 00:00</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Visualizer Area */}
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* Abstract Visualizer */}
                        <div className="relative">
                            <div className="w-48 h-48 rounded-full bg-[#1E2A5E] flex items-center justify-center relative z-10 shadow-2xl shadow-indigo-500/20">
                                <div className="w-40 h-40 rounded-full bg-[#2D3A75] flex items-center justify-center">
                                    <Mic size={48} className="text-white/80" />
                                </div>
                            </div>
                            {/* Animated Rings */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full animate-pulse opacity-50" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/5 rounded-full animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                        </div>
                    </div>

                    {/* Custom Controls */}
                    <CustomControls />

                    {/* Hidden Audio Renderer for incoming audio */}
                    <RoomAudioRenderer />
                </div>
            </LiveKitRoom>
        </div>
    );
}

function CustomControls() {
    // Custom controls can be built using useRoomContext() or similar hooks from LiveKit
    // For simplicity, we are wrapping the standard ControlBar or building a simple one
    return (
        <div className="p-8 pb-12 flex justify-center gap-6 z-20">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10">
                <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                    <Mic size={24} />
                </button>
                <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                    <VideoOff size={24} className="opacity-50" />
                </button>
                <Link href="/dashboard/tutor">
                    <button className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-white shadow-lg shadow-red-500/30 px-8">
                        <PhoneOff size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
}
