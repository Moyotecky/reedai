"use client";

import { Check, Mic } from "lucide-react";
import clsx from "clsx";

export interface TutorProps {
    id: string;
    name: string;
    description: string;
    tags: string[];
    avatar: string; // Emoji for V1
    avatarColor: string; // Tailwind color class for bg
}

interface TutorCardProps {
    tutor: TutorProps;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const TutorCard = ({ tutor, isSelected, onSelect }: TutorCardProps) => {
    return (
        <div
            onClick={() => onSelect(tutor.id)}
            className={clsx(
                "group relative overflow-hidden rounded-2xl border p-4 transition-all duration-200 cursor-pointer flex items-center gap-4 sm:gap-6",
                isSelected
                    ? "bg-[#F0F4FF] border-indigo-200 shadow-sm ring-1 ring-indigo-100"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
            )}
        >
            {/* Avatar Section */}
            <div className={clsx(
                "relative flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-black/5",
                tutor.avatarColor
            )}>
                {tutor.avatar}

                {isSelected && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white ring-2 ring-white">
                        <Check size={12} strokeWidth={3} />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-[#1E2A5E] font-dm-sans truncate pr-2">
                        {tutor.name}
                    </h3>
                    {/* PC View Button - Visible on larger screens */}
                    <button
                        className={clsx(
                            "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                            isSelected
                                ? "bg-indigo-600 text-white"
                                : "bg-white border border-gray-200 text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100"
                        )}
                    >
                        {isSelected ? "Selected" : "Select tutor"}
                    </button>
                </div>

                <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                    {tutor.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                    {tutor.tags.map((tag) => (
                        <div
                            key={tag}
                            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-100/80 text-gray-500 text-[11px] font-medium tracking-wide uppercase group-hover:bg-white border border-transparent group-hover:border-gray-100 transition-colors"
                        >
                            {/* Optional: Tiny dot based on tag type? For now just grey pill */}
                            {tag === "Exam-focused" && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                            {(tag === "Beginner-friendly" || tag === "Very clear") && <span className="w-1.5 h-1.5 rounded-full bg-green-400" />}
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Selection Indicator (since button is hidden on small screens) */}
            <div className="sm:hidden">
                {isSelected ? (
                    <div className="text-indigo-600">
                        <Check size={20} />
                    </div>
                ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-indigo-300" />
                )}
            </div>
        </div>
    );
};

export default TutorCard;
