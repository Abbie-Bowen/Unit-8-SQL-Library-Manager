var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/books', async(req, res, next)  => {
  try {
      const books = await Book.findAll({
        attributes: ['id', 'title', 'author', 'genre', 'year']
      });
      console.log(books);
      res.render('index', {books: books});
    } catch (error) {
      console.error(error);
    }
});

/* GET individual book route */
router.get('/book/:id', async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book) {
    res.render('update-book', {book: book})
    } else {
      const err = new Error;
      err.status = 404;
      err.message = "Sorry, we can't find the book you're looking for.";
      next(err);
    } 
  } catch (error) {
    next(error)
  }
})

module.exports = router;
