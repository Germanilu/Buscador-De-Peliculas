//Middleware un middleware es una funcion que lo que hace es se ejecutarse antes o despues de la logica de  nuestro controlador

//Importo jsonwebtoken
const jwt = require('jsonwebtoken'); 

//Creo funcion verifyToken
const verifyToken = (req, res, next) => {
    try {
        const {authorization} = req.headers; // recupero el token x headers
        

         //compruebo si el token existe o no, si no existe tiro error
        if(!authorization) {
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }
       
        // Creo token y con metodo split separo el bearer del token y recupero solo el string del token
        const token = authorization.split(' ')[1];   
        
        // este verify comprueba que el token es valido con la firma correspondiente(el secreto)
        var decoded = jwt.verify(token, process.env.JWT_SECRET);

        
        // Si el decoded no es valido tira error
        if(!decoded){
            return res.status(401).json(
                {
                    success: false,
                    message: "Token invalid"
                }
            );
        }

        //Esto no entiendo pq me sirve
        req.user_id = decoded.user_id;
        req.user_role = decoded.user_role;

        // Aqui le digo que continue 
        next();  

        //Capturo el error
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Invalid Token"
            }
        );
    }
}

//Exporto verifyToken
module.exports = verifyToken;