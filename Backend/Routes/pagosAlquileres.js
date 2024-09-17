const express = require("express")
const {obtenerPagosAlquileres, unPagoAlquiler, crearPagosAlquileres,editarPagosAlquileres,borrarPagosAlquileres} = require("../controllers/pagosAlquileres")

const router = express.Router()

router.get("/pagosAlquileres", obtenerPagosAlquileres)
router.get("/pagosAlquileres/:id", unPagoAlquiler)
router.post("/pagosAlquileres/create/", crearPagosAlquileres)
router.put("/pagosAlquileres/edit/:id", editarPagosAlquileres)
router.put("/pagosAlquileres/delete/:id", borrarPagosAlquileres)


module.exports = router