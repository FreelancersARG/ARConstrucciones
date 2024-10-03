const {conection} = require("../DB/Config");


const allClientes = (req, res) => {
    const query = `select * from Clientes where activoCliente=1`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleCliente = (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const query = `select * from Clientes where id_cliente=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createCliente = (req, res) => {
    const {nombreCliente,condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes} = req.body

    const query = `insert into Clientes (nombreCliente, condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes, activoCliente) values("${nombreCliente}","${condicionCliente}","${cuilCliente}","${telefonoCliente}","${mailCliente}", "${direccionCliente}", "${datosGarantes}",1)`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editCliente = (req, res) => {
    const id = req.params.id
    console.log(req.body);
    const {nombreCliente,condicionCliente, cuilCliente, telefonoCliente, mailCliente, direccionCliente, datosGarantes} = req.body
    const query = `update Clientes set nombreCliente="${nombreCliente}",condicionCliente="${condicionCliente}", cuilCliente="${cuilCliente}",telefonoCliente="${telefonoCliente}",mailCliente="${mailCliente}", direccionCliente="${direccionCliente}", datosGarantes="${datosGarantes}", activoCliente=1 where id_cliente=${id}`
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