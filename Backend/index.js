const express = require('express');
const {conection} = require('./DB/config')
//const alquilerDepartamentos = require("./Routes/alquilerDepartamentos")
//const cashFlow = require("./Routes/cashFlow")
const certificados = require("./Routes/certificados")
//const clientes = require("./Routes/clientes")
//const compraMateriales = require("./Routes/compraMateriales")
//const departamentos = require("./Routes/departamentos")
//const detallesViajes = require("./Routes/detallesViajes")
//const libroDiario = require("./Routes/libroDiario")
//const obras = require("./Routes/obras")
//const operaciones = require("./Routes/operaciones")
//const pagosAlquileres = require("./Routes/pagosAlquileres")
//const remuneraciones = require("./Routes/remuneraciones")
//const stockMateriales = require("./Routes/stockMateriales")
//const terrenos = require("./Routes/terrenos")
//const usuarios = require("./Routes/usuarios")
//const vehiculos = require("./Routes/vehiculos")
const ventaTerrenos = require("./Routes/ventaTerrenos")
const viajes = require("./Routes/viajes")
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000;
app.use(cors())
app.use(bodyParser.json())
app.use("/",viajes,certificados,ventaTerrenos)
app.use(express.json())
// app.use("/", alquilerDepartamentos,cashFlow,certificados,clientes,compraMateriales,departamentos,detallesViajes,libroDiario,obras,operaciones,pagosAlquileres,remuneraciones,stockMateriales,terrenos,usuarios,vehiculos,ventaTerrenos,viajes)



conection.connect(() => {
    console.log("Base de datos conectada ✓")
})

app.get("/", (req, res) => {
    console.log("API FUNCIONANDO")
    res.send({message: "CONSTRUCTORA AR - API CONECTADA ✓"})
})


app.listen(port, () => {
    console.log(`🔝 Escuchando en el puerto ${port}\n 🔹 Ingresar: http://localhost:${port}/`)
})