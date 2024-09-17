const express = require("express")
const {allAlquileres, singleAlquiler, createAlquiler,editAlquiler,deleteAlquiler} = require("../controllers/alquileres")

const router = express.Router()

router.get("/alquiler", allAlquileres)
router.get("/alquiler/:id", singleAlquiler)
router.post("/alquiler/create/", createAlquiler)
router.put("/alquiler/edit/:id", editAlquiler)
router.put("/alquiler/delete/:id", deleteAlquiler)



module.exports = router