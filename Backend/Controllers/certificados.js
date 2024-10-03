const { conection } = require("../DB/Config");

const allCertificados = (req, res) => {
  const query = `select C.*, O.NombreObra, O.SectorObra, O.ProgresoObra, O.PrecioObra 
from Certificados C
join Obras O 
on O.id_obra = C.id_obra
where activoCert=1`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const singleCertificado = (req, res) => {
  const { id } = req.params;
  const query = `select * from Certificados where id_Certificado=${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const createCertificado = (req, res) => {
  const {
    montoCert,
    nroCertificado,
    fechaEmisionCert,
    fechaPagoCert,
    estadoCert,
    linkFacturaCert,
    linkFacturaPagadaCert,
    redeterminacion,
    valorredeterminacion,
    fechaRedeterminacion,
    id_obra,
    activoCert,
  } = req.body;

  const query = `
        INSERT INTO Certificados (
            montoCert,
            nroCertificado,
            fechaEmisionCert,
            fechaPagoCert,
            estadoCert,
            linkFacturaCert,
            linkFacturaPagadaCert,
            redeterminacion,
            valorredeterminacion,
            fechaRedeterminacion,
            id_obra,
            activoCert
        ) VALUES (
            ${montoCert},
            ${nroCertificado},
            '${fechaEmisionCert}',
            '${fechaPagoCert}',
            ${estadoCert},
            '${linkFacturaCert}',
            '${linkFacturaPagadaCert}',
            ${redeterminacion},
            ${valorredeterminacion},
            ${fechaRedeterminacion ? `'${fechaRedeterminacion}'` : "NULL"},
            ${id_obra},
            ${activoCert}
        )
    `;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json({
      message: "Certificado creado exitosamente",
      id: results.insertId,
    });
  });
};

const editCertificado = (req, res) => {
  const { id } = req.params;
  const {
    montoCert,
    nroCertificado,
    fechaEmisionCert,
    fechaPagoCert,
    estadoCert,
    linkFacturaCert,
    linkFacturaPagadaCert,
    redeterminacion,
    valorredeterminacion,
    fechaRedeterminacion,
    id_obra,
    activoCert,
  } = req.body;

  const query = `
        UPDATE Certificados SET
            montoCert = ${montoCert},
            nroCertificado = ${nroCertificado},
            fechaEmisionCert = '${fechaEmisionCert}',
            fechaPagoCert = '${fechaPagoCert}',
            estadoCert = ${estadoCert},
            linkFacturaCert = '${linkFacturaCert}',
            linkFacturaPagadaCert = '${linkFacturaPagadaCert}',
            redeterminacion = ${redeterminacion},
            valorredeterminacion = ${valorredeterminacion},
            fechaRedeterminacion = ${
              fechaRedeterminacion ? `'${fechaRedeterminacion}'` : "NULL"
            },
            id_obra = ${id_obra},
            activoCert = ${activoCert}
        WHERE id_Certificado = ${id}
    `;

  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json({ message: "Certificado editado exitosamente" });
  });
};

const deleteCertificado = (req, res) => {
  const { id } = req.params;
  const query = `UPDATE Certificados SET activoCert = 0 WHERE id_Certificado = ${id}`;
  conection.query(query, (err, results) => {
    if (err) throw err;
    res.json({ message: "Certificado eliminado exitosamente" });
  });
};

module.exports = {
  allCertificados,
  singleCertificado,
  createCertificado,
  editCertificado,
  deleteCertificado,
};
