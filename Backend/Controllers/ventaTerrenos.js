const {conection} = require('../DB/config');

const allVentaTerreno = (req,res) =>{
const query = `SELECT * FROM VentaTerrenos`
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
})
}
const singleVentaTerreno = (req,res)=>{
const id = req.params.id;
const query = `SELECT * FROM VentaTerrenos WHERE id_ventaTerreno = ${id}`;

conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}
const createVentaTerreno = (req,res) =>{
const {id_terreno,id_cliente,fechaVentaTerreno} = req.body;
const query = `INSERT INTO VentaTerrenos (id_terreno,id_cliente,fechaVentaTerreno) VALUES (${id_terreno},${id_cliente},'${fechaVentaTerreno}')`;
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}
const editVentaTerreno = (req,res)=>{
const id = req.params.id;
const {id_terreno,id_cliente,fechaVentaTerreno} = req.body;
const query = `UPDATE VentaTerrenos SET id_terreno = ${id_terreno},id_cliente=${id_cliente},fechaVentaTerreno = '${fechaVentaTerreno}' WHERE id_ventaTerreno = ${id}`;
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
})
}
const deleteVentaTerreno = (req,res)=>{
const id = req.params.id;
const query = `UPDATE VentaTerrenos SET activoVentaTerreno = 0 WHERE id_ventaTerreno = ${id}`;
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
}

module.exports = {allVentaTerreno,singleVentaTerreno,createVentaTerreno,editVentaTerreno,deleteVentaTerreno}