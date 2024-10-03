const express = require("express")
const {allPagosAlquileres, singlePagoAlquiler, createPagosAlquileres,editPagosAlquileres,deletePagosAlquileres} = require("../Controllers/pagosAlquileres")

const router = express.Router()

router.get("/pagosAlquileres", allPagosAlquileres)
router.get("/pagosAlquileres/:id", singlePagoAlquiler)
router.post("/pagosAlquileres/create/", createPagosAlquileres)
router.put("/pagosAlquileres/edit/:id", editPagosAlquileres)
router.put("/pagosAlquileres/delete/:id", deletePagosAlquileres)


module.exports = router