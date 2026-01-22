"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, BookOpen, FileText, ChevronDown, ChevronUp, Check, Sparkles, Plus, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

// --- Types ---
interface Task {
    id: string;
    title: string;
    reason: string;
    action: { label: string; href?: string; icon: React.ReactNode };
    status: "suggested" | "in_progress" | "completed";
}

// --- Mock Data ---
const INITIAL_TASKS: Task[] = [
    {
        id: "1",
        title: "Revisit Open Sets in Metric Spaces",
        reason: "You seemed unsure about definitions during your last session.",
        action: { label: "Start with tutor", href: "/dashboard/tutor", icon: <Mic size={14} /> },
        status: "suggested"
    },
    {
        id: "2",
        title: "Practice past questions on Limits",
        reason: "These questions appear frequently in exams.",
        action: { label: "Practice now", href: "/dashboard/tutor", icon: <Sparkles size={14} /> },
        status: "suggested"
    },
    {
        id: "3",
        title: "Review Linear Algebra notebook",
        reason: "A quick review will strengthen recall.",
        action: { label: "Open notebook", href: "/dashboard/notebooks/2", icon: <BookOpen size={14} /> },
        status: "in_progress"
    },
    {
        id: "4",
        title: "Review distance functions",
        reason: "Completed during your last session.",
        action: { label: "Review again", href: "/dashboard/notebooks/1", icon: <FileText size={14} /> },
        status: "completed"
    },
    {
        id: "5",
        title: "Revise continuity examples",
        reason: "Marked as done 2 days ago.",
        action: { label: "Review again", href: "/dashboard/notebooks/1", icon: <FileText size={14} /> },
        status: "completed"
    }
];

// --- Components ---

function TaskCard({ task, onMarkDone, onStart }: { task: Task; onMarkDone: (id: string) => void; onStart?: (id: string) => void }) {
    const isCompleted = task.status === "completed";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={clsx(
                "p-5 rounded-2xl border transition-all group",
                isCompleted
                    ? "bg-gray-50/50 border-gray-100"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
            )}
        >
            <h3 className={clsx(
                "font-bold mb-2",
                isCompleted ? "text-gray-400 line-through" : "text-[#1E2A5E]"
            )}>
                {isCompleted && <Check size={14} className="inline mr-2 text-green-500" />}
                {task.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">{task.reason}</p>

            {!isCompleted && (
                <div className="flex items-center gap-3 flex-wrap">
                    <Link
                        href={task.action.href || "#"}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1E2A5E] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors shadow-sm"
                    >
                        {task.action.icon} {task.action.label}
                    </Link>
                    {task.status === "suggested" && onStart && (
                        <button
                            onClick={() => onStart(task.id)}
                            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            Move to In Progress
                        </button>
                    )}
                    <button
                        onClick={() => onMarkDone(task.id)}
                        className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Mark as done
                    </button>
                </div>
            )}
        </motion.div>
    );
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskReason, setNewTaskReason] = useState("");

    const suggestedTasks = tasks.filter(t => t.status === "suggested");
    const inProgressTasks = tasks.filter(t => t.status === "in_progress");
    const completedTasks = tasks.filter(t => t.status === "completed");
    const hasActiveTasks = suggestedTasks.length > 0 || inProgressTasks.length > 0;

    const handleMarkDone = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "completed" } : t));
    };

    const handleStart = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "in_progress" } : t));
    };

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle.trim(),
            reason: newTaskReason.trim() || "Custom task you added.",
            action: { label: "Start with tutor", href: "/dashboard/tutor", icon: <Mic size={14} /> },
            status: "suggested"
        };

        setTasks(prev => [newTask, ...prev]);
        setNewTaskTitle("");
        setNewTaskReason("");
        setShowNewTaskForm(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-6 lg:p-10 font-dm-sans">

            {/* Header */}
            <div className="flex items-start justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-[#1E2A5E] mb-2">Tasks</h1>
                    <p className="text-gray-500">Suggested study steps based on your learning.</p>
                    <p className="text-xs text-gray-400 mt-1">These are optional. Do what works for you.</p>
                </div>

                <button
                    onClick={() => setShowNewTaskForm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#1E2A5E] text-white font-medium text-sm rounded-xl hover:bg-black transition-colors shadow-lg"
                >
                    <Plus size={16} /> New Task
                </button>
            </div>

            {/* New Task Form (Modal-like) */}
            <AnimatePresence>
                {showNewTaskForm && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-8 p-6 bg-white rounded-2xl border border-gray-200 shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#1E2A5E]">Create a new task</h3>
                            <button
                                onClick={() => setShowNewTaskForm(false)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Task title</label>
                                <input
                                    type="text"
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                    placeholder="e.g., Review Chapter 5 on Integration"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10 focus:border-[#1E2A5E]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Reason (optional)</label>
                                <input
                                    type="text"
                                    value={newTaskReason}
                                    onChange={(e) => setNewTaskReason(e.target.value)}
                                    placeholder="e.g., Need to solidify understanding before exam"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10 focus:border-[#1E2A5E]"
                                />
                            </div>
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    onClick={handleAddTask}
                                    disabled={!newTaskTitle.trim()}
                                    className={clsx(
                                        "px-5 py-2.5 font-medium text-sm rounded-xl transition-all",
                                        newTaskTitle.trim()
                                            ? "bg-[#1E2A5E] text-white hover:bg-black shadow-lg"
                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    )}
                                >
                                    Add Task
                                </button>
                                <button
                                    onClick={() => setShowNewTaskForm(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty State */}
            {!hasActiveTasks && completedTasks.length === 0 && !showNewTaskForm && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 max-w-md mx-auto"
                >
                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Check size={32} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E2A5E] mb-3">You're all caught up.</h2>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Start a tutoring session and ReedAI will suggest what to study next.
                    </p>
                    <Link
                        href="/dashboard/tutor"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E2A5E] text-white font-medium rounded-xl hover:bg-black transition-colors shadow-lg"
                    >
                        <Mic size={18} /> Start a session
                    </Link>
                </motion.div>
            )}

            {/* Kanban Layout */}
            {(hasActiveTasks || showNewTaskForm) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

                    {/* Suggested Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Suggested</h2>
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{suggestedTasks.length}</span>
                        </div>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {suggestedTasks.map(task => (
                                    <TaskCard key={task.id} task={task} onMarkDone={handleMarkDone} onStart={handleStart} />
                                ))}
                            </AnimatePresence>
                            {suggestedTasks.length === 0 && (
                                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-sm">
                                    No new suggestions yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* In Progress Column */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                            <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">In Progress</h2>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{inProgressTasks.length}</span>
                        </div>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {inProgressTasks.map(task => (
                                    <TaskCard key={task.id} task={task} onMarkDone={handleMarkDone} />
                                ))}
                            </AnimatePresence>
                            {inProgressTasks.length === 0 && (
                                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-sm">
                                    Nothing in progress
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Completed Section (Collapsible) */}
            {completedTasks.length > 0 && (
                <div className="border-t border-gray-200 pt-8">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors mb-4"
                    >
                        {showCompleted ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        Completed ({completedTasks.length})
                    </button>

                    <AnimatePresence>
                        {showCompleted && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 overflow-hidden"
                            >
                                {completedTasks.map(task => (
                                    <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50">
                                        <Check size={16} className="text-green-500 shrink-0" />
                                        <span className="text-sm text-gray-500 line-through">{task.title}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
