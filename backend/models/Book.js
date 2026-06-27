const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    year: {
      type: Number,
      min: 0,
      max: 9999,
    },
    genre: {
      type: String,
      trim: true,
      default: 'Uncategorized',
    },
    status: {
      type: String,
      enum: ['want-to-read', 'reading', 'read'],
      default: 'want-to-read',
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
