// /app/books/[id]/page.tsx
import DeleteBookButton from "@/components/deleteBookButton";
import { getBookById } from "@/lib/books/get";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const response = await getBookById(id);

  if (!response.success || !response.data) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-2 text-gray-700">
          {response.message || "Book not found"}
        </p>
      </div>
    );
  }

  const book = response.data;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>

      <div className="space-y-3 bg-white shadow-md rounded-lg p-6 border">
        <DetailRow label="ID" value={book._id} />
        <DetailRow label="Author" value={book.author} />
        <DetailRow label="ISBN" value={book.ISBN.toString()} />
        <DetailRow
          label="Publication Year"
          value={book.publicationYear.toString()}
        />
        <DetailRow label="Genre" value={book.genre} />
        <DetailRow label="Quantity" value={book.quantity.toString()} />
        <DetailRow
          label="Created At"
          value={new Date(book.createdAt).toLocaleString()}
        />
        <DetailRow
          label="Updated At"
          value={new Date(book.updatedAt).toLocaleString()}
        />
      </div>

      <DeleteBookButton id={book._id} />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex border-b pb-2">
      <span className="font-semibold w-40 text-gray-600">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}