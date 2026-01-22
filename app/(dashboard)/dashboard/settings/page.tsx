"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, GraduationCap, Mic, Bell, Shield, HelpCircle, ChevronRight, LogOut, Trash2, Camera } from "lucide-react";
import clsx from "clsx";

// --- Types ---
interface SettingsTab {
    id: string;
    label: string;
    icon: React.ReactNode;
    group?: "main" | "other";
}

interface SettingRowProps {
    label: string;
    description: string;
    value: React.ReactNode;
    onEdit?: () => void;
}

// --- Settings Tabs ---
const TABS: SettingsTab[] = [
    { id: "profile", label: "Profile", icon: <User size={18} />, group: "main" },
    { id: "tutor", label: "Tutor Preferences", icon: <GraduationCap size={18} />, group: "main" },
    { id: "voice", label: "Voice", icon: <Mic size={18} />, group: "main" },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} />, group: "main" },
    { id: "security", label: "Privacy & Security", icon: <Shield size={18} />, group: "other" },
    { id: "support", label: "Help & Support", icon: <HelpCircle size={18} />, group: "other" },
];

// --- Setting Row Component ---
function SettingRow({ label, description, value, onEdit }: SettingRowProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start justify-between py-5 border-b border-gray-100 last:border-0 gap-3">
            <div className="flex-1">
                <p className="font-medium text-gray-900 mb-0.5">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="flex items-start gap-4 sm:text-right">
                <div className="text-sm text-gray-900">{value}</div>
                {onEdit && (
                    <button
                        onClick={onEdit}
                        className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-0.5 whitespace-nowrap"
                    >
                        Edit <ChevronRight size={14} />
                    </button>
                )}
            </div>
        </div>
    );
}

// --- Toggle Row Component ---
function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <div className="flex items-start justify-between py-5 border-b border-gray-100 last:border-0 gap-4">
            <div className="flex-1">
                <p className="font-medium text-gray-900 mb-0.5">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
                onClick={() => onChange(!checked)}
                className={clsx(
                    "w-11 h-6 rounded-full transition-colors relative shrink-0 mt-1",
                    checked ? "bg-green-500" : "bg-gray-200"
                )}
            >
                <motion.div
                    layout
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                    style={{ left: checked ? "calc(100% - 20px)" : "4px" }}
                />
            </button>
        </div>
    );
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    // Profile State
    const [displayName] = useState("James");
    const [username] = useState("student_123");
    const [email] = useState("james@university.edu");

    // Tutor State
    const [tutorStyle, setTutorStyle] = useState("exam");
    const [speakSlowly, setSpeakSlowly] = useState(false);
    const [focusExam, setFocusExam] = useState(true);
    const [askQuestions, setAskQuestions] = useState(true);

    // Voice State
    const [voiceSpeed, setVoiceSpeed] = useState("normal");
    const [readCalmly, setReadCalmly] = useState(true);

    // Notifications State
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

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <motion.div
                        key="profile"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <User size={20} className="text-gray-400" />
                            <h2 className="text-xl font-bold text-[#1E2A5E]">Profile Settings</h2>
                        </div>
                        <p className="text-gray-500 mb-6">Customize and edit your profile details.</p>

                        <SettingRow
                            label="Profile Photo"
                            description="Min 400x400px, PNG or JPEG formats."
                            value={
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                        JA
                                    </div>
                                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <Camera size={14} /> Upload
                                    </button>
                                </div>
                            }
                        />
                        <SettingRow
                            label="Display Name"
                            description="Your name as shown across ReedAI."
                            value={displayName}
                            onEdit={() => { }}
                        />
                        <SettingRow
                            label="Username"
                            description="Your unique identifier on the platform."
                            value={<span className="text-gray-600">@{username}</span>}
                            onEdit={() => { }}
                        />
                        <SettingRow
                            label="Email Address"
                            description="The email used for account notifications."
                            value={email}
                            onEdit={() => { }}
                        />
                    </motion.div>
                );

            case "tutor":
                return (
                    <motion.div
                        key="tutor"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <GraduationCap size={20} className="text-gray-400" />
                            <h2 className="text-xl font-bold text-[#1E2A5E]">Tutor Preferences</h2>
                        </div>
                        <p className="text-gray-500 mb-6">Customize how your AI tutor interacts with you.</p>

                        <div className="py-5 border-b border-gray-100">
                            <p className="font-medium text-gray-900 mb-3">Default Tutor Style</p>
                            <div className="flex flex-wrap gap-2">
                                {tutorStyles.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => setTutorStyle(style.id)}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
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

                        <ToggleRow
                            label="Speak Slowly"
                            description="Tutor speaks at a slower, clearer pace."
                            checked={speakSlowly}
                            onChange={setSpeakSlowly}
                        />
                        <ToggleRow
                            label="Focus on Exam Answers"
                            description="Prioritize exam-style explanations and answers."
                            checked={focusExam}
                            onChange={setFocusExam}
                        />
                        <ToggleRow
                            label="Ask Me Questions"
                            description="Tutor asks follow-up questions to test understanding."
                            checked={askQuestions}
                            onChange={setAskQuestions}
                        />
                    </motion.div>
                );

            case "voice":
                return (
                    <motion.div
                        key="voice"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Mic size={20} className="text-gray-400" />
                            <h2 className="text-xl font-bold text-[#1E2A5E]">Voice Settings</h2>
                        </div>
                        <p className="text-gray-500 mb-6">Control how the tutor voice sounds.</p>

                        <div className="py-5 border-b border-gray-100">
                            <p className="font-medium text-gray-900 mb-3">Voice Speed</p>
                            <div className="flex gap-2">
                                {voiceSpeeds.map(speed => (
                                    <button
                                        key={speed.id}
                                        onClick={() => setVoiceSpeed(speed.id)}
                                        className={clsx(
                                            "px-6 py-2 rounded-lg text-sm font-medium transition-all flex-1",
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

                        <ToggleRow
                            label="Read Explanations Calmly"
                            description="Use a calm, measured tone when explaining concepts."
                            checked={readCalmly}
                            onChange={setReadCalmly}
                        />
                    </motion.div>
                );

            case "notifications":
                return (
                    <motion.div
                        key="notifications"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Bell size={20} className="text-gray-400" />
                            <h2 className="text-xl font-bold text-[#1E2A5E]">Notifications</h2>
                        </div>
                        <p className="text-gray-500 mb-6">Manage what notifications you receive.</p>

                        <ToggleRow
                            label="Session Summaries"
                            description="Receive a summary after each tutoring session."
                            checked={sessionSummaries}
                            onChange={setSessionSummaries}
                        />
                        <ToggleRow
                            label="Account Updates"
                            description="Important updates about your account and credits."
                            checked={accountUpdates}
                            onChange={setAccountUpdates}
                        />
                    </motion.div>
                );

            case "security":
                return (
                    <motion.div
                        key="security"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Shield size={20} className="text-gray-400" />
                            <h2 className="text-xl font-bold text-[#1E2A5E]">Privacy & Security</h2>
                        </div>
                        <p className="text-gray-500 mb-6">Manage your account security settings.</p>

                        <SettingRow
                            label="Password"
                            description="Last changed 30 days ago."
                            value="••••••••••"
                            onEdit={() => { }}
                        />
                        <SettingRow
                            label="Active Sessions"
                            description="Devices currently logged into your account."
                            value="2 devices"
                            onEdit={() => { }}
                        />

                        <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
                            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-gray-50 transition-colors text-left">
                                <LogOut size={18} className="text-gray-500" />
                                <div>
                                    <p className="font-medium text-gray-900">Log out of all devices</p>
                                    <p className="text-sm text-gray-500">This will sign you out everywhere.</p>
                                </div>
                            </button>
                            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-50 transition-colors text-left">
                                <Trash2 size={18} className="text-red-500" />
                                <div>
                                    <p className="font-medium text-red-600">Delete account</p>
                                    <p className="text-sm text-gray-500">Permanently delete your account and data.</p>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                );

            case "support":
                return (
                    <motion.div
                        key="support"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <HelpCircle size={20} className="text-gray-400" />
                            <h2 className="text-xl font-bold text-[#1E2A5E]">Help & Support</h2>
                        </div>
                        <p className="text-gray-500 mb-6">Get help or learn more about ReedAI.</p>

                        <SettingRow
                            label="Help Center"
                            description="Browse FAQs and tutorials."
                            value=""
                            onEdit={() => { }}
                        />
                        <SettingRow
                            label="Contact Support"
                            description="Get in touch with our team."
                            value=""
                            onEdit={() => { }}
                        />
                        <SettingRow
                            label="Privacy Policy"
                            description="How we handle your data."
                            value=""
                            onEdit={() => { }}
                        />
                        <SettingRow
                            label="Terms of Use"
                            description="Our terms and conditions."
                            value=""
                            onEdit={() => { }}
                        />
                    </motion.div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="font-dm-sans max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <motion.aside
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-64 shrink-0"
                >
                    <h1 className="text-2xl font-bold text-[#1E2A5E] mb-1">Settings</h1>
                    <p className="text-gray-500 text-sm mb-6">Choose between categories.</p>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-3 mb-2">Main</p>
                        {TABS.filter(t => t.group === "main").map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} />}
                            </button>
                        ))}

                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-3 mt-6 mb-2">Other</p>
                        {TABS.filter(t => t.group === "other").map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} />}
                            </button>
                        ))}
                    </div>
                </motion.aside>

                {/* Content */}
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 lg:p-8"
                >
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </motion.main>
            </div>
        </div>
    );
}
