var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

/* GET home page. */
router.get('/', async(req, res, next)  => {
  try {
      const book = await Book.create({
        title: 'Where to Begin',
        author: 'Cleo Wade',
        genre: 'poetry',
        year: '2019',
      });
      const books = await Book.findAll();
      res.json(books);
    } catch (error) {
      console.error(error);
    }
  // res.render('index', { title: 'Express' });
});

module.exports = router;
