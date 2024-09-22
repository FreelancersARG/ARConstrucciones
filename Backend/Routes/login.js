const express = require("express");
const router = express.Router();
const {login,recuperarPass} = require("../Controllers/login")


router.post("/login",login);
router.post("/recuperarPass",recuperarPass);

module.exports = router