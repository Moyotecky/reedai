import { Mic, MessageSquare, UploadCloud } from "lucide-react";

// Mock data
const RECENT_ACTIVITY = [
    { id: 1, type: "voice", title: "Voice Session on Linear Algebra", date: "10 mins ago", icon: Mic, color: "text-blue-500 bg-blue-50" },
    { id: 2, type: "chat", title: "Chat about Essay Structure", date: "2 hours ago", icon: MessageSquare, color: "text-teal-500 bg-teal-50" },
    { id: 3, type: "upload", title: "Uploaded 'Lecture_5.pdf'", date: "Yesterday", icon: UploadCloud, color: "text-purple-500 bg-purple-50" },
];

const RecentActivityList = () => {
    // For now, simple empty state as activity model is complex
    const isEmpty = true;

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans">Recent Activity</h3>
                <span className="text-xs text-gray-400">Last 24h</span>
            </div>

            <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Mic className="text-gray-300" size={24} />
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1">No recent activity</h4>
                <p className="text-xs text-gray-400 max-w-[200px]">
                    Your interactions with tutors and chat will appear here.
                </p>
            </div>
        </div>
    );
};

export default RecentActivityList;
