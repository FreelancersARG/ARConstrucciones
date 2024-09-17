const express = require("express");
const {alldaily_books,singlediary_book} = require("../Controllers/libroDiario");
const router = express.Router();


router.get("/libroDiario",alldaily_books)
router.get("/libroDiario/:id",singlediary_book)

module.exports = router