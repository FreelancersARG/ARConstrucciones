const express = require("express")
const {allEmpleado,singleEmpleado,createEmpleado,editEmpleado,deleteEmpleado,getEmpleadoSinUsuarios} = require("../Controllers/empleados")
const {verifyToken} = require("../middleware/middleware") // importo la funcion veryfyToken del archivo authJwt.js
const router = express.Router()

router.get("/empleados", verifyToken,allEmpleado)
router.get("/empleados/:id", verifyToken,singleEmpleado)
router.post("/empleados/create/", verifyToken,createEmpleado)
router.put("/empleados/edit/:id", verifyToken,editEmpleado)
router.put("/empleados/delete/:id", verifyToken,deleteEmpleado)
router.get("/empleadosSinusuarios/", verifyToken,getEmpleadoSinUsuarios)


module.exports = router