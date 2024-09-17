const express = require("express")
// const {obtenerClientes, unCliente, crearCliente,editarCliente,borrarCliente} = require("../controllers/clientes")

const router = express.Router()

router.get("/clientes", obtenerClientes)
router.get("/clientes/:id", unCliente)
router.post("/clientes/create/", crearCliente)
router.put("/clientes/edit/:id", editarCliente)
router.put("/clientes/delete/:id", borrarCliente)


module.exports = router