"use client";

import { Book, getBooks } from "@/lib/books/getAll";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBooks = async () => {
    setLoading(true);
    const result = await getBooks();

    if (result.data) {
      setBooks(result.data);
      setError(null);
    } else if (result.message) {
      setError(result.message);
      setBooks([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-gray-500">No books found.</p>
        <button
          onClick={() => router.push("/books/create")}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium transition hover:bg-blue-700"
        >
          Create Book
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Books</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => router.push(`/books/${book._id}`)}
            className="flex cursor-pointer flex-col rounded-xl bg-white p-5 shadow-md transition hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              {book.title}
            </h2>

            <p className="mb-1 text-sm text-gray-600">
              <span className="font-medium text-gray-700">Author:</span>{" "}
              {book.author}
            </p>

            <p className="mb-1 text-sm text-gray-600">
              <span className="font-medium text-gray-700">Genre:</span>{" "}
              {book.genre}
            </p>

            <p className="mb-1 text-sm text-gray-600">
              <span className="font-medium text-gray-700">Year:</span>{" "}
              {book.publicationYear}
            </p>

            <p className="mb-1 text-sm text-gray-600">
              <span className="font-medium text-gray-700">ISBN:</span>{" "}
              {book.ISBN}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Qty:</span>{" "}
                {book.quantity}
              </span>

              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  book.quantity > 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {book.quantity > 0 ? "Available" : "Out of stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}