// /app/lib/books/create.ts

import apiClient from "../axios";

export type Genre =
    | 'Fiction'
    | 'Non-Fiction'
    | 'Science Fiction'
    | 'Fantasy'
    | 'Mystery'
    | 'Thriller'
    | 'Romance'
    | 'Horror'
    | 'Biography'
    | 'History'
    | 'Science'
    | 'Poetry'
    | 'Drama'
    | 'Adventure'
    | 'Young Adult'
    | 'Children';

export const GENRES: Genre[] = [
    'Fiction',
    'Non-Fiction',
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'Thriller',
    'Romance',
    'Horror',
    'Biography',
    'History',
    'Science',
    'Poetry',
    'Drama',
    'Adventure',
    'Young Adult',
    'Children',
];

interface CreateBookRequest {
    title: string;
    author: string;
    ISBN: number;
    publicationYear: number;
    genre: Genre;
    quantity: number;
}

interface CreateBookResponse {
    success: boolean;
    message?: string;
}

export async function createBook(data: CreateBookRequest): Promise<CreateBookResponse> {
    try {
        await apiClient.post('/books/create', data);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || 'Failed to create book',
        };
    }
}