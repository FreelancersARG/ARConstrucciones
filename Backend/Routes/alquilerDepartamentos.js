const express = require("express")
const {allAlquilerDepartamentos, singleAlquilerDepartamento, createAlquilerDepartamento,editAlquilerDepartamentos,deleteAlquilerDepartamentos} = require("../Controllers/alquilerDepartamentos")

const router = express.Router()

router.get("/alquiler", allAlquilerDepartamentos)
router.get("/alquiler/:id", singleAlquilerDepartamento)
router.post("/alquiler/create/", createAlquilerDepartamento)
router.put("/alquiler/edit/:id", editAlquilerDepartamentos)
router.put("/alquiler/delete/:id", deleteAlquilerDepartamentos)



module.exports = router