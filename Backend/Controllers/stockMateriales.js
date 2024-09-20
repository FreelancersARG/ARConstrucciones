const {conection} = require("../DB/config");

const allStockMateriales = (req,res)=>{
    const query = `select * from StockMateriales;`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

const singleStockMateriales = (req,res)=>{
    const id = req.params.id;
    const query = `select * from StockMateriales where id_stock = ${id};`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

const createStockMateriales = (req,res)=>{
    const {nombreMaterial, cantidadStock, ubicacionStock, activoStock} = req.body;
    const query = `insert into StockMateriales (nombreMaterial, cantidadStock, ubicacionStock, activoStock) values ('${nombreMaterial}', ${cantidadStock}, ${ubicacionStock}, ${activoStock});`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}


const editStockMateriales = (req,res)=>{
    const id = req.params.id;
    const {nombreMaterial, cantidadStock, activoStock} = req.body;
    const query = `update StockMateriales set nombreMaterial = '${nombreMaterial}', cantidadStock = ${cantidadStock},ubicacionStock = ${ubicacionStock}, activoStock = ${activoStock} where id_stock = ${id};`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

const deleteStockMateriales = (req,res)=>{
    const id = req.params.id;
    const query = `update StockMateriales set activoStock = 0 where id_stock = ${id};`
    conection.query(query,(err,results)=>{
        if(err) throw err;
        res.json(results);
    })
}

module.exports = {allStockMateriales, singleStockMateriales, createStockMateriales, editStockMateriales, deleteStockMateriales}