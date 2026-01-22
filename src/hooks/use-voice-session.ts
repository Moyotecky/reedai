"use client";

import { useState, useEffect, useCallback } from "react";

export type VoiceStatus = "connecting" | "connected" | "listening" | "speaking" | "thinking" | "disconnected";

export function useVoiceSession() {
    const [status, setStatus] = useState<VoiceStatus>("disconnected");
    const [activeSpeaker, setActiveSpeaker] = useState<"user" | "agent" | null>(null);
    const [volume, setVolume] = useState(0); // 0-100 for visualizer
    const [transcript, setTranscript] = useState<{ role: 'user' | 'agent', text: string }[]>([]);

    const connect = useCallback(async () => {
        setStatus("connecting");

        // Simulate API call
        try {
            await fetch("/api/voice/session", { method: "POST" });

            // Simulate connection delay
            setTimeout(() => {
                setStatus("connected");
                // Start "listening"
                setTimeout(() => setStatus("listening"), 800);
            }, 1000);

        } catch (e) {
            setStatus("disconnected");
            console.error("Connection failed", e);
        }
    }, []);

    const disconnect = useCallback(() => {
        setStatus("disconnected");
        setActiveSpeaker(null);
    }, []);

    // toggleMic triggers the "User Speaking" simulation
    const startSpeaking = useCallback(() => {
        if (status !== "connected" && status !== "listening" && status !== "speaking") return;
        setStatus("listening"); // In a real app, "listening" means system is listening to user
        setActiveSpeaker("user");
    }, [status]);

    const stopSpeaking = useCallback(() => {
        if (activeSpeaker === "user") {
            setActiveSpeaker(null);
            setStatus("thinking");

            // Simulate AI response delay
            setTimeout(() => {
                setStatus("speaking");
                setActiveSpeaker("agent");

                // Simulate AI talking duration
                setTimeout(() => {
                    setStatus("listening");
                    setActiveSpeaker(null);
                }, 4000);
            }, 1500);
        }
    }, [activeSpeaker]);

    // Simulate Volume/Audio Levels for Visualizer
    useEffect(() => {
        if (!activeSpeaker) {
            setVolume(0);
            return;
        }

        const interval = setInterval(() => {
            // Random volume fluctuation between 30-90 when speaking
            setVolume(Math.floor(Math.random() * 60) + 30);
        }, 100);

        return () => clearInterval(interval);
    }, [activeSpeaker]);

    return {
        status,
        activeSpeaker,
        volume,
        transcript,
        connect,
        disconnect,
        startSpeaking,
        stopSpeaking
    };
}
