import { Sparkles, CheckCircle2 } from "lucide-react";
import Link from 'next/link';

const NextStepCard = () => {
    return (
        <div className="bg-gradient-to-br from-[#1E2A5E] to-[#2D3A75] rounded-2xl p-6 shadow-sm text-white flex flex-col h-full relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />

            <div className="flex items-center gap-2 mb-4 relative z-10">
                <Sparkles size={18} className="text-[#2EC4B6]" />
                <h3 className="font-bold font-dm-sans text-sm tracking-wide text-gray-200">SUGGESTED NEXT STEP</h3>
            </div>

            <p className="text-lg font-medium mb-6 relative z-10 leading-relaxed">
                Ready to explore a new topic? <span className="text-[#2EC4B6]">Start a new research session</span> to expand your knowledge.
            </p>

            <div className="mt-auto flex items-center gap-3 relative z-10">
                <Link href="/dashboard/chat" className="flex-1 py-2.5 rounded-xl bg-white text-[#1E2A5E] font-medium text-sm hover:bg-gray-50 transition-colors text-center">
                    New Session
                </Link>
                <button className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors" title="Mark as done">
                    <CheckCircle2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default NextStepCard;
