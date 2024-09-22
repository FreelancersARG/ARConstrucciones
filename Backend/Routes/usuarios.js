const express = require("express")
const {allUsuarios, singleUsuario, createUsuarios,editUsuarios,deleteUsuarios} = require("../Controllers/usuarios")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/usuarios", allUsuarios)
router.get("/usuarios/:id", singleUsuario)
router.post("/usuarios/create/",verifyToken, createUsuarios)
router.put("/usuarios/edit/:id",verifyToken, editUsuarios)
router.put("/usuarios/delete/:id",verifyToken, deleteUsuarios)


module.exports = router