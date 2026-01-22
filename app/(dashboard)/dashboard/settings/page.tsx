"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Mic, Bell, Shield, HelpCircle, FileText, LogOut, Trash2, Check, ChevronRight } from "lucide-react";
import clsx from "clsx";

// --- Types ---
interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

// --- Toggle Component ---
function Toggle({ label, checked, onChange }: ToggleProps) {
    return (
        <label className="flex items-center justify-between py-3 cursor-pointer group">
            <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
            <button
                onClick={() => onChange(!checked)}
                className={clsx(
                    "w-11 h-6 rounded-full transition-colors relative",
                    checked ? "bg-green-500" : "bg-gray-200"
                )}
            >
                <motion.div
                    layout
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                    style={{ left: checked ? "calc(100% - 20px)" : "4px" }}
                />
            </button>
        </label>
    );
}

// --- Section Component ---
function SettingsSection({ title, icon, children, delay = 0 }: { title: string; icon: React.ReactNode; children: React.ReactNode; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-white rounded-2xl border border-gray-100 p-6 mb-6"
        >
            <h2 className="font-bold text-[#1E2A5E] mb-4 flex items-center gap-2">
                {icon} {title}
            </h2>
            {children}
        </motion.div>
    );
}

export default function SettingsPage() {
    // Profile State
    const [username, setUsername] = useState("student_123");
    const [displayName, setDisplayName] = useState("James");
    const email = "james@university.edu"; // Read-only

    // Tutor Preferences
    const [tutorStyle, setTutorStyle] = useState("exam");
    const [speakSlowly, setSpeakSlowly] = useState(false);
    const [focusExam, setFocusExam] = useState(true);
    const [askQuestions, setAskQuestions] = useState(true);

    // Voice Settings
    const [voiceSpeed, setVoiceSpeed] = useState("normal");
    const [readCalmly, setReadCalmly] = useState(true);

    // Notifications
    const [sessionSummaries, setSessionSummaries] = useState(true);
    const [accountUpdates, setAccountUpdates] = useState(true);

    const tutorStyles = [
        { id: "exam", label: "Exam-focused" },
        { id: "beginner", label: "Beginner" },
        { id: "revision", label: "Revision" },
        { id: "practice", label: "Practice" },
    ];

    const voiceSpeeds = [
        { id: "slow", label: "Slow" },
        { id: "normal", label: "Normal" },
        { id: "fast", label: "Fast" },
    ];

    return (
        <div className="max-w-2xl mx-auto font-dm-sans">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-[#1E2A5E] mb-2">Settings</h1>
                <p className="text-gray-500">Manage your account and preferences.</p>
            </motion.div>

            {/* Profile */}
            <SettingsSection title="Profile" icon={<User size={18} />} delay={0.1}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10 focus:border-[#1E2A5E]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Display name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10 focus:border-[#1E2A5E]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Email address</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="w-full px-4 py-3 border border-gray-100 rounded-xl text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            Change avatar
                        </button>
                        <button className="px-4 py-2 bg-[#1E2A5E] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors">
                            Save changes
                        </button>
                    </div>
                </div>
            </SettingsSection>

            {/* Tutor Preferences */}
            <SettingsSection title="Tutor preferences" icon={<GraduationCap size={18} />} delay={0.2}>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-2">Default tutor style</label>
                    <div className="flex flex-wrap gap-2">
                        {tutorStyles.map(style => (
                            <button
                                key={style.id}
                                onClick={() => setTutorStyle(style.id)}
                                className={clsx(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                    tutorStyle === style.id
                                        ? "bg-[#1E2A5E] text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {style.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                    <Toggle label="Speak slowly" checked={speakSlowly} onChange={setSpeakSlowly} />
                    <Toggle label="Focus on exam answers" checked={focusExam} onChange={setFocusExam} />
                    <Toggle label="Ask me questions sometimes" checked={askQuestions} onChange={setAskQuestions} />
                </div>
            </SettingsSection>

            {/* Voice Settings */}
            <SettingsSection title="Voice" icon={<Mic size={18} />} delay={0.3}>
                <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-500 mb-2">Voice speed</label>
                    <div className="flex gap-2">
                        {voiceSpeeds.map(speed => (
                            <button
                                key={speed.id}
                                onClick={() => setVoiceSpeed(speed.id)}
                                className={clsx(
                                    "px-4 py-2 rounded-xl text-sm font-medium transition-all flex-1",
                                    voiceSpeed === speed.id
                                        ? "bg-[#1E2A5E] text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {speed.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                    <Toggle label="Read explanations calmly" checked={readCalmly} onChange={setReadCalmly} />
                </div>
            </SettingsSection>

            {/* Notifications */}
            <SettingsSection title="Notifications" icon={<Bell size={18} />} delay={0.4}>
                <Toggle label="Session summaries" checked={sessionSummaries} onChange={setSessionSummaries} />
                <Toggle label="Important account updates" checked={accountUpdates} onChange={setAccountUpdates} />
            </SettingsSection>

            {/* Security */}
            <SettingsSection title="Security" icon={<Shield size={18} />} delay={0.5}>
                <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                        <span className="text-sm font-medium text-gray-700">Change password</span>
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-left">
                        <div className="flex items-center gap-3">
                            <LogOut size={16} className="text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">Log out of all devices</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>
                    <div className="pt-4 border-t border-gray-100 mt-4">
                        <button className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors">
                            <Trash2 size={14} /> Delete account
                        </button>
                    </div>
                </div>
            </SettingsSection>

            {/* Support & Legal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 py-8"
            >
                <a href="#" className="hover:text-[#1E2A5E] transition-colors flex items-center gap-1">
                    <HelpCircle size={14} /> Help & Support
                </a>
                <a href="#" className="hover:text-[#1E2A5E] transition-colors flex items-center gap-1">
                    <FileText size={14} /> Privacy Policy
                </a>
                <a href="#" className="hover:text-[#1E2A5E] transition-colors flex items-center gap-1">
                    <FileText size={14} /> Terms of Use
                </a>
            </motion.div>
        </div>
    );
}
