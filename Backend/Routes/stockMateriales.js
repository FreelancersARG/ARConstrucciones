const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allStockMateriales,singleStockMateriales,createStockMateriales,editStockMateriales,deleteStockMateriales} = require("../controllers/stockMateriales")

//peticiones http
router.get("/stockMateriales/",allStockMateriales)//muestra todo
router.get("/stockMateriales/:id", singleStockMateriales)//para ver uno
router.post("/stockMateriales/create",createStockMateriales)
router.put("/stockMateriales/edit/:id",editStockMateriales)
router.put("/stockMateriales/delete/:id",deleteStockMateriales)

module.exports = router