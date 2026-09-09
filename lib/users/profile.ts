// lib/users/profile.ts
import apiClient from '@/lib/axios';

export interface UserProfile {
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export async function fetchUserProfile(): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
    try {
        const response = await apiClient.get('/users/profile');
        return { success: true, data: response.data.data };
    } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'An error occurred';
        return { success: false, error: message };
    }
}