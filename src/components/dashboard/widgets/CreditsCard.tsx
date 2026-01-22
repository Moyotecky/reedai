import { ArrowRight, CreditCard } from "lucide-react";

const CreditsCard = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                    <CreditCard size={20} />
                </div>
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans">Credits Balance</h3>
            </div>

            <div className="mt-auto">
                <div className="text-3xl font-bold text-[#1E2A5E] mb-1">240</div>
                <div className="text-sm text-gray-500 mb-4">Credits remaining</div>

                <button className="text-sm font-medium text-[#2EC4B6] hover:text-[#25a094] flex items-center gap-1 transition-colors">
                    Buy credits <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default CreditsCard;
