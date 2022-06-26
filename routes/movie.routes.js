//Requiero el controlador
const movieController = require('../controllers/MovieController')

//Requiero express
const router = require('express').Router();

//Create movie.
router.post('/movie', movieController.create)
//Get movie by Id
router.get('/movie/id=:id',movieController.getMovieById)
//Get movie by Title
router.get('/movie/',movieController.getMovieByTitle)
//Get all movie
router.get('/movie/all', movieController.getAll)

//Exportamos router.
module.exports = router;