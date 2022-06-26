//Requiero el modelo de movie
const Movie = require('../models/Movie')

const movieController = {};

//Metodo Post new Movie
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


//Get Movie By Id
movieController.getMovieById = async(req,res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id)

        //Condicion si el id no existe
        if(!movie){
            return res.status(404).json(
                {
                    success: false,
                    message: 'Movie NOT found'
                }
            )
        };

        return res.status(200).json(
            {
                success: true,
                message: 'Movie found',
                data:movie
            }
        )

    } catch (error) {

        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    messagge: "Error retrieving movie"

                }
            );
        }

        return res.status(500).json(
            {
                success: false,
                message: 'Error retrieving movie',
                error: error?.message || error
            }
        )
    }
}


//Get movie by Title

movieController.getMovieByTitle = async (req,res) => {
    try {
        const {name} = req.body;
        
        const movie = await Movie.findOne({name})

        if(!movie){
            return res.status(404).json(
                {
                    success: false,
                    message: "Movie NOT Found"
                    
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Movie Found",
                data: movie
            }
        )

    } catch (error) {
        return res.status(404).json(
            {
                success: false,
                message: "Movie NOT Found"
                
            }
        )
    }
}


//Get all movie
movieController.getAll = async (req,res) => {
    try {
        const movie = await Movie.find()
        return res.status(200).json(
            {
                success: true,
                message: 'All movie retrieved succsessfully',
                data: movie
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving movies',
                error: error.message
            }
        )
    }
}

//Export movieController
module.exports= movieController