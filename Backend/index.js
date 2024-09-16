const express = require('express');
const {conection} = require('./DB/Config')
const alquilerDepartamentos = require("./Routes/alquilerDepartamentos")
const cashFlow = require("./Routes/cashFlow")
const certificados = require("./Routes/certificados")
const clientes = require("./Routes/clientes")
const compraMateriales = require("./Routes/compraMateriales")
const departamentos = require("./Routes/departamentos")
const detalleViajes = require("./Routes/detalleViajes")
const libroDiario = require("./Routes/libroDiario")
const obras = require("./Routes/obras")
const operaciones = require("./Routes/operaciones")
const pagosAlquileres = require("./Routes/pagosAlquileres")
const remuneraciones = require("./Routes/remuneraciones")
const stockMateriales = require("./Routes/stockMateriales")
const terrenos = require("./Routes/terrenos")
const usuarios = require("./Routes/usuarios")
const vehiculos = require("./Routes/vehiculos")
const ventaTerrenos = require("./Routes/ventaTerrenos")
const viajes = require("./Routes/viajes")
const cors = require('cors');

const app = express()
const port = 8000;
app.use(cors())
app.use(express.json())
app.use("/", alquilerDepartamentos,cashFlow,certificados,clientes,compraMateriales,departamentos,detalleViajes,libroDiario,obras,operaciones,pagosAlquileres,remuneraciones,stockMateriales,terrenos,usuarios,vehiculos,ventaTerrenos,viajes)



conection.connect(() => {
    console.log("Base de datos conectada ✓")
})

app.get("/", (req, res) => {
    console.log("API FUNCIONANDO")
    res.send({message: "API - LENO ARGENTINA"})
})


app.listen(port, () => {
    console.log(`🔝 Escuchando en el puerto ${port}\n 🔹 Ingresar: http://localhost:${port}/`)
})