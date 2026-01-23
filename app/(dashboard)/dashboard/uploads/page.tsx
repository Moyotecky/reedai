"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Image, File, Table2, Search, Filter, Plus, MoreVertical, Download, Trash2, Eye, X, Upload, Check, Clock, Loader2 } from "lucide-react";
import clsx from "clsx";
import axios from 'axios';

// --- Types ---
interface FileItem {
    id: string;
    name: string;
    type: "pdf" | "doc" | "image" | "spreadsheet";
    size: string;
    uploadedBy: { name: string; email: string; avatar: string };
    lastModified: string;
}

// --- Mock Data ---


const FILE_TYPES = [
    { id: "all", label: "View all", icon: null },
    { id: "doc", label: "Documents", icon: <FileText size={14} /> },
    { id: "spreadsheet", label: "Spreadsheets", icon: <Table2 size={14} /> },
    { id: "pdf", label: "PDFs", icon: <File size={14} /> },
    { id: "image", label: "Images", icon: <Image size={14} /> },
];

import { useFileUpload } from "@/hooks/use-file-upload";

// --- Upload Modal Component ---
function UploadModal({ isOpen, onClose, onUploadSuccess }: { isOpen: boolean; onClose: () => void; onUploadSuccess: (file: any) => void }) {
    const { uploadFile, uploading, progress, error } = useFileUpload();
    const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
    const [uploadStatuses, setUploadStatuses] = useState<{ name: string; status: 'pending' | 'uploading' | 'completed' | 'error'; progress: number }[]>([]);

    const handleFiles = (fList: File[]) => {
        setFilesToUpload(prev => [...prev, ...fList]);
        setUploadStatuses(prev => [
            ...prev,
            ...fList.map(f => ({ name: f.name, status: 'pending' as const, progress: 0 }))
        ]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFiles(Array.from(e.dataTransfer.files));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(Array.from(e.target.files || []));
    };

    const startUpload = async () => {
        for (const file of filesToUpload) {
            // Skip already uploaded
            if (uploadStatuses.find(s => s.name === file.name)?.status === 'completed') continue;

            setUploadStatuses(prev => prev.map(s => s.name === file.name ? { ...s, status: 'uploading' } : s));

            // Logic to sync progress from single hook to multi-file list is tricky with simple hook
            // For MVP, we stream one by one and use the hook's progress for the current file
            // Ideally useFileUpload should handle multiple or be instantiated per file. 
            // We will simplify: instantiated hook uploadFile returns promise.
            // We will just show "Uploading..." with indeterminate or single progress bar if simple.

            // To properly track progress of *current* file:
            const result = await uploadFile(file);

            if (result) {
                setUploadStatuses(prev => prev.map(s => s.name === file.name ? { ...s, status: 'completed', progress: 100 } : s));
                onUploadSuccess({
                    id: result.publicId,
                    name: file.name,
                    type: result.format === 'pdf' ? 'pdf' : result.format?.includes('image') ? 'image' : 'doc',
                    size: (result.bytes / 1024 / 1024).toFixed(2) + ' MB',
                    uploadedBy: { name: 'You', email: 'you@university.edu', avatar: 'YU' },
                    lastModified: 'Just now'
                });
            } else {
                setUploadStatuses(prev => prev.map(s => s.name === file.name ? { ...s, status: 'error' } : s));
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Upload size={20} className="text-gray-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Upload Study Materials</h2>
                                        <p className="text-sm text-gray-500">Upload your notes in PDF or DOC format.</p>
                                    </div>
                                </div>
                                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                                    <X size={20} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Drop Zone */}
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                className="border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl p-8 text-center transition-colors mb-6"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <Upload size={24} className="text-gray-400" />
                                </div>
                                <p className="text-gray-600">
                                    <label className="text-blue-500 font-medium cursor-pointer hover:underline">
                                        Choose a file
                                        <input type="file" className="hidden" multiple onChange={handleFileSelect} accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg" />
                                    </label>
                                    {" "}or Drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-2">PDF, DOC, XLS, and images up to 50 MB</p>
                            </div>

                            {/* File List */}
                            {uploadStatuses.length > 0 && (
                                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                                    {uploadStatuses.map((file, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                                                    {file.name.split('.').pop()?.toUpperCase()}
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {file.status === 'completed' ? <span className="text-green-600">Completed</span> :
                                                            file.status === 'error' ? <span className="text-red-600">Error</span> :
                                                                file.status === 'uploading' ? <span className="text-blue-600">Uploading...</span> : 'Pending'}
                                                    </p>
                                                </div>
                                            </div>
                                            {file.status === 'completed' && <Check size={16} className="text-green-500 shrink-0" />}
                                            {file.status === 'uploading' && <Loader2 size={16} className="text-blue-500 animate-spin shrink-0" />}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                            {/* Actions */}
                            <div className="flex items-center justify-between">
                                <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                                    Cancel
                                </button>
                                <button
                                    onClick={startUpload}
                                    disabled={uploading || filesToUpload.length === 0}
                                    className={clsx(
                                        "px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2",
                                        uploading || filesToUpload.length === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-blue-500 text-white hover:bg-blue-600"
                                    )}
                                >
                                    {uploading ? <Loader2 size={16} className="animate-spin" /> : null}
                                    {uploading ? 'Uploading...' : 'Upload Files'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// --- File Icon Component ---
function FileIcon({ type }: { type: FileItem["type"] }) {
    const icons = {
        pdf: <File size={18} className="text-red-500" />,
        doc: <FileText size={18} className="text-blue-500" />,
        image: <Image size={18} className="text-green-500" />,
        spreadsheet: <Table2 size={18} className="text-emerald-500" />,
    };
    return (
        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
            {icons[type]}
        </div>
    );
}

// --- Main Page ---
export default function UploadsPage() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Fetch Files
    const fetchFiles = async () => {
        try {
            const res = await axios.get('/api/uploads');
            if (res.data.success) {
                // Map DB schema to UI schema
                const mappedFiles = res.data.data.map((f: any) => ({
                    id: f._id,
                    name: f.name,
                    type: f.type,
                    size: (f.size / 1024 / 1024).toFixed(2) + ' MB',
                    uploadedBy: { name: 'You', email: '', avatar: 'ME' }, // Ideally fetch user info or store it
                    lastModified: new Date(f.createdAt).toLocaleDateString()
                }));
                setFiles(mappedFiles);
            }
        } catch (error) {
            console.error("Failed to fetch files", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const filteredFiles = files.filter(f => {
        const matchesType = activeFilter === "all" || f.type === activeFilter;
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    const handleDelete = (id: string) => {
        // Optimistic update - ideally call API to delete
        setFiles(prev => prev.filter(f => f.id !== id));
        setOpenMenuId(null);
    };

    const handleUploadComplete = async (newFilePayload: any) => {
        // Save to DB
        try {
            const res = await axios.post('/api/uploads', {
                name: newFilePayload.name,
                url: "https://cloudinary.com/...", // Metadata from payload. In real app, we need the stored URL from use-file-upload hook
                type: newFilePayload.type,
                size: parseFloat(newFilePayload.size) * 1024 * 1024, // Approx back to bytes
                publicId: newFilePayload.id
            });

            if (res.data.success) {
                fetchFiles(); // Refresh list
            }
        } catch (e) {
            console.error("Failed to save file metadata", e);
        }
    };

    return (
        <div className="min-h-screen font-dm-sans">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl lg:mt-8 font-bold text-[#1E2A5E] mb-2">All Uploads</h1>
                <p className="text-gray-500 text-sm">Your uploaded study materials and documents.</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                {/* Type Filters */}
                <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {FILE_TYPES.map(type => (
                        <button
                            key={type.id}
                            onClick={() => setActiveFilter(type.id)}
                            className={clsx(
                                "px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-1.5",
                                activeFilter === type.id
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-600 hover:bg-gray-100"
                            )}
                        >
                            {type.icon} {type.label}
                        </button>
                    ))}
                </div>

                {/* Search + Add */}
                <div className="flex items-center gap-3">
                    <div className="relative flex-1 sm:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1E2A5E]/10"
                        />
                    </div>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1E2A5E] text-white font-medium rounded-lg hover:bg-black transition-colors whitespace-nowrap"
                    >
                        <Plus size={16} /> Upload
                    </button>
                </div>
            </div>

            {/* Files Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Table Header */}
                <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <div className="col-span-5">File name</div>
                    <div className="col-span-3">Uploaded by</div>
                    <div className="col-span-3">Last modified</div>
                    <div className="col-span-1"></div>
                </div>

                {/* File Rows */}
                <div className="divide-y divide-gray-50">
                    {filteredFiles.map((file, i) => (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.03 }}
                            className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-gray-50/50 transition-colors items-center relative"
                        >
                            {/* File Name */}
                            <div className="sm:col-span-5 flex items-center gap-3">
                                <FileIcon type={file.type} />
                                <div className="min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{file.name}</p>
                                    <p className="text-xs text-gray-400">{file.size} • {file.type.toUpperCase()}</p>
                                </div>
                            </div>

                            {/* Uploaded By */}
                            <div className="sm:col-span-3 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {file.uploadedBy.avatar}
                                </div>
                                <div className="min-w-0 hidden sm:block">
                                    <p className="text-sm font-medium text-gray-700 truncate">{file.uploadedBy.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{file.uploadedBy.email}</p>
                                </div>
                            </div>

                            {/* Last Modified */}
                            <div className="sm:col-span-3 text-sm text-gray-500 hidden sm:block">
                                {file.lastModified}
                            </div>

                            {/* Actions */}
                            <div className="sm:col-span-1 flex justify-end relative">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === file.id ? null : file.id)}
                                    className="p-2 hover:bg-gray-100 rounded-lg text-gray-400"
                                >
                                    <MoreVertical size={16} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {openMenuId === file.id && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20"
                                        >
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                                <Eye size={16} /> View
                                            </button>
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                                                <Download size={16} /> Download
                                            </button>
                                            <button
                                                onClick={() => handleDelete(file.id)}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 size={16} /> Delete
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredFiles.length === 0 && (
                    <div className="text-center py-12">
                        <File size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">No files found.</p>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <UploadModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUploadSuccess={(newFile) => {
                    setFiles(prev => [newFile, ...prev]);
                    // Optional: Close modal after all done, or keep open. 
                    // For now, let user close manually or we can close if we want.
                }}
            />
        </div>
    );
}
