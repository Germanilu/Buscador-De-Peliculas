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
        enum: ['adventure', 'fantasy', 'action', 'terror','Science fiction', 'comedi', 'drama', 'musical', 'suspense', 'peliculas 3D'],  
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
    year: {
        type: Number,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;