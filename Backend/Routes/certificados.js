const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allCertificados,singleCertificado,createCertificado,editCertificado,deleteCertificado} = require("../Controllers/certificados")

//peticiones http
router.get("/certificados/",allCertificados)//muestra todo
router.get("/certificados/:id", singleCertificado)//para ver uno
router.post("/certificados/create",createCertificado)
router.put("/certificados/edit/:id",editCertificado)
router.put("/certificados/delete/:id",deleteCertificado)

module.exports = router