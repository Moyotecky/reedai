import { Play, BookOpen } from "lucide-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ContinueLearningCard = () => {
    const [latestNotebook, setLatestNotebook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await axios.get('/api/notebooks?limit=1'); // API ignores limit for now but returns list
                if (res.data.success && res.data.data.length > 0) {
                    setLatestNotebook(res.data.data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

    if (loading) return <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full animate-pulse" />;

    if (!latestNotebook) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full items-center justify-center text-center">
                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="text-indigo-500" size={20} />
                </div>
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans mb-1">Start Learning</h3>
                <p className="text-sm text-gray-500 mb-4">Create your first notebook.</p>
                <Link href="/dashboard/chat" className="w-full py-2 rounded-xl bg-[#1E2A5E] text-white font-medium text-sm hover:bg-[#151E45] transition-colors">
                    Start Session
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1 block">
                        Pick up where you left off
                    </span>
                    <h3 className="font-bold text-[#1E2A5E] font-dm-sans text-lg leading-tight line-clamp-2">
                        {latestNotebook.title}
                    </h3>
                </div>
            </div>

            <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                Last updated {new Date(latestNotebook.updatedAt).toLocaleDateString()}
            </p>

            <div className="mt-auto">
                <Link href={`/dashboard/notebooks/${latestNotebook._id}`} className="w-full py-2.5 rounded-xl bg-[#F0F4FF] text-[#1E2A5E] font-medium text-sm hover:bg-[#E0E7FF] transition-colors flex items-center justify-center gap-2">
                    <Play size={16} fill="currentColor" />
                    Continue
                </Link>
            </div>
        </div>
    );
};

export default ContinueLearningCard;
