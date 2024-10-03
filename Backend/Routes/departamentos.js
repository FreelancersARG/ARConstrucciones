const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allDepartamentos,singleDepartamentos,createDepartamentos,editDepartamentos,deleteDepartamentos} = require("../Controllers/departamentos")

//peticiones http
router.get("/departamentos/",allDepartamentos)//muestra todo
router.get("/departamentos/:id", singleDepartamentos)//para ver uno
router.post("/departamentos/create/",createDepartamentos)
router.put("/departamentos/edit/:id",editDepartamentos)
router.put("/departamentos/delete/:id",deleteDepartamentos)

module.exports = router