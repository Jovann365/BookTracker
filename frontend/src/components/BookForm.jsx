import { useEffect, useState } from 'react';

const emptyForm = {
  title: '',
  author: '',
  year: '',
  genre: '',
  status: 'want-to-read',
  rating: 0,
};

export default function BookForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        author: editing.author || '',
        year: editing.year || '',
        genre: editing.genre || '',
        status: editing.status || 'want-to-read',
        rating: editing.rating || 0,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        year: form.year ? Number(form.year) : undefined,
        rating: Number(form.rating),
      };
      await onSave(payload);
      setForm(emptyForm);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{editing ? 'Edit Book' : 'Add a Book'}</h2>
      <div className="grid">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="want-to-read">Want to read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
        <input
          name="rating"
          type="number"
          min="0"
          max="5"
          step="1"
          placeholder="Rating (0-5)"
          value={form.rating}
          onChange={handleChange}
        />
      </div>
      <div className="actions">
        <button type="submit" disabled={submitting}>
          {editing ? 'Save changes' : 'Add book'}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
