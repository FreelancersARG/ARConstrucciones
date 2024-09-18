const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allVentaTerreno,singleVentaTerreno,createVentaTerreno,editVentaTerreno,deleteVentaTerreno} = require("../controllers/detalleViajes")

//peticiones http
router.get("/ventaTerreno/",allVentaTerreno)//muestra todo
router.get("/ventaTerreno/:id", singleVentaTerreno)//para ver uno
router.post("/ventaTerreno/create",createVentaTerreno)
router.put("/ventaTerreno/edit/:id",editVentaTerreno)
router.put("/ventaTerreno/delete/:id",deleteVentaTerreno)

module.exports = router