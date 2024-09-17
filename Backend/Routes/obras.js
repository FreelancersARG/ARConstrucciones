const express = require("express")
// const {obtenerObra, unaObra, crearObra,editarObra,borrarObra} = require("../controllers/obras")

const router = express.Router()

router.get("/obras", obtenerObras)
router.get("/obras/:id", unaObra)
router.post("/obras/create/", crearObra)
router.put("/obras/edit/:id", editarObra)
router.put("/obras/delete/:id", borrarObra)


module.exports = router