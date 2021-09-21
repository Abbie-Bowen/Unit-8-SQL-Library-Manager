var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', function(req, res, next) {
  (async () => {
    try {
      const books = await Book.findAll();
      res.render('index', { title: 'Express', books: books.toJSON()});
    } catch (error) {
      console.error(error);
    }
  })
  // res.render('index', { title: 'Express' });
});

module.exports = router;
