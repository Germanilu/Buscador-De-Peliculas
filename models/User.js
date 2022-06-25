// Modelo User

//Requiero mongoose
const mongoose = require('mongoose');

//Creo el schema 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, // es requerido si o si
        unique: true, //Es unico no se peude repetir
    },
    password: {
        type: String,
        required: true,
        minLength: 6, //minimo de caracteres de la contraseña
    },
    //Role de usuario 
    role: {
        type: String,
        enum: ['user', 'admin', 'super_admin'],  
        default: 'user' // Por default el role va a ser de tipo user
        
    },
    
},
    //Para que se ponga por defecto createdAt y updatedAt con la fecha actual
    {
        timestamps: true   
    }

);

//Creo el modelo User 
const User = mongoose.model('User',UserSchema);

//exporto el modelo
module.exports = User;

