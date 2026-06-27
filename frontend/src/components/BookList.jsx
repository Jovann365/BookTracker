const statusLabels = {
  'want-to-read': 'Want to read',
  reading: 'Reading',
  read: 'Read',
};

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) {
    return <p className="empty">No books yet. Add your first one above.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <article key={book._id} className={`book status-${book.status}`}>
          <header>
            <h3>{book.title}</h3>
            <span className="status-badge">{statusLabels[book.status]}</span>
          </header>
          <p className="author">by {book.author}</p>
          <p className="meta">
            {book.genre} {book.year ? `· ${book.year}` : ''}
            {book.rating > 0 && ` · ${'★'.repeat(book.rating)}${'☆'.repeat(5 - book.rating)}`}
          </p>
          <div className="actions">
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book._id)} className="danger">
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
