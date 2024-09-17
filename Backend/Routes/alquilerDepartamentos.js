const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allAlquilerDepartamentos,singleAlquilerDepartamentos,createAlquilerDepartamentos,editAlquilerDepartamentos,deleteAlquilerDepartamentos} = require("../controllers/alquilerDepartamentos")

//peticiones http
router.get("/alquilerDepartamentos/",allAlquilerDepartamentos)//muestra todo
router.get("/alquilerDepartamentos/:id", singleAlquilerDepartamentos)//para ver uno
router.post("/alquilerDepartamentos/create",createAlquilerDepartamentos)
router.put("/alquilerDepartamentos/edit/:id",editAlquilerDepartamentos)
router.put("/alquilerDepartamentos/delete/:id",deleteAlquilerDepartamentos)

module.exports = router