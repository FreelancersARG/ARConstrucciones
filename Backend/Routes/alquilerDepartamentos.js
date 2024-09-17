const express = require("express")
// const {obtenerAlquileres, unAlquiler, crearAlquiler,editarAlquiler,borrarAlquiler} = require("../controllers/alquileres")

const router = express.Router()

router.get("/alquiler", obtenerAlquileres)
router.get("/alquiler/:id", unAlquiler)
router.post("/alquiler/create/", crearAlquiler)
router.put("/alquiler/edit/:id", editarAlquiler)
router.put("/alquiler/delete/:id", borrarAlquiler)



module.exports = router