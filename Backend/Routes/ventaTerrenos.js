const express = require("express")
const {allVentaTerreno,singleVentaTerreno,createVentaTerreno,editVentaTerreno,deleteVentaTerreno} = require("../Controllers/ventaTerrenos")//importo los metodos del controlador

const router = express.Router()// metodo propio de express que tiene el enrutamiento


//peticiones http
router.get("/ventaTerrenos/",allVentaTerreno)//muestra todo
router.get("/ventaTerrenos/:id", singleVentaTerreno)//para ver uno
router.post("/ventaTerrenos/create",createVentaTerreno)
router.put("/ventaTerrenos/edit/:id",editVentaTerreno)
router.put("/ventaTerrenos/delete/:id",deleteVentaTerreno)

module.exports = router