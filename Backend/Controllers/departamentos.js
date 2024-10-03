const {conection} = require("../DB/Config");


const allDepartamentos = (req, res) => {
    const query = `select * from Departamentos;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleDepartamentos = (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const query = `select * from Departamentos where id_departamento=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}
const createDepartamentos = (req, res) => {
    const {nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion} = req.body

    const query = `insert into Departamentos (nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion, activoDepto) values("${nombreDepartamento}","${direccionDepartamento}","${disponibilidadDepartamento}","${descripcionDepartamento}","${precioDepartamento}", "${precioExpensa}", "${serviciosIncluidos}", "${contratoDescripcion}", 1)`
    conection.query(query, (err,results) => {
        if(err) throw err 
        res.send(results)
    })
}

const editDepartamentos = (req, res) => {
    const id = req.params.id
    console.log(req.body);
    const {nombreDepartamento, direccionDepartamento, disponibilidadDepartamento, descripcionDepartamento, precioDepartamento, precioExpensa, serviciosIncluidos, contratoDescripcion} = req.body
    const query = `update Departamentos set nombreDepartamento="${nombreDepartamento}",direccionDepartamento="${direccionDepartamento}", disponibilidadDepartamento="${disponibilidadDepartamento}",descripcionDepartamento="${descripcionDepartamento}", precioDepartamento="${precioDepartamento}", precioExpensa="${precioExpensa}", serviciosIncluidos="${serviciosIncluidos}", contratoDescripcion="${contratoDescripcion}", activoDepto=1 where id_departamento=${id}`
    conection.query(query, (err,results) => {
        if(err) throw err
        res.send(results)
    })
}

const deleteDepartamentos = (req, res) => {
    const id = req.params.id
    const query = `update Departamentos set activoDepto=0 where id_departamento=${id}`
    conection.query(query, (err,results) => {

        if(err) throw err
        res.send(results)
    })
}

module.exports = {allDepartamentos, singleDepartamentos,createDepartamentos,editDepartamentos,deleteDepartamentos}