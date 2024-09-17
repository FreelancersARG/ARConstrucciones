const express = require("express");
const {allCashFlow, singlerCashFlow} = require("../Controllers/cashFlow");
const router = express.Router();

router.get("/cashFlow",allCashFlow)
router.get("/cashFlow/:id",singlerCashFlow)

module.exports = router