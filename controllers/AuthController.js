//Conecto la const User con mi modelo
const User = require("../models/User");
// importo libreria para encriptar
const bcrypt = require('bcrypt'); 
// importo la libreria del jsonweb token 
const jwt = require('jsonwebtoken'); 

//Creo un objeto vacio y conecto a la constante
const authController = {};


// CREACION DE USUARIO
authController.register = async (req,res) => {
    
    try {
        // almaceno todo lo de req.body 
        const {name, email, password} = req.body 
        
        //Validar campos introducidos (si falta algo no puedo crear el usuario)
        if(!name || !email || !password){
            return res.status(400).json(
                {
                    success: false,
                    message: "Name, email, password are required"
                }
            )
        }

        //Codificacion password
        // es el algoritmo con el cual genero el nuevo hash de la linea abajo el 10 es la cantidad de veces q ejecuto el genSalt
        const salt = await bcrypt.genSalt(10);
        //Conecto a mi encryptedPassword el nuevo hash creado.
        const encryptedPassword = await bcrypt.hash(password, salt);
        

       // Esta logica es por si la contra es menor de 6 = haria para >10 
        if(password.lenght < 6 || password.lenght > 10){
            return res.status(500).json(
                {
                    success: false,
                    message: 'Password is shorter than 6 character'
                }
            )
        }

        //Almaceno todo lo de req.body en una constante con la passwd = a encryptedPassword para esconderla.
        const newUser = {
            name,
            email,
            password: encryptedPassword // aqui una vez encryptada la pass mostrara la passwd encryptada
        }

        //creo el metodo create para que se cree el nuevo usuario
       await User.create(newUser)
        return res.status(200).json(
            {
            success: true,
            message: 'Create user successfully'
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
            success: false,
            message: 'Error creating user: ',
            error: error?.message || error //el ? es como el if else en 1 linea ? or :
            }
        )
    }
};


//LOGIN DE USUARIO
authController.login = async (req,res) => {

    try {
        const { email, password} = req.body;  // Lo que le paso x body 

        //Esto es por si no existe el mail y pass le tiro el error
        if(!email || !password){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Email and password are required'
                }
            );
        }

        // Busco si el usuario existe
        const user = await User.findOne({email: email})  

        // Si el usuario no existe tira bad credential
        if(!user){
            return res.status(400).json(
                {
                    success: false,
                    message: 'Bad Credentials'
                }
            );
        };

        //Reviso si el passw es valido
        const isValidPassword = bcrypt.compareSync(password, user.password);
        
        // Si el passw no es valido tira bad credential
        if(!isValidPassword){
            return res.status(401).json(
                {
                    success: false,
                    message: 'Bad credential'
                }
            );
        }

       //aqui creo mi jsonwebtoken
       // el primer argumento de jwt.sing es la info que quiero que el token almacene en este caso el user id y el user role
       //el secreto sirve para q cuanod accedo la firma sea valida en este caso lo he escondido en el .env en JWT_SECRET
       // El 3cer argumento es cuando expira el token
       const token = await jwt.sign({user_id : user._id, user_role: user.role}, process.env.JWT_SECRET, { expiresIn: '5h' });


        return res.status(200).json(
            {
                success: true,
                message: 'User Logged',
                token: token // Aqui le paso el token
            }
        );

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: 'User Failed'
            }
        )
    }
}

// Metodo para revisar el perfil
authController.profile = async (req,res) => {

    try {
        
        const userId = req.user_id
        //Esto me sirve para que enseñe el perfil del token que esta haciendo la busqueda y que me esconda la password (.select(["-password"]))
        // Si no pongon _id me devolvera siempre el perfil del superadmin 
        const user = await User.findOne({_id: userId}).select(["-password", "-__v"])

        return res.status(200).json(
            {
                success: true,
                message: "User profile",
                data:user
            }
        )

    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: 'User profile failed'
            }
        )
    }
} 



//Exporto authController
module.exports = authController;