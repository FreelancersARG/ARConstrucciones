const express = require("express")

const router = express.Router()// metodo propio de express que tiene el enrutamiento

const {allCertificados,singleCertificados,createCertificados,editCertificados,deleteCertificados} = require("../Controllers/certificados")

//peticiones http
router.get("/certificados/",allCertificados)//muestra todo
router.get("/certificados/:id", singleCertificados)//para ver uno
router.post("/certificados/create",createCertificados)
router.put("/certificados/edit/:id",editCertificados)
router.put("/certificados/delete/:id",deleteCertificados)

module.exports = router