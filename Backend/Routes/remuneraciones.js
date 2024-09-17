const express = require("express")
// const {obtenerRemuneraciones, unaRemuneracion, crearRemuneracion,editarRemuneracion,borrarRemuneracion} = require("../controllers/remuneraciones")

const router = express.Router()

router.get("/remuneraciones", obtenerRemuneraciones)
router.get("/remuneraciones/:id", unaRemuneracion)
router.post("/remuneraciones/create/", crearRemuneracion)
router.put("/remuneraciones/edit/:id", editarRemuneracion)
router.put("/remuneraciones/delete/:id", borrarRemuneracion)


module.exports = router