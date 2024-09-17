const {conection} = require("../DB/config");

const allCashFlow =(req,res)=>{
// todas las fechas vienen desde el front por medio de un formulario y es traida por req.body
    const {fechaInicio, fechaFin} = req.body
//Las fechas de inicio y fin las traigo del front son las que cumplen el roll para que sea un mes
 
    const query = `select "Ingresos por Ventas de Terrenos" as TIPO, sum(t.precioTerreno) as Monto from Terrenos t 
join VentaTerrenos vt on t.id_terreno = vt.id_terreno
where vt.fechaVentaTerreno >= '${fechaInicio}' and vt.fechaVentaTerreno <='${fechaFin}'
UNION ALL
select "Ingresos por Obras Privadas" as TIPO, sum(montoCert) as Monto from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '${fechaInicio}' and fechaPagoCert <='${fechaFin}' 
and sectorObra = 1
UNION ALL
select "Ingresos por Obras Publicas" as TIPO, sum(montoCert) as Monto from Certificados c
join Obras o on o.id_obra = c.id_obra where fechaPagoCert >= '${fechaInicio}' and fechaPagoCert <='${fechaFin}' 
and sectorObra = 0
UNION ALL
select "Ingresos por Alquiler duplex " as TIPO,sum(montoPagoAlquiler) as Monto from PagosAlquileres where fechaPagoAlquiler >= '${fechaInicio}' 
and fechaPagoAlquiler <='${fechaFin}'
UNION ALL
select "OPERACIONES" as TIPO,sum(montoOperacion) as Monto from Operaciones where fechaOperacion >= '${fechaInicio}' 
and fechaOperacion <='${fechaFin}'
UNION ALL
select "Compra de Materiales Obra" as TIPO,sum(precioMaterial) as Monto from CompraMateriales where fechaCompraMateriales >= '${fechaInicio}' and fechaCompraMateriales <='${fechaFin}'
UNION ALL
select "Salarios Administrativos" as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '${fechaInicio}' 
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 0 and sectorRemuneracion = 1
UNION ALL
select "Salarios de Obras Privadas" as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '${fechaInicio}' 
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 1 and sectorRemuneracion = 1
UNION ALL
select "Salarios de Obras Publicas" as TIPO,sum(montoRemuneracion) as Monto from Remuneraciones where fechaRemuneracion >= '${fechaInicio}' 
and fechaRemuneracion <='${fechaFin}' and tipoEmpleado = 1 and sectorRemuneracion = 0
`
conection.query(query,(err,results)=>{
    if(err) {
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
});

} 


const singlerCashFlow = (req,res) =>{}

module.exports = {allCashFlow, singlerCashFlow}