const {conection} = require('../DB/config');

// Funcion para mostrar todos los detalles de los viajes

const allDetallesViajes = (req, res) => {
    const query = `select * from DetallesViajes where activoDetalleViaje = 1;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para mostrar un detalle de viaje en particular

const singleDetallesViajes = (req, res) => {
    const id = req.params.id;
    const query = `select * from DetallesViajes where id_detalleViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para editar un detalle de viaje

const editDetallesViajes = (req, res) => {
    const {cantidadMaterial ,id_viaje, id_stock, activoDetalleViaje} = req.body;
    const id = req.params.id;
    const query = `update DetallesViajes set id_viaje= ${id_viaje},  cantidadMaterial= ${cantidadMaterial}, id_stock= ${id_stock}, activoDetalleViaje= ${activoDetalleViaje} where id_detalleViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para crear un detalle de viaje

const createDetallesViajes = (req, res) => {
    const {cantidadMaterial ,id_viaje, id_stock, activoDetalleViaje} = req.body;
    const query = `insert into DetallesViajes (id_viaje, cantidadMaterial, id_stock, activoDetalleViaje) values (${id_viaje}, ${cantidadMaterial}, ${id_stock}, ${activoDetalleViaje});`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para eliminar un detalle de viaje

const deleteDetallesViajes = (req, res) => {
    const id = req.params.id;
    const query = `update DetallesViajes set activoDetalleViaje = 0 where id_detalleViaje = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

module.exports = {allDetallesViajes, singleDetallesViajes, createDetallesViajes, editDetallesViajes, deleteDetallesViajes}