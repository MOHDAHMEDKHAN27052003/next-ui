import apiClient from "@/lib/axios";

export interface Book {
    _id: string;
    title: string;
    author: string;
    ISBN: number;
    publicationYear: number;
    genre: string;
    quantity: number;
}

export interface GetBooksResponse {
    success: boolean;
    data?: Book[];
    message?: string;
}

export async function getBooks(): Promise<GetBooksResponse> {
    try {
        const response = await apiClient.get<{ success: boolean; data: Book[] }>(
            "/books"
        );
        return {
            success: true,
            data: response.data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message:
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch books",
        };
    }
}