const {conection} = require('../DB/config');

const allUsuarios = (req, res) => {
    const query = `select * from StockMateriales;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const singleUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const query = `select * from Usuarios where id_usuario = ${id_usuario};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editUsuarios = (req, res) => {
    const { nombreUsuario, mailUsuario, passwordUsuario, rol } = req.body;
    const { id_usuario } = req.params;
    const query = `update Usuarios set nombreUsuario= '${nombreUsuario}', mailUsuario= '${mailUsuario}', passwordUsuario= '${passwordUsuario}', rol= '${rol}',activoUsuario= ${activoUsuario} where id_usuario = ${id_usuario};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

const createUsuarios = (req, res) => {
    const { nombreUsuario, mailUsuario, passwordUsuario, rol } = req.body;
    const query = `insert into Usuarios (nombreUsuario, mailUsuario, passwordUsuario, rol, activoUsuario) values ('${nombreUsuario}', '${mailUsuario}', '${passwordUsuario}', '${rol}', '${activoUsuario}');`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}


const deleteUsuarios = (req, res) => {
    const id = req.params.id;
    const query = `update Usuarios set activoUsuario=0 where id_usuario = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}
module.exports = { allUsuarios, singleUsuario, createUsuarios, editUsuarios, deleteUsuarios }