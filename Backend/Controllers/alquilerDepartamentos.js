const { conection } = require('../DB/Config');



// cambiar endpoints
const allAlquilerDepartamentos = (req, res) => {
    const query = `select FechaInicioAlquiler, A.FechaFinAlquiler, D.NombreDepartamento, D.DireccionDepartamento, D.DescripcionDepartamento, D.PrecioDepartamento,D.PrecioExpensa, C.NombreCliente, C.TelefonoCliente 
from AlquilerDepartamentos A
join Departamentos D
on D.id_departamento = A.id_departamento
join Clientes C
on C.id_cliente = A.id_cliente;`
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
}

const singleAlquilerDepartamento = (req, res) => {
    const id = req.params.id;
    const query = `select * from AlquilerDepartamentos where id_alquilerDepartamento = ${id}`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const createAlquilerDepartamento = (req, res) => {
    const { id_departamento, id_cliente, fechaAlquilerDepartamento } = req.body;
    const query = `insert into AlquilerDepartamentos (id_departamento,id_cliente,fechaAlquilerDepartamento) values (${id_departamento},${id_cliente},'${fechaAlquilerDepartamento}')`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const editAlquilerDepartamentos = (req, res) => {
    const id = req.params.id;
    const { id_departamento, id_cliente, fechaAlquilerDepartamento } = req.body;
    const query = `update AlquilerDepartamentos set id_departamento = ${id_departamento}, id_cliente = ${id_cliente}, fechaInicioAlquiler = '${fechaInicioAlquiler}', fechaFinAlquiler = '${fechaFinAlquiler}' where id_alquilerDepto = ${id}`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

const deleteAlquilerDepartamentos = (req, res) => {
    const id = req.params.id;
    const query = `update AlquilerDepartamentos set activoAlquiler=0 where id_alquilerDepto = ${id}`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
}

module.exports = { allAlquilerDepartamentos, singleAlquilerDepartamento, createAlquilerDepartamento, editAlquilerDepartamentos, deleteAlquilerDepartamentos }