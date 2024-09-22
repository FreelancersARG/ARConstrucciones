const nodemailer = require('nodemailer');
const dotenv = require("dotenv");

dotenv.config();

let transporter = nodemailer.createTransport({
   
     service: process.env.SERVICE,//poner proveedor de servicio de mail ejemplo gmail/hotmail
        auth: {
            user: process.env.EMAIL, //poner email
            pass: process.env.PASS_2 //poner contraseña
        }

});

module.exports = {transporter};