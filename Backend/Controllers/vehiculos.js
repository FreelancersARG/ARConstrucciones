const {conection} = require("../DB/config");


const allVehiculos = (req, res) => {
    const query = `select * from Vehiculos;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleVehiculo = (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const query = `select * from Vehiculos where id_vehiculo=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createVehiculo = (req, res) => {
    const {marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo} = req.body

    const query = `insert into Vehiculos (marcaVehiculo, patenteVehiculo, tipoVehiculo, seguroVehiculo, activoVehiculo) values("${marcaVehiculo}","${patenteVehiculo}","${tipoVehiculo}","${seguroVehiculo}",1)`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editVehiculo = (req, res) => {
    const id = req.params.id
    console.log(req.body);
    const {marcaVehiculo,patenteVehiculo, tipoVehiculo, seguroVehiculo} = req.body
    const query = `update Vehiculos set marcaVehiculo="${marcaVehiculo}",patenteVehiculo="${patenteVehiculo}", tipoVehiculo="${tipoVehiculo}",seguroVehiculo="${seguroVehiculo}",activoCliente=1 where id_vehiculo=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteVehiculo = (req, res) => {
    const id = req.params.id
    const query = `update Vehiculos set activoVehiculo=0 where id_vehiculo=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allVehiculos, singleVehiculo,createVehiculo,editVehiculo,deleteVehiculo}