const express = require("express")
const {allViajes, singleViaje, createViaje,editViaje,deleteViaje} = require("../controllers/viajes")

const router = express.Router()

router.get("/viajes", allViajes)
router.get("/viajes/:id", singleViaje)
router.post("/viajes/create/", createViaje)
router.put("/viajes/edit/:id", editViaje)
router.put("/viajes/delete/:id", deleteViaje)


module.exports = router