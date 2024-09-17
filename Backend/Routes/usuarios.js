const express = require("express")
const {obtenerUsuarios, unUsuario, crearUsuarios,editarUsuarios,borrarUsuarios} = require("../controllers/usuarios")

const router = express.Router()

router.get("/usuarios", obtenerUsuarios)
router.get("/usuarios/:id", unUsuario)
router.post("/usuarios/create/", crearUsuarios)
router.put("/usuarios/edit/:id", editarUsuarios)
router.put("/usuarios/delete/:id", borrarUsuarios)


module.exports = router