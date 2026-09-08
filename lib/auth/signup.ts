import apiClient from '@/lib/axios';

export interface SignUpData {
    name: string;
    email: string;
    password: string;
}

export async function signUp(data: SignUpData): Promise<{ success: boolean; error?: string, message?: string }> {
    try {
        const response = await apiClient.post('/auth/signup', data);
        return { success: true, message: response.data.message };
    } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'An error occurred';
        return { success: false, error: message };
    }
}