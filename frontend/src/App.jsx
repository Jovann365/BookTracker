import { useEffect, useState } from 'react';
import BookForm from './components/BookForm.jsx';
import BookList from './components/BookList.jsx';
import { fetchBooks, createBook, updateBook, deleteBook } from './api/books.js';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleSave = async (payload) => {
    if (editing) {
      await updateBook(editing._id, payload);
      setEditing(null);
    } else {
      await createBook(payload);
    }
    await loadBooks();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this book?')) return;
    await deleteBook(id);
    await loadBooks();
  };

  return (
    <div className="container">
      <header>
        <h1>📚 Book Tracker</h1>
        <p className="subtitle">Keep track of what you've read, are reading, and want to read.</p>
      </header>

      <BookForm
        onSave={handleSave}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {error && <div className="error">Error: {error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BookList books={books} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </div>
  );
}
