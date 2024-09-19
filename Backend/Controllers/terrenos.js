const {conection} = require('../DB/config');

const allTerrenos = (req, res) => {
    const query = `select * from Terrenos;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const unTerreno = (req, res) => {
    const { id_terreno } = req.params;
    const query = `select * from Terrenos where id_terreno = ${id_terreno};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editTerreno = (req, res) => {
    const { id_terreno, direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno } = req.body;
    const query = `update Terrenos set direccionTerreno = '${direccionTerreno}', metrosTerrenos = '${metrosTerrenos}', disponibilidadTerreno = '${disponibilidadTerreno}', precioTerreno = '${precioTerreno}', activoTerreno = '${activoTerreno}' where id_terreno = ${id_terreno};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno actualizado" });
    })
}

const createTerreno = (req, res) => {
    const { direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno } = req.body;
    const query = `insert into Terrenos (direccionTerreno, metrosTerrenos, disponibilidadTerreno, precioTerreno, activoTerreno) values ('${direccionTerreno}', '${metrosTerrenos}', '${disponibilidadTerreno}', '${precioTerreno}', '${activoTerreno}');`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno creado" });
    })
}

const deleteTerreno = (req, res) => {
    const { id_terreno } = req.params;
    const query = `delete from Terrenos where id_terreno = ${id_terreno};`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json({ msg: "Terreno eliminado" });
    })
}

module.exports = { allTerrenos, unTerreno, createTerreno, editTerreno, deleteTerreno }