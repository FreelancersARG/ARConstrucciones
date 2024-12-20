const { conection } = require("../DB/Config")

const allClientes = (req, res) => {

    const query = `select * from Clientes where activoCliente=1`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleCliente = (req, res) => {
   
    const id = req.params.id
    const query = `select * from Clientes where id_cliente=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

const createCliente = (req, res) => {
    const {nombreCliente, apellidoCliente, condicionCliente, razonSocial, cuil_cuit_Cliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes} = req.body

    const query = `insert into Clientes (nombreCliente, apellidoCliente, condicionCliente, razonSocial, cuil_cuit_Cliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes) values("${nombreCliente}","${apellidoCliente}","${condicionCliente}", "${razonSocial}", "${cuil_cuit_Cliente}", "${telefonoCliente}","${mailCliente}", "${direccionCliente}", "null")`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editCliente = (req, res) => {
    const id = req.params.id
    const {nombreCliente, apellidoCliente, condicionCliente, razonSocial, cuil_cuit_Cliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes} = req.body
    const query = `update Clientes set nombreCliente="${nombreCliente}", apellidoCliente="${apellidoCliente}", condicionCliente="${condicionCliente}", razonSocial="${razonSocial}", cuil_cuit_Cliente="${cuil_cuit_Cliente}",telefonoCliente="${telefonoCliente}",mailCliente="${mailCliente}", direccionCliente="${direccionCliente}", datosGarantes="null", activoCliente=1 where id_cliente=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteCliente = (req, res) => {
    const id = req.params.id
    const query = `update Clientes set activoCliente=0 where id_cliente=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allClientes, singleCliente,createCliente,editCliente,deleteCliente}