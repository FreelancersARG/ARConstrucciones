const {conection} = require("../DB/config")
const jwt = require("jsonwebtoken"); // importo la libreria jwt


const login = (req,res) =>{
// destructuring de los datos que me llegan por el body osea por front
    const {nombreUsuario,passwordUsuario} = req.body
    // consulta parametrizada o consulta preparada para evitar inyecciones de sql
    const query = `SELECT * FROM usuarios WHERE email = ? AND pass = ?`
    conection.query(query,[nombreUsuario],(err,results)=>{// le paso primero un array con el nombre de usuario
        if(err){ // verificaccion de existe un error
            console.error('Error al consultar la base de datos:', err);
            // si hay un error retorno un json con un mensaje de error del servidor
            return res.status(500).json({ message: 'Error del servidor' });
                }
                if(results.length > 0){ // si la consulta me trae un resultado
                   const user = results[0]; // guardo el resultado en una variable user
                   if(nombreUsuario === user.nombreUsuario && passwordUsuario === user.passwordUsuario){ // comparo si el nombre de usuario y la contraseña son iguales a los que me trajo la consulta
                    // si son iguales genero un token con la libreria jwt   
                    const token = jwt.sign(
                                           {id: user.id_usuario, role: user.rol}, // le paso un objeto con el id y el rol del usuario
                                            process.env.SECRETKEY, // le paso la clave secreta
                                            {expiresIn: '1h' }, // le paso el tiempo de expiracion del token 
                                            {notBefore: '2s'} // le paso el tiempo de no antes de expiracion del token
                                        );
                          // retorno un json con un mensaje de usuario autenticado y el token
                          return res.json({message: 'Usuario autenticado', token: token});
                   }else { // si no son iguales retorno un json con un mensaje de usuario o contraseña incorrectos
                    // si no son iguales retorno un json con un mensaje de usuario o contraseña incorrectos
                    return res.status(401).json({ message: 'Usuario o contraseña incorrectos 1°' });
                }
            } else { // si la consulta no me trae resultados
                return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
            }
        });
    };
                
// Función para la recuperación de contraseña (aún por implementar)
const recuperarPass = (req,res) =>{

}

module.exports = {login,recuperarPass}