const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allDetalleViajes,singleDetalleViajes,createDetalleViajes,editDetalleViajes,deleteDetalleViajes} = require("../Controllers/detallesViajes")

//peticiones http
router.get("/detalleViajes/",allDetalleViajes)//muestra todo
router.get("/detalleViajes/:id", singleDetalleViajes)//para ver uno
router.post("/detalleViajes/create",createDetalleViajes)
router.put("/detalleViajes/edit/:id",editDetalleViajes)
router.put("/detalleViajes/delete/:id",deleteDetalleViajes)

module.exports = router