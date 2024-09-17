const express = require("express")
// const {obtenerVehiculos, unVehiculo, crearVehiculo,editarVehiculo,borrarVehiculo} = require("../controllers/vehiculos")

const router = express.Router()

router.get("/vehiculos", obtenerVehiculos)
router.get("/vehiculos/:id", unVehiculo)
router.post("/vehiculos/create/", crearVehiculo)
router.put("/vehiculos/edit/:id", editarVehiculo)
router.put("/vehiculos/delete/:id", borrarVehiculo)


module.exports = router