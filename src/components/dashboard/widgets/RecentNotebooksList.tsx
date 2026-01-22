import { BookOpen, ExternalLink } from "lucide-react";

// Mock data
const RECENT_NOTEBOOKS = [
    { id: 1, title: "Calculus I: Limits & Derivatives", date: "2 hours ago" },
    { id: 2, title: "Introduction to Psychology", date: "Yesterday" },
    { id: 3, title: "Macroeconomics 101", date: "3 days ago" },
];

const RecentNotebooksList = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans">Recent Notebooks</h3>
                <button className="text-xs font-semibold text-indigo-500 hover:text-indigo-700">View all</button>
            </div>

            <div className="space-y-4">
                {RECENT_NOTEBOOKS.map((notebook) => (
                    <div key={notebook.id} className="group flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                    {notebook.title}
                                </h4>
                                <p className="text-xs text-gray-400">{notebook.date}</p>
                            </div>
                        </div>
                        <ExternalLink size={16} className="text-gray-300 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentNotebooksList;
