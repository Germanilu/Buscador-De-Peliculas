const Movie = require('../models/Movie')

const movieController = {};

movieController.create = async (req,res) => {
    try {

        const {name, genre, director, actors, year} = req.body

        const newMovie = {
            name,
            genre,
            director,
            actors,
            year
        }

        await Movie.create(newMovie)
        return res.status(200).json(
            {
                success: true,
                message: 'Movie created'
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error creating movie'
            }
        )
    }
}


//Export
module.exports= movieController