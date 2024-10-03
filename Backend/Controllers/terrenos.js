const {conection} = require('../DB/Config');

const allTerrenos = (req, res) => {
    const query = `select * from Terrenos;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const singleTerreno = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from Terrenos where id_terreno = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editTerreno = (req, res) => {
    const { id_terreno, direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno} = req.body;
    const query = `update Terrenos set direccionTerreno = '${direccionTerreno}', metrosTerrenos = '${metrosTerrenos}', disponibilidadTerreno = '${disponibilidadTerreno}', precioTerreno = '${precioTerreno}', activoTerreno = '${activoTerreno}' where id_terreno = ${id_terreno};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno actualizado" });
    })
}

const createTerreno = (req, res) => {
    const { direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno } = req.body;
    const query = `insert into Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno) values ('${direccionTerreno}', '${metrosTerrenos}', '${disponibilidadTerreno}', '${precioTerreno}', '${activoTerreno}');`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno creado" });
    })
}

const deleteTerreno = (req, res) => {
    const id = req.params.id;
    const query = `update Terrenos set activoTerreno=0 where id_terreno = ${id};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results)
    })
}

module.exports = { allTerrenos, singleTerreno, createTerreno, editTerreno, deleteTerreno }