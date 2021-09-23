var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', function(req, res){
  res.redirect('/books');
});

/* GET all books */
router.get('/books', async(req, res, next)  => {
  try {
      const books = await Book.findAll({
        attributes: ['id', 'title', 'author', 'genre', 'year']
      });
      res.render('index', {books: books});
    } catch (error) {
      next(error);
    }
});

/* GET create a new book form */
router.get('/books/new', (req, res) => {
  res.render('books/new-book');
});

/* GET individual book details */
router.get('/books/:id', async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
        res.render('books/update-book', {book: book})
    } else {
      const err = new Error;
      err.status = 404;
      err.message = "Bummer, it looks like the book you requested doesn't exist."
      next(err);
    } 
  } catch (error) {
    next(error)
  }
});

/* POST update a book in database */
router.post('/books/:id/edit', async(req, res) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if (book) {
      await book.update(req.body);
      res.redirect('/books');
    } else {
      const err = new Error;
      err.status = 404;
      err.message = "Bummer, it looks like the book you are trying to update doesn't exist."
      next(err);
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = Book.build(req.body);
      book.id = req.params.id;
      res.render('books/update-book', {book, errors: error.errors});
    } else {
      throw error;
    }
  }
})

/* POST new book to database */
router.post('/books', async(req, res) => {
  let book;
  try{
    book = await Book.create(req.body);
    res.redirect('/books');
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      book = Book.build(req.body);
      res.render('books/new-book', {book, errors: error.errors});
  } else {
    throw error;
    }
  }
});

/* POST deletes a book from the database */
router.post('/books/:id/delete', async(req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    const err = new Error;
    err.status = 404;
    err.message = "Bummer, it looks like the book you are trying to delete doesn't exist."
    next(err);
  }
})

module.exports = router;
