const express = require("express")
// const {obtenerViajes, unViaje, crearViaje,editarViaje,borrarViaje} = require("../controllers/viajes")

const router = express.Router()

router.get("/viajes", obtenerViajes)
router.get("/viajes/:id", unViaje)
router.post("/viajes/create/", crearViaje)
router.put("/viajes/edit/:id", editarViaje)
router.put("/viajes/delete/:id", borrarViaje)


module.exports = router