const Book = require('../models/Book');

// GET /api/books — optionally filter by status or search by title/author
const getBooks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      const re = new RegExp(req.query.search, 'i');
      filter.$or = [{ title: re }, { author: re }];
    }
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// GET /api/books/:id
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// POST /api/books
const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// PUT /api/books/:id
const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/books/:id
const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted', id: req.params.id });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
