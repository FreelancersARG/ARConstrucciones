const {conection} = require("../DB/config");


const allObras = (req, res) => {
    const query = `select * from Obras;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleObra = (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const query = `select * from Obras where id_obra=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createObra = (req, res) => {
    const {nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra} = req.body

    const query = `insert into Obras (nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra, activoObras) values("${nombreObra}","${descripcionObra}","${fechainicioObra}","${fechafinObra}", "${precioObra}","${sectorObra}","${progresoObra}",1)`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editObra = (req, res) => {
    const id = req.params.id
    console.log(req.body);
    const {nombreObra, descripcionObra, fechainicioObra, fechafinObra, precioObra, sectorObra, progresoObra} = req.body
    const query = `update Obras set nombreObra="${nombreObra}",descripcionObra="${descripcionObra}", fechainicioObra="${fechainicioObra}",fechafinObra="${fechafinObra}", precioObra="${precioObra}", sectorObra="${sectorObra}", progresoObra="${progresoObra}",activoObras=1 where id_obra=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteObra = (req, res) => {
    const id = req.params.id
    const query = `update Obras set activoObras=0 where id_obra=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allObras, singleObra,createObra,editObra,deleteObra}