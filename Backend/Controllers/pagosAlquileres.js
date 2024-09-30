const { conection } = require("../DB/Config");

const allPagosAlquileres = (req, res) => {
    const query = `select P.FechaPagoAlquiler, P.MontoPagoAlquiler, C.NombreCliente, D.NombreDepartamento 
    from PagosAlquileres P
    join AlquilerDepartamentos A
    on A.id_alquilerDepto = P.id_alquilerDepto
    join Clientes C
    on C.id_cliente = A.id_cliente
    join Departamentos D
    on D.id_departamento = A.id_departamento;`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const singlePagoAlquiler = (req, res) => {
    const { id } = req.params.id;
    const query = `select * from PagosAlquileres where id_pago_alquiler = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const editPagosAlquileres = (req, res) => {
    const { id_pagoAlquiler, fechaPagoAlquiler, montoPagoAlquiler } = req.body;
    const query = `update PagosAlquileres set fechaPagoAlquiler= '${fechaPagoAlquiler}', montoPagoAlquiler= '${montoPagoAlquiler}', activoPagoAlquiler= ${activoPagoAlquiler} where id_pagoAlquiler = ${id_pagoAlquiler};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const createPagosAlquileres = (req, res) => {
    const { fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto } = req.body;
    const query = `insert into PagosAlquileres (fechaPagoAlquiler, montoPagoAlquiler, id_alquilerDepto, activoPagoAlquiler) values ('${fechaPagoAlquiler}', '${montoPagoAlquiler}', '${id_alquilerDepto}', '${activoPagoAlquiler}');`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};

const deletePagosAlquileres = (req, res) => {
    const id = req.params.id;
    const query = `update PagosAlquileres set activoPagoAlquiler=0 where id_pagoAlquiler = ${id};`;
    conection.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
};


module.exports = { allPagosAlquileres, singlePagoAlquiler, createPagosAlquileres, editPagosAlquileres, deletePagosAlquileres };
