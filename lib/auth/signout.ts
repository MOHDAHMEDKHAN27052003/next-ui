import apiClient from "../axios";

export async function signOutUser(): Promise<{ success: boolean; error?: string }> {
    try {
        await apiClient.post('/auth/signout');
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            error: error?.response?.data?.message || 'Failed to sign out',
        };
    }
}