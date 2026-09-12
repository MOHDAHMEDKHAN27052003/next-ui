// /app/books/create/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBook, Genre, GENRES } from '@/lib/books/create';

export default function CreateBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    ISBN: '',
    publicationYear: '',
    genre: '',
    quantity: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await createBook({
      title: formData.title,
      author: formData.author,
      ISBN: Number(formData.ISBN),
      publicationYear: Number(formData.publicationYear),
      genre: formData.genre as Genre,
      quantity: Number(formData.quantity),
    });

    if (result.success) {
      router.push('/books');
    } else {
      setError(result.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Book</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ISBN</label>
          <input
            type="number"
            name="ISBN"
            value={formData.ISBN}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Publication Year</label>
          <input
            type="number"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>
          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="" disabled>
              Select a genre
            </option>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Book'}
        </button>
      </form>
    </div>
  );
}