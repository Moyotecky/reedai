"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
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

// --- Constants ---
const TUTOR_STYLES = [
    { id: "exam", label: "Exam-focused" },
    { id: "beginner", label: "Beginner" },
    { id: "revision", label: "Revision" },
    { id: "practice", label: "Practice" },
];

const VOICE_SPEEDS = [
    { id: "slow", label: "Slow" },
    { id: "normal", label: "Normal" },
    { id: "fast", label: "Fast" },
];

interface SettingRowProps {
    label: string;
    description: string;
    value: React.ReactNode;
    onEdit?: () => void;
}

// --- Mock Data/Types ---
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

// --- Main Settings Component ---
export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");

    // User State
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Editing State
    const [editMode, setEditMode] = useState<string | null>(null); // 'displayName' | 'username' | etc.
    const [tempValue, setTempValue] = useState("");

    // Fetch User
    const fetchUser = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            if (res.data.success) {
                setUser(res.data.data.user);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Helper for updating preferences
    const updatePreference = async (key: string, value: any) => {
        // Optimistic update
        setUser((prev: any) => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                [key]: value
            }
        }));

        try {
            await axios.put('/api/auth/me', {
                preferences: { ...user.preferences, [key]: value }
            });
        } catch (e) {
            console.error("Failed to update preference", e);
            fetchUser(); // Revert on error
        }
    };

    // Helper for updating profile fields
    const saveProfileField = async (field: string, value: string) => {
        try {
            const res = await axios.put('/api/auth/me', { [field]: value });
            if (res.data.success) {
                setUser((prev: any) => ({ ...prev, [field]: value }));
                setEditMode(null);
            }
        } catch (e) {
            console.error("Failed to update profile", e);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading settings...</div>;
    if (!user) return <div className="min-h-screen flex items-center justify-center text-red-400">Failed to load user settings.</div>;

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
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl uppercase">
                                        {user.displayName?.[0] || user.name?.[0] || user.email[0]}
                                    </div>
                                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                                        <Camera size={14} /> Upload
                                    </button>
                                </div>
                            }
                        />

                        {/* Display Name Edit */}
                        <div className="py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-0.5">Display Name</p>
                                <p className="text-sm text-gray-500">Your name as shown across ReedAI.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {editMode === 'displayName' ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                                            autoFocus
                                        />
                                        <button onClick={() => saveProfileField('displayName', tempValue)} className="text-green-600 font-medium text-sm">Save</button>
                                        <button onClick={() => setEditMode(null)} className="text-gray-400 text-sm">Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-sm text-gray-900">{user.displayName || user.name || "Not set"}</span>
                                        <button
                                            onClick={() => { setEditMode('displayName'); setTempValue(user.displayName || user.name || ""); }}
                                            className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-0.5"
                                        >
                                            Edit <ChevronRight size={14} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Username Edit */}
                        <div className="py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-0.5">Username</p>
                                <p className="text-sm text-gray-500">Your unique identifier on the platform.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {editMode === 'username' ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={tempValue}
                                            onChange={(e) => setTempValue(e.target.value)}
                                            className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                                            autoFocus
                                        />
                                        <button onClick={() => saveProfileField('username', tempValue)} className="text-green-600 font-medium text-sm">Save</button>
                                        <button onClick={() => setEditMode(null)} className="text-gray-400 text-sm">Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-sm text-gray-600">@{user.username || "unset"}</span>
                                        <button
                                            onClick={() => { setEditMode('username'); setTempValue(user.username || ""); }}
                                            className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-0.5"
                                        >
                                            Edit <ChevronRight size={14} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        <SettingRow
                            label="Email Address"
                            description="The email used for account notifications."
                            value={user.email}
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
                                {TUTOR_STYLES.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => updatePreference('tutorStyle', style.id)}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                            user.preferences?.tutorStyle === style.id
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
                            checked={user.preferences?.voiceSpeed === 'slow'}
                            onChange={(v) => updatePreference('voiceSpeed', v ? 'slow' : 'normal')}
                        />
                        <ToggleRow
                            label="Read Explanations Calmly"
                            description="Use a calm, measured tone when explaining concepts."
                            checked={user.preferences?.readCalmly}
                            onChange={(v) => updatePreference('readCalmly', v)}
                        />
                    </motion.div>
                );
            // ... (Other cases simplified for brevity, following same pattern)
            case "voice": return renderVoiceSettings(user, updatePreference);
            case "notifications": return renderNotificationSettings(user, updatePreference);
            case "security": return renderSecuritySettings(user);
            case "support": return renderSupportSettings();
            default: return null;
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
                    {/* ... Sidebar Tabs ... */}
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-3 mb-2">Main</p>
                        {TABS.filter(t => t.group === "main").map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={clsx("w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all", activeTab === tab.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50")}>
                                <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} />}
                            </button>
                        ))}
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-3 mt-6 mb-2">Other</p>
                        {TABS.filter(t => t.group === "other").map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={clsx("w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all", activeTab === tab.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50")}>
                                <span className="flex items-center gap-3">{tab.icon} {tab.label}</span>
                                {activeTab === tab.id && <ChevronRight size={16} />}
                            </button>
                        ))}
                    </div>
                </motion.aside>

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

// --- Specific Render Helpers to keep main component clean ---
const renderVoiceSettings = (user: any, updatePreference: any) => (
    <motion.div key="voice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-3 mb-2">
            <Mic size={20} className="text-gray-400" />
            <h2 className="text-xl font-bold text-[#1E2A5E]">Voice Settings</h2>
        </div>
        <p className="text-gray-500 mb-6">Control how the tutor voice sounds.</p>
        <div className="py-5 border-b border-gray-100">
            <p className="font-medium text-gray-900 mb-3">Voice Speed</p>
            <div className="flex gap-2">
                {VOICE_SPEEDS.map(speed => (
                    <button key={speed.id} onClick={() => updatePreference('voiceSpeed', speed.id)} className={clsx("px-6 py-2 rounded-lg text-sm font-medium transition-all flex-1", user.preferences.voiceSpeed === speed.id ? "bg-[#1E2A5E] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200")}>
                        {speed.label}
                    </button>
                ))}
            </div>
        </div>
    </motion.div>
);

const renderNotificationSettings = (user: any, updatePreference: any) => (
    <motion.div key="notifications" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-3 mb-2"><Bell size={20} className="text-gray-400" /><h2 className="text-xl font-bold text-[#1E2A5E]">Notifications</h2></div>
        <p className="text-gray-500 mb-6">Manage what notifications you receive.</p>
        <ToggleRow label="Session Summaries" description="Receive a summary after each tutoring session." checked={true} onChange={() => { }} />
    </motion.div>
);

const renderSecuritySettings = (user: any) => (
    <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-3 mb-2"><Shield size={20} className="text-gray-400" /><h2 className="text-xl font-bold text-[#1E2A5E]">Privacy & Security</h2></div>
        <p className="text-gray-500 mb-6">Manage your account security settings.</p>
        <SettingRow label="Email" description="Account email" value={user.email} />
        <div className="pt-6 mt-6 border-t border-gray-100 space-y-3">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-gray-50 transition-colors text-left"><LogOut size={18} className="text-gray-500" /><div><p className="font-medium text-gray-900">Log out</p></div></button>
        </div>
    </motion.div>
);

const renderSupportSettings = () => (
    <motion.div key="support" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <div className="flex items-center gap-3 mb-2"><HelpCircle size={20} className="text-gray-400" /><h2 className="text-xl font-bold text-[#1E2A5E]">Help & Support</h2></div>
        <p className="text-gray-500 mb-6">Get help or learn more about ReedAI.</p>
        <SettingRow label="Contact Support" description="Get in touch with us." value={<a href="mailto:support@reedai.com" className="text-blue-500">support@reedai.com</a>} />
    </motion.div>
);
