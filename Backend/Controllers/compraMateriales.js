const { conection } = require('../DB/config');

// Funcion para mostrar todas las compras de materiales

const allCompraMateriales = (req, res) => {
    const query = `select * from StockMateriales;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

//Funcion para mostrar una compra de material en particular
const singleCompraMateriales = (req, res) => {
    const { id_compraMaterial } = req.params;
    const query = `select * from CompraMateriales where id_compraMaterial = ${id_compraMaterial};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}



//Funcion para editar una compra de material
const editarCompraMateriales = (req, res) => {
    const { id_stock, cantidadMaterial, precioMaterial, fechaCompraMateriales, estadoRetiro, lugardeCompra, activoCompra } = req.body;
    const { id_compraMaterial } = req.params;
    const query = `update CompraMateriales set cantidadMaterial= ${cantidadMaterial}, precioMaterial= ${precioMaterial}, fechaCompraMateriales= '${fechaCompraMateriales}', estadoRetiro= '${estadoRetiro}', lugardeCompra= '${lugardeCompra}', activoCompra= ${activoCompra} where id_compraMaterial = ${id_stock};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

//Funcion para crear una compra de material
const createCompraMateriales = (req, res) => {
    const { id_stock, cantidadMaterial, precioMaterial, fechaCompraMateriales, estadoRetiro, lugardeCompra, activoCompra } = req.body;
    const query = `insert into CompraMateriales (id_stock, cantidadMaterial, precioMaterial, fechaCompraMateriales, estadoRetiro, lugardeCompra, activoCompra) values (${id_stock}, ${cantidadMaterial}, ${precioMaterial}, '${fechaCompraMateriales}', '${estadoRetiro}', '${lugardeCompra}', ${activoCompra});`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}


//Funcion para eliminar una compra de material
const deleteCompraMateriales = (req, res) => {
    const { id_compraMaterial } = req.params;
    const query = `delete from CompraMateriales where id_compraMaterial = ${id_compraMaterial};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}