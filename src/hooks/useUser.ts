import { useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
    _id: string;
    email: string;
    name?: string;
    username?: string;
    credits: number;
    avatar?: string;
    role: string;
}

export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/auth/me');
                if (res.data.success) {
                    setUser(res.data.data);
                } else {
                    setError('Failed to fetch user');
                }
            } catch (err: any) {
                console.error("Error fetching user:", err);
                setError(err.message || 'Error fetching user');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
}
