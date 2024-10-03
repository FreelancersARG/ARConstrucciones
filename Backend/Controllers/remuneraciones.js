const {conection} = require('../DB/Config');

const allRemuneraciones = (req, res) => {
    const query = `select * from Remuneraciones;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const singleRemuneracion = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from Remuneraciones where id_remuneracion = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editRemuneracion = (req, res) => {
    const { id_remuneracion, montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion } = req.body;
    const query = `update Remuneraciones set montoRemuneracion= '${montoRemuneracion}', cantEmpleado= '${cantEmpleado}', tipoEmpleado= '${tipoEmpleado}', fechaRemuneracion= '${fechaRemuneracion}', sectorRemuneracion= '${sectorRemuneracion}', activoRemuneracion= ${activoRemuneracion} where id_remuneracion = ${id_remuneracion};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

const createRemuneracion = (req, res) => {
    const { montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion } = req.body;
    const query = `insert into Remuneraciones (montoRemuneracion, cantEmpleado, tipoEmpleado, fechaRemuneracion, sectorRemuneracion,activoRemuneracion) values ('${montoRemuneracion}', '${cantEmpleado}', '${tipoEmpleado}', '${fechaRemuneracion}', '${sectorRemuneracion}', '${activoRemuneracion}');`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

const deleteRemuneracion = (req, res) => {
    const id = req.params.id;
    const query = `update Remuneraciones set activoRemuneracion=0 where id_remuneracion = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}


module.exports = { allRemuneraciones, singleRemuneracion, createRemuneracion, editRemuneracion, deleteRemuneracion }