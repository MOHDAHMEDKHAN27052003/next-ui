// /lib/books/delete.ts
import apiClient from "../axios";

interface DeleteBookResponse {
    success: boolean;
    message?: string;
}

export async function deleteBook(id: string): Promise<DeleteBookResponse> {
    try {
        await apiClient.delete(`/books/${id}`);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.message ||
                "Failed to delete book",
        };
    }
}