import { Mic } from "lucide-react";

interface PrimaryActionCardProps {
    tutorName?: string;
    tutorStyle?: string;
}

const PrimaryActionCard = ({ tutorName = "Alex", tutorStyle = "Exam-focused Tutor" }: PrimaryActionCardProps) => {
    return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-50 border-2 border-white shadow-sm flex items-center justify-center text-3xl">
                    👨‍🏫
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                            Current Tutor
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1E2A5E] font-dm-sans">{tutorName}</h2>
                    <p className="text-gray-500">{tutorStyle}</p>
                </div>
            </div>

            <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                <button className="btn-base btn-blue py-3 px-8 flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                    <Mic size={20} />
                    Start voice session
                </button>
                <button className="text-sm font-medium text-gray-500 hover:text-[#1E2A5E] transition-colors">
                    Switch tutor
                </button>
            </div>
        </div>
    );
};

export default PrimaryActionCard;
