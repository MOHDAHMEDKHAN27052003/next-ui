import apiClient from '@/lib/axios';

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export async function signUp(data: SignUpData): Promise<{ success: boolean; error?: string }> {
    try {
        await apiClient.post('/auth/signup', data);
        return { success: true };
    } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'An error occurred';
        return { success: false, error: message };
    }
}