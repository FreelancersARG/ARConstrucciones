const express = require("express")
const {allUsuarios, singleUsuario, createUsuarios,editUsuarios,deleteUsuarios} = require("../Controllers/usuarios")

const router = express.Router()

router.get("/usuarios", allUsuarios)
router.get("/usuarios/:id", singleUsuario)
router.post("/usuarios/create/", createUsuarios)
router.put("/usuarios/edit/:id", editUsuarios)
router.put("/usuarios/delete/:id", deleteUsuarios)


module.exports = router