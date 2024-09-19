const express = require("express")
const {allCompraMateriales,singleCompraMateriales,createCompraMateriales,editCompraMateriales,deleteCompraMateriales} = require("../Controllers/compraMateriales")

const router = express.Router()// metodo propio de express que tiene el enrutamiento


//peticiones http
router.get("/compraMateriales/",allCompraMateriales)//muestra todo
router.get("/compraMateriales/:id", singleCompraMateriales)//para ver uno
router.post("/compraMateriales/create",createCompraMateriales)
router.put("/compraMateriales/edit/:id",editCompraMateriales)
router.put("/compraMateriales/delete/:id",deleteCompraMateriales)

module.exports = router