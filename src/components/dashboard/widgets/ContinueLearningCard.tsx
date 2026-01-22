import { Play } from "lucide-react";

const ContinueLearningCard = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 block">
                        Last Topic
                    </span>
                    <h3 className="font-bold text-[#1E2A5E] font-dm-sans text-lg leading-tight">
                        Linear Algebra: <br /> Eigenvectors
                    </h3>
                </div>
            </div>

            <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                We were discussing the geometric interpretation of eigenvectors and how they scale...
            </p>

            <div className="mt-auto">
                <button className="w-full py-2.5 rounded-xl bg-[#F0F4FF] text-[#1E2A5E] font-medium text-sm hover:bg-[#E0E7FF] transition-colors flex items-center justify-center gap-2">
                    <Play size={16} fill="currentColor" />
                    Continue this topic
                </button>
            </div>
        </div>
    );
};

export default ContinueLearningCard;
