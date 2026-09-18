import apiClient from "../axios";

export interface Book {
  _id: string;
  title: string;
  author: string;
  ISBN: number;
  publicationYear: number;
  genre: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse {
  success: boolean;
  data?: Book;
  message?: string;
}

export const getBookById = async (id: string): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>(`/books/${id}`);
    
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Failed to fetch book',
    };
  }
};