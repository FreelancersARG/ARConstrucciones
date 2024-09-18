const express = require("express")
const {allVehiculos, singleVehiculo, createVehiculo,editVehiculo,deleteVehiculo} = require("../controllers/vehiculos")

const router = express.Router()

router.get("/vehiculos", allVehiculos)
router.get("/vehiculos/:id", singleVehiculo)
router.post("/vehiculos/create/", createVehiculo)
router.put("/vehiculos/edit/:id", editVehiculo)
router.put("/vehiculos/delete/:id", deleteVehiculo)


module.exports = router