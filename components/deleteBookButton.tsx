"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBook } from "@/lib/books/delete";

export default function DeleteBookButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Confirm delete");
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    const response = await deleteBook(id);

    if (response.message) {
      setError(response.message);
      setLoading(false);
    }

    router.push("/books");
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Deleting..." : "Delete Book"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}