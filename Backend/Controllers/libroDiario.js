const { conection } = require("../DB/Config");

// Manejar el POST para recibir la fecha
const alldaily_books = (req, res) => {
  // Obtenemos la fecha enviada desde el front
  const { fechaRegistro } = req.body;

  // Si no hay fecha en el body, enviamos un error
  if (!fechaRegistro) {
    return res.status(400).json({ error: "La fecha es obligatoria" });
  }

  // Query para obtener los registros según la fecha
  const query = `
    SELECT 'CERTIFICADO' as TIPO, o.nombreObra as Descripcion, c.montoCert as Monto, c.fechaPagoCert as Fecha
    FROM Certificados c
    JOIN Obras o ON o.id_obra = c.id_obra
    WHERE c.fechaPagoCert = ?

    UNION ALL

    SELECT 'VENTA TERRENO' as TIPO, t.direccionTerreno as Descripcion, t.precioTerreno as Monto, vt.fechaVentaTerreno as Fecha
    FROM VentaTerrenos vt
    JOIN Terrenos t ON t.id_terreno = vt.id_terreno
    WHERE vt.fechaVentaTerreno = ?

    UNION ALL

    SELECT op.tipoOperacion as TIPO, concat(op.nombreOperacion) as Descripcion, op.montoOperacion as Monto, op.fechaOperacion as Fecha
    FROM Operaciones op
    WHERE op.fechaOperacion = ?

    UNION ALL

    SELECT 'COMPRA MATERIAL' as TIPO, concat(stm.nombreMaterial, " (", cm.cantidadMaterial, ")") as Descripcion, 
        cm.precioMaterial as Monto, cm.fechaCompraMateriales as Fecha
    FROM CompraMateriales cm
    JOIN StockMateriales stm ON stm.id_stock = cm.id_stock
    WHERE cm.fechaCompraMateriales = ?

    UNION ALL

    SELECT 'REMUNERACION' as TIPO, (CASE WHEN rm.tipoEmpleado = 0 THEN 'Administrativo' ELSE 'Obrero' END) as Descripcion, 
        rm.montoRemuneracion as Monto, rm.fechaRemuneracion as Fecha
    FROM Remuneraciones rm
    WHERE rm.fechaRemuneracion = ?

    UNION ALL

    SELECT 'ALQUILER' as TIPO, concat(dp.nombreDepartamento, " - ", dp.direccionDepartamento) as Descripcion, 
        pal.montoPagoAlquiler as Monto, pal.fechaPagoAlquiler as Fecha
    FROM PagosAlquileres pal
    JOIN AlquilerDepartamentos ald ON ald.id_alquilerDepto = pal.id_alquilerDepto
    JOIN Departamentos dp ON dp.id_departamento = ald.id_departamento
    WHERE pal.fechaPagoAlquiler = ?`;

  // Ejecutamos la consulta
  conection.query(
    query,
    [fechaRegistro, fechaRegistro, fechaRegistro, fechaRegistro, fechaRegistro, fechaRegistro],
    (err, results) => {
      if (err) {
        // Error en la base de datos
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
      }

      // Si hay resultados
      if (results.length > 0) {
        return res.json({
          message: "Datos obtenidos correctamente",
          fecha: fechaRegistro,
          data: results,
        });
      } else {
        // Si no se encontraron resultados
        return res.status(200).json([]);
      }
    }
  );
};

// Manejar el GET para recibir y devolver los datos según una fecha
const getdaily_books = (req, res) => {
  // Obtenemos la fecha desde los parámetros de la URL
  const { fechaRegistro } = req.query;

  // Si no se envía una fecha, devolvemos un error
  if (!fechaRegistro) {
    return res.status(400).json({ error: "La fecha es obligatoria" });
  }

  // Ejecutamos la misma consulta
  const query = `
    SELECT 'CERTIFICADO' as TIPO, o.nombreObra as Descripcion, c.montoCert as Monto, c.fechaPagoCert as Fecha
    FROM Certificados c
    JOIN Obras o ON o.id_obra = c.id_obra
    WHERE c.fechaPagoCert = ?

    UNION ALL

    SELECT 'VENTA TERRENO' as TIPO, t.direccionTerreno as Descripcion, t.precioTerreno as Monto, vt.fechaVentaTerreno as Fecha
    FROM VentaTerrenos vt
    JOIN Terrenos t ON t.id_terreno = vt.id_terreno
    WHERE vt.fechaVentaTerreno = ?

    UNION ALL

    SELECT 'OPERACION' as TIPO, concat(op.nombreOperacion, " ", op.tipoOperacion) as Descripcion, op.montoOperacion as Monto, op.fechaOperacion as Fecha
    FROM Operaciones op
    WHERE op.fechaOperacion = ?

    UNION ALL

    SELECT 'COMPRA MATERIAL' as TIPO, concat(stm.nombreMaterial, " (", cm.cantidadMaterial, ")") as Descripcion, 
        cm.precioMaterial as Monto, cm.fechaCompraMateriales as Fecha
    FROM CompraMateriales cm
    JOIN StockMateriales stm ON stm.id_stock = cm.id_stock
    WHERE cm.fechaCompraMateriales = ?

    UNION ALL

    SELECT 'REMUNERACION' as TIPO, (CASE WHEN rm.tipoEmpleado = 0 THEN 'Administrativo' ELSE 'Obrero' END) as Descripcion, 
        rm.montoRemuneracion as Monto, rm.fechaRemuneracion as Fecha
    FROM Remuneraciones rm
    WHERE rm.fechaRemuneracion = ?

    UNION ALL

    SELECT 'ALQUILER' as TIPO, concat(dp.nombreDepartamento, " - ", dp.direccionDepartamento) as Descripcion, 
        pal.montoPagoAlquiler as Monto, pal.fechaPagoAlquiler as Fecha
    FROM PagosAlquileres pal
    JOIN AlquilerDepartamentos ald ON ald.id_alquilerDepto = pal.id_alquilerDepto
    JOIN Departamentos dp ON dp.id_departamento = ald.id_departamento
    WHERE pal.fechaPagoAlquiler = ?`;

  // Ejecutamos la consulta
  conection.query(
    query,
    [fechaRegistro, fechaRegistro, fechaRegistro, fechaRegistro, fechaRegistro, fechaRegistro],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error en la base de datos", details: err.message });
      }

      if (results.length > 0) {
        return res.json({
          message: "Datos obtenidos correctamente",
          fecha: fechaRegistro,
          data: results,
        });
      } else {
        return res.status(404).json({ message: "No se encontraron registros para la fecha proporcionada" });
      }
    }
  );
};

module.exports = { alldaily_books, getdaily_books };
