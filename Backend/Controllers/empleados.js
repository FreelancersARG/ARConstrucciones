const { conection } = require("../DB/Config");

const allEmpleado = (req, res) => {
  const query = `select * from Empleados where activoEmpleado=1;`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const getEmpleadoSinUsuarios = (req, res) => {
    const query = `select * from Empleados where id_empleado not in (select id_empleado from Usuarios);`;
    conection.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  };

const singleEmpleado = (req, res) => {
  const { id } = req.params.id;
  const query = `select * from Empleados where id_empleado = ${id};`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createEmpleado = (req, res) => {
  const {
    nombreEmpleado,
    apellidoEmpleado,
    dniEmpleado,
    direccionEmpleado,
    telefonoEmpleado,
  } = req.body;
  const query = `insert into Empleados (nombreEmpleado, apellidoEmpleado, dniEmpleado, direccionEmpleado, telefonoEmpleado) values ('${nombreEmpleado}', '${apellidoEmpleado}', '${dniEmpleado}', '${direccionEmpleado}', '${telefonoEmpleado}')`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};



const editEmpleado = (req, res) => {
  const {
    nombreEmpleado,
    apellidoEmpleado,
    dniEmpleado,
    direccionEmpleado,
    telefonoEmpleado,
  } = req.body;
  const { id } = req.params;
  const query = `update Empleados set nombreEmpleado='${nombreEmpleado}', apellidoEmpleado='${apellidoEmpleado}', dniEmpleado='${dniEmpleado}', direccionEmpleado='${direccionEmpleado}', telefonoEmpleado='${telefonoEmpleado}' where id_empleado=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

const deleteEmpleado = (req, res) => {
  const id = req.params.id;
  const query = `update Empleados set activoEmpleado=0 where id_empleado = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  allEmpleado,
  singleEmpleado,
  createEmpleado,
  editEmpleado,
  deleteEmpleado,
  getEmpleadoSinUsuarios,
};
