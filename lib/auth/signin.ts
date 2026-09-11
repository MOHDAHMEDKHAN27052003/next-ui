import apiClient from '@/lib/axios';

export interface SignInData {
  email: string;
  password: string;
}

export async function signIn(data: SignInData): Promise<{ success: boolean; error?: string; }> {
  try {
    await apiClient.post('/auth/signin', data);
    return { success: true };
  } catch (err: any) {
    const message = err.response?.data?.message || err.message || 'An error occurred';
    return { success: false, error: message };
  }
}