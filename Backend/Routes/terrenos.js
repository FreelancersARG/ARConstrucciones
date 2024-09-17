const express = require("express")
// const {obtenerTerrenos, unTerreno, crearTerreno,editarTerreno,borrarTerreno} = require("../controllers/terrenos")

const router = express.Router()

router.get("/terrenos", obtenerTerrenos)
router.get("/terrenos/:id", unTerreno)
router.post("/terrenos/create/", crearTerreno)
router.put("/terrenos/edit/:id", editarTerreno)
router.put("/terrenos/delete/:id", borrarTerreno)


module.exports = router