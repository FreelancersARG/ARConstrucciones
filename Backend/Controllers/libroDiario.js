const {conection} = require("../DB/config");

const alldaily_books = (req,res) =>{
// todas las fechas vienen desde el front por medio de un formulario y es traida por req.body
const {fechaPagoCert,fechaVentaTerreno,fechaOperacion,fechaCompraMateriales,fechaRemuneracion,fechaPagoAlquiler} = req.body 
// todas las fechas son las mismas osea en el front estaran igualadas, con esto logramos
// poder ser mostrados todos los datos por dia mostrando el libro diario 

const query = `SELECT 'CERTIFICADO' as TIPO, o.nombreObra as Descripcion, c.montoCert as Monto, c.fechaPagoCert as Fecha
FROM Certificados c
JOIN Obras o ON o.id_obra = c.id_obra
WHERE c.fechaPagoCert = '${fechaPagoCert}'

UNION ALL

SELECT 'VENTA TERRENO' as TIPO, t.direccionTerreno as Descripcion, t.precioTerreno as Monto, vt.fechaVentaTerreno as Fecha
FROM VentaTerrenos vt
JOIN Terrenos t ON t.id_terreno = vt.id_terreno
WHERE vt.fechaVentaTerreno = '${fechaVentaTerreno}'

UNION ALL

SELECT 'OPERACION' as TIPO, concat(op.nombreOperacion, " ", op.tipoOperacion) as Descripcion, op.montoOperacion as Monto, op.fechaOperacion as Fecha
FROM Operaciones op
WHERE op.fechaOperacion = '${fechaOperacion}'

UNION ALL

SELECT 'COMPRA MATERIAL' as TIPO, concat(stm.nombreMaterial, " (", cm.cantidadMaterial, ")") as Descripcion, 
    cm.precioMaterial as Monto, cm.fechaCompraMateriales as Fecha
FROM CompraMateriales cm
JOIN StockMateriales stm ON stm.id_stock = cm.id_stock
WHERE cm.fechaCompraMateriales = '${fechaCompraMateriales}'

UNION ALL

SELECT 'REMUNERACION' as TIPO, (CASE WHEN rm.tipoEmpleado = 0 THEN 'Administrativo' ELSE 'Obrero' END) as Descripcion, 
    rm.montoRemuneracion as Monto, rm.fechaRemuneracion as Fecha
FROM Remuneraciones rm
WHERE rm.fechaRemuneracion = '${fechaRemuneracion}'

UNION ALL

SELECT 'ALQUILER' as TIPO, concat(dp.nombreDepartamento, " - ", dp.direccionDepartamento) as Descripcion, 
    pal.montoPagoAlquiler as Monto, pal.fechaPagoAlquiler as Fecha
FROM PagosAlquileres pal
JOIN AlquilerDepartamentos ald ON ald.id_alquilerDepto = pal.id_alquilerDepto
JOIN Departamentos dp ON dp.id_departamento = ald.id_departamento
WHERE pal.fechaPagoAlquiler = '${fechaPagoAlquiler}'`
conection.query( query,(err,results)=>{
 if(err) {
    return res.status(500).json({ error: 'Error en la base de datos', details: err.message });
         }
    res.json(results);
})
};

const singlediary_book = (req,res) =>{

}

module.exports = {alldaily_books,singlediary_book};