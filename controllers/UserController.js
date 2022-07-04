const User = require("../models/User");

const userController = {};

//Metodo getAll
userController.getAll = async (req,res) => {
    try {
        const users = await User.find();

        return res.status(200).json(  
            {
                success: true,  
                message: 'All users retrieved succsessfully',
                data: users 
            }
        );
    } catch (error) {
        return res.status(500).json(  
            {
                success: false,  
                message: 'Error retriving users',
                error: error.message
            }
        )
    }
};

// Metodo get por ID
userController.getUserById = async(req,res) => {
   
    try {
        const {id} = req.params; 

        const user = await User.findById(id) 
       
        if(!user){
            return res.status(404).json
            (
                {
                    success: true,
                    message: "User NOT found",
                    data: [] 
                }
            )
        }

    return res.status(200).json(
        {
            success: true,
            message: "User found",
            data: user 
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

        if(id !== req.user_id ){
            return res.status(200).json(
                {
                    success: true,
                    message: "Unable to delet user, user not found",
                }
            )            
        }

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

module.exports = userController

