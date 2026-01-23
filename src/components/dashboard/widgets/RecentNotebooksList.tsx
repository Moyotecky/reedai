import { BookOpen, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axios from 'axios';


const RecentNotebooksList = () => {
    const [notebooks, setNotebooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotebooks = async () => {
            try {
                const res = await axios.get('/api/notebooks');
                if (res.data.success) {
                    setNotebooks(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching notebooks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotebooks();
    }, []);

    // Empty State
    if (!loading && notebooks.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <BookOpen className="text-gray-300" size={24} />
                </div>
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans mb-1">No notebooks yet</h3>
                <p className="text-sm text-gray-400 mb-4">Start your first research session.</p>
                <Link href="/dashboard/chat" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">
                    Create Notebook →
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#1E2A5E] font-dm-sans">Recent Notebooks</h3>
                <Link href="/dashboard/notebooks" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700">View all</Link>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="space-y-3">
                        <div className="h-14 bg-gray-50 rounded-xl animate-pulse" />
                        <div className="h-14 bg-gray-50 rounded-xl animate-pulse" />
                    </div>
                ) : (
                    notebooks.map((notebook) => (
                        <Link href={`/dashboard/notebooks/${notebook._id}`} key={notebook._id} className="group flex items-center justify-between p-3 -mx-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors line-clamp-1">
                                        {notebook.title}
                                    </h4>
                                    <p className="text-xs text-gray-400">
                                        {new Date(notebook.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <ExternalLink size={16} className="text-gray-300 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all" />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentNotebooksList;
