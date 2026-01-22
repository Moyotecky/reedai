import { useState } from 'react';

interface UploadResult {
    url: string;
    publicId: string;
    format: string;
    bytes: number;
}

export function useFileUpload() {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: File): Promise<UploadResult | null> => {
        setUploading(true);
        setProgress(0);
        setError(null);

        try {
            // 1. Get Signature from Backend
            // We assume the token is in localStorage for client-side auth headers if we aren't using cookies for this API call?
            // Actually, we are using cookies for Auth, so standard fetch should send cookies if same-origin.
            // BUT, if we fetch from client to nextjs API, validation happens.

            // However, verifyToken in API checks Authorization Header 'Bearer ...'.
            // Middleware checks Cookie.
            // My API routes currently verify Header. 
            // I should update API to check Cookie OR Header.
            // For now, let's assume we pull token from localStorage if we verify Header
            // OR simpler: just fetch signature.

            const token = localStorage.getItem('token'); // Fallback if using local storage
            const headers: Record<string, string> = {};
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const sigRes = await fetch('/api/uploads/signature', { headers });

            if (!sigRes.ok) throw new Error('Failed to get upload signature');

            const { data } = await sigRes.json();
            const { signature, timestamp, cloudName, apiKey, folder } = data;

            // 2. Upload to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', folder);

            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`);

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        const percent = Math.round((e.loaded / e.total) * 100);
                        setProgress(percent);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        const result = JSON.parse(xhr.responseText);
                        resolve({
                            url: result.secure_url,
                            publicId: result.public_id,
                            format: result.format,
                            bytes: result.bytes
                        });
                    } else {
                        reject(new Error('Cloudinary upload failed'));
                    }
                };

                xhr.onerror = () => reject(new Error('Network error during upload'));
                xhr.send(formData);
            });

        } catch (err: any) {
            setError(err.message || 'Upload failed');
            return null;
        } finally {
            setUploading(false);
        }
    };

    return { uploadFile, uploading, progress, error };
}
