import { Mic, MessageSquare, UploadCloud } from "lucide-react";

// Mock data
const RECENT_ACTIVITY = [
    { id: 1, type: "voice", title: "Voice Session on Linear Algebra", date: "10 mins ago", icon: Mic, color: "text-blue-500 bg-blue-50" },
    { id: 2, type: "chat", title: "Chat about Essay Structure", date: "2 hours ago", icon: MessageSquare, color: "text-teal-500 bg-teal-50" },
    { id: 3, type: "upload", title: "Uploaded 'Lecture_5.pdf'", date: "Yesterday", icon: UploadCloud, color: "text-purple-500 bg-purple-50" },
];

const RecentActivityList = () => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans">Recent Activity</h3>
                <span className="text-xs text-gray-400">Last 24h</span>
            </div>

            <div className="relative pl-2">
                {/* Timeline Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100" />

                <div className="space-y-6">
                    {RECENT_ACTIVITY.map((activity) => (
                        <div key={activity.id} className="relative flex items-center gap-4">
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white ${activity.color}`}>
                                <activity.icon size={18} />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-900">
                                    {activity.title}
                                </h4>
                                <p className="text-xs text-gray-400">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentActivityList;
