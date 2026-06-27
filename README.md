# Book Tracker

A simple 3-service full-stack application for tracking books you've read, are reading, or want to read, allows users to
give ratings to all the books they have read.

## Services

| Service  | Stack                             | Default Port |
| -------- | --------------------------------- | ------------ |
| frontend | React 18 + Vite                   | 3000         |
| backend  | Node.js 20 + Express + Mongoose   | 5000         |
| mongo    | MongoDB 7 (official image)        | 27017        |

## API

The backend exposes a small REST API under `/api`:

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/api/books`       | List all books        |
| GET    | `/api/books/:id`   | Get a single book     |
| POST   | `/api/books`       | Create a book         |
| PUT    | `/api/books/:id`   | Update a book         |
| DELETE | `/api/books/:id`   | Delete a book         |

### Book schema

```json
{
  "title": "string (required)",
  "author": "string (required)",
  "year": "number",
  "genre": "string",
  "status": "want-to-read | reading | read",
  "rating": "number 0-5"
}
```

