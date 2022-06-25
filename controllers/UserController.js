//Me llevo los modelos de User
const User = require("../models/User");

//Constante userController con objeto
const userController = {};

//Metodo getAll
userController.getAll = async (req,res) => {
    try {
        const users = await User.find();

        return res.status(200).json(  // mi devolucion va a ser de tipo json 
            {
                success: true,  // Esto sera que ha ido bien
                message: 'All users retrieved succsessfully', // Este sera el mensaje
                data: users // Esta es la info users
            }
        );
    } catch (error) {
        return res.status(500).json(  // mi devolucion va a ser de tipo json 
            {
                success: false,  // Esto sera que ha ido mal
                message: 'Error retriving users', // Este sera el mensaje
                error: error.message // que devuelva el error
            }
        )
    }
};



// Metodo get por ID
userController.getUserById = async(req,res) => {
    //console.log(req.params); // recupero para ver si funca y lo veo en consola

    try {
        const {id} = req.params; // aqui recupero el id por url

        const user = await User.findById(id) // almaceno la consulta asincronta en la const user

        //Este bloque if me devuelve si la busqueda esta hecha bien osea el id esta escrito bien es valido sino me devolvera el catch de abajo
        if(!user){
            return res.status(404).json
            (
                {
                    success: true,
                    message: "User NOT found",
                    data: [] // paso el user d arriba aqui
                }
            )
        }

    return res.status(200).json(
        {
            success: true,
            message: "User found",
            data: user // paso el user d arriba aqui
        }
    )
    } catch (error) {
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    messagge: "Error User NOT Found"

                }
            );
        }
        return res.status(500).json(
            {
                success: false,
                messagge: "Error finding user",
                error: error?.message || error
            }
        )
    }
};



//Metodo DELETE BY ID
userController.deleteById = async(req,res) => {


    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id)
        return res.status(200).json(
            {
                success: true,
                message: "User deleted",
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to delete user, user not found",
                error: error?.message || error
            }
        )
    }
}


//METODO UPDATE
userController.update = async (req,res) => {
    try {
        const {id} = req.params;
        if(req.body.name === ""){
            return res.status(400).json(
                {
                    success: false,
                    message: "Unable to update, missing data " 
                }
            )
        }

        const {name,email,password} = req.body
        const updateUser = {
            name,
            email,
            password
        }
    
       await User.findOneAndUpdate({_id:id},updateUser) 
        return res.status(200).json(
            {
                success: true,
                message: "User Update Succesfully",
            }
        )
        
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Unable to Update Data",
                error: error?.message || error
            }
        )
    }
}

//Exporto userController
module.exports = userController

