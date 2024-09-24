const {conection} = require('../DB/config');

// Funcion para mostrar todos los viajes

const allViajes = (req, res) => {
    const query = `select * from Viajes;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para mostrar un viaje en particular

const singleViajes = (req, res) => {
    const id = req.params.id;
    const query = `select * from Viajes where id_viaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para editar un viaje

const editViajes = (req, res) => {
    const {fechaViaje, id_obra, id_vehiculo, activoViaje} = req.body;
    const id = req.params.id;
    const query = `update Viajes set fechaViaje= '${fechaViaje}', id_obra= '${id_obra}', id_vehiculo= ${id_vehiculo}, activoViaje= ${activoViaje} where id_viaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para crear un viaje

const createViajes = (req, res) => {
    const {fechaViaje, id_obra, id_vehiculo, activoViaje} = req.body;
    const query = `insert into Viajes (fechaViaje, id_obra, id_vehiculo, activoViaje) values ('${fechaViaje}', ${id_obra}, ${id_vehiculo}, ${activoViaje});`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para eliminar un viaje

const deleteViajes = (req, res) => {
    const id = req.params.id;
    const query = `update Viajes set activoViaje = 0 where id_viaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

module.exports = {allViajes, singleViajes, createViajes, editViajes, deleteViajes}