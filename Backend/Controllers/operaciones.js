const {conection} = require('../DB/config');

const allOperaciones = (req,res)=>{
const query = `select * from Operaciones`
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    
}});
}
const singleOperaciones = (req,res)=> {
  const id = req.params.id
  const query = `select * from Operaciones where id_operacion = ${id}`
  conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
  })
}
const createOperaciones =(req,res)=>{
const {nombreOperacion,tipoOperacion, montoOperacion,detalleOperacion, fechaOperacion} = req.body
const query = `insert into Operaciones (nombreOperacion, tipoOperacion, montoOperacion,detalleOperacion,fechaOperacion) values (${nombreOperacion}, ${tipoOperacion}, ${montoOperacion},${detalleOperacion}, ${fechaOperacion})`
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}
const editOperaciones = (req,res)=>{
const id = req.params.id;
const {nombreOperacion,tipoOperacion, montoOperacion,detalleOperacion, fechaOperacion} = req.body
const query = `update Operaciones set nombreOperacion = ${nombreOperacion}, tipoOperacion = ${tipoOperacion}, montoOperacion = ${montoOperacion},detalleOperacion = ${detalleOperacion}, fechaOperacion = ${fechaOperacion} where id_operacion = ${id}`
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({erro:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}
const deleteOperaciones = (req,res) =>{
    const id = req.params.id;
    const query = `update Operaciones set activoOperacion = 0 where id_operacion = ${id}`
    conection.query(query,(err,results)=>{
        if(err){
            return res.status(500).json({erro:'Error en la base de datos', details: err.message})
        }
        res.json(results);
    })
}

module.exports = {allOperaciones,singleOperaciones,createOperaciones,editOperaciones,deleteOperaciones}


