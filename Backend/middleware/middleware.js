const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Cargar las variables de entorno
dotenv.config();

// Obtener la clave secreta de las variables de entorno
const secretKey = process.env.SECRETKEY;

// Middleware para verify el token
const verifyToken = (req, res, next) => { // middleware para verificar el token
    // obtener el token de la solicitud
    const authHeader = req.headers["authorization"]; // obtener el header de autorizacion
    // si no hay token
    if (!authHeader) {
      // si no hay token retorno un json con un mensaje de no hay token
        return res.status(403).json({ message: "No token provided primero" });
    }
    // si hay token
    const token = authHeader.split(' ')[1]; //  Extraer el token del formato 'Bearer <token>'
    // si no hay token
    if (!token) {
        // si no hay token retorno un json con un mensaje de no hay token
        return res.status(403).json({ message: "No token provided" });
    }

  // verificar el token -  Verificar el token JWT usando la clave secreta
    jwt.verify(token, secretKey, (err, decoded) => {
      // si hay un error
        if (err) {
            // si hay un error retorno un json con un mensaje de fallo al autenticar el token
            return res.status(500).json({ message: "esto Failed to authenticate token" });
        }
        req.userId = decoded.id; // guardar el id del usuario en el request
        req.userRole = decoded.role; // guardar el rol del usuario en el request
        next(); // continuar con la siguiente funcion
    });
};

module.exports = {verifyToken}