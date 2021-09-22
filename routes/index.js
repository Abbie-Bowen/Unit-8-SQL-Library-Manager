var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next)  => {
  try {
      const books = await Book.findAll();
      res.render('/index', {books: books});
    } catch (error) {
      console.error(error);
    }
});

/* GET individual book route */
router.get('/book/:id', (req, res, next) => {
  if (req.params.id) {
    res.render('/update-book', {book: books[req.params.id]})
  } else {
    const err = new Error;
    err.status = 404;
    err.message = "Sorry, we can't find the book you're looking for.";
    next(err);
  }
})

module.exports = router;
