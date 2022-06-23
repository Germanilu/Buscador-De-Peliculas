//Creo mi modelo User

//Conecto con mongoose
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
        // maxLength: 10 // maximo de caracteres de la contraseña
    },
    //el role evita que el usuario entre donde no tiene que entrar
    role: {
        type: String,
        enum: ['user', 'admin', 'super_admin'],  //Permite que en role que se almacene algo de tipo string pero lo que siempre yo quiero ( sirve pa restringir)
        default: 'user' // por default el role va a ser de tipo user
        
    },
    
},
    //Sirve para que se ponga por defecto createdAt y updatedAt con la fecha actual
    {
        timestamps: true   
    }

);

//Creo el modelo User 
const User = mongoose.model('User',UserSchema);

//exporto el modelo
module.exports = User;