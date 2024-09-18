const express = require("express")
const {allOperaciones,singleOperaciones,createOperaciones,editOperaciones,deleteOperaciones} = require("../controllers/operaciones")

const router = express.Router()// metodo propio de express que tiene el enrutamiento


//peticiones http
router.get("/Operaciones/",allOperaciones)//muestra todo
router.get("/Operaciones/:id", singleOperaciones)//para ver uno
router.post("/Operaciones/create",createOperaciones)
router.put("/Operaciones/edit/:id",editOperaciones)
router.put("/Operaciones/delete/:id",deleteOperaciones)

module.exports = router