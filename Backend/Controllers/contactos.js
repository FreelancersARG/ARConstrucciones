const {conection} = require("../DB/config");
const {transporter} = require("../DB/Envio-Mail");

const allContactos=(req,res)=>{
const query = `select * from Contactos`
conection.query(query,(err,results)=>{
    if(err){
        return res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
})
}

const singleContactos=(req,res)=>{
const id = req.params.id;
const query = `select * from Contactos where id_contacto = ${id}`;
conection.query(query,(err,results)=>{
    if(err){
        res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
};

const createContactos=(req,res)=>{
const {nombreContacto,mailContacto,motivoContacto,campoTexto} = req.body;
const query = `insert into Contactos (nombreContacto,mailContacto,motivoContacto,campoTexto) values ("${nombreContacto}","${mailContacto}","${motivoContacto}","${campoTexto}")`;
conection.query(query,(err,results)=>{
    if(err){
        res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);

    // Configuracion del envio de mail
    let mailOptions = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: `Consulta desde la Pagina-Web de: ${nombreContacto}`, //asunto
        text:` 
              Nombre: ${nombreContacto}

              Email: ${mailContacto}
               
              Motivo: ${motivoContacto}

              Comentario: ${campoTexto}
        `
    }
    // Envio de mail
    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            return res.status(500).json({error:'Error en el envio de mail', details: err.message});
        }
        res.status(200).json({message:'Mail enviado correctamente', info: info.response});
    })

})
};
const editContactos=(req,res)=>{
const id = req.params.id;
const {nombreContacto,mailContacto,motivoContacto,campoTexto} = req.body;
const query = `update Contactos set nombreContacto="${nombreContacto}",mailContacto="${mailContacto}",motivoContacto="${motivoContacto}",campoTexto="${campoTexto}" where id_contacto=${id}`;
conection.query(query,(err,results)=>{
    if(err){
        res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results)
})
};
const deleteContactos=(req,res)=>{
const id = req.params.id;
const query = `delete from Contactos where id_contacto=${id}`;
conection.query(query,(err,results)=>{
    if(err){
        res.status(500).json({error:'Error en la base de datos', details: err.message});
    }
    res.json(results);
})
};

module.exports = {allContactos,singleContactos,createContactos,editContactos,deleteContactos}