//Requiero mongoose
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['Aventura', 'Dibujos Animados', 'Acción', 'Terror','Ciencia Ficción', 'Comedia', 'Drama', 'Musical', 'Suspense', 'Peliculas 3D'],  
        default: ''
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: Array,
        required: true,
        
    },
    description:{
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        require: true,
        default: ""
    },
    price: {
        type: Number,
        required: true
    }
    
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;