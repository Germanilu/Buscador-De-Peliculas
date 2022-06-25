//Requiero mongoose
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;