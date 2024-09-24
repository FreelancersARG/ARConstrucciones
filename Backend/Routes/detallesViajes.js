const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allDetallesViajes,singleDetallesViajes,createDetallesViajes,editDetallesViajes,deleteDetallesViajes} = require("../controllers/detallesViajes")

//peticiones http
router.get("/detallesViajes/",allDetallesViajes)//muestra todo
router.get("/detallesViajes/:id", singleDetallesViajes)//para ver uno
router.post("/detallesViajes/create",createDetallesViajes)
router.put("/detallesViajes/edit/:id",editDetallesViajes)
router.put("/detallesViajes/delete/:id",deleteDetallesViajes)

module.exports = router