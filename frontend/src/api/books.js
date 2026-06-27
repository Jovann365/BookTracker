// VITE_API_URL is set at build time (in Docker, point to your backend service).
// Default to /api so a reverse proxy can route requests in production.
const API_URL = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const fetchBooks = () => request('/books');

export const createBook = (book) =>
  request('/books', { method: 'POST', body: JSON.stringify(book) });

export const updateBook = (id, book) =>
  request(`/books/${id}`, { method: 'PUT', body: JSON.stringify(book) });

export const deleteBook = (id) =>
  request(`/books/${id}`, { method: 'DELETE' });
