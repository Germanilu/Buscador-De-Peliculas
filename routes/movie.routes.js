//Requiero el controlador
const movieController = require('../controllers/MovieController')

//Requiero express
const router = require('express').Router();

//Create movie.
router.post('/movie/', movieController.create)
//Get movie by Id
router.get('/movie/id=:id',movieController.getMovieById)
//Get movie by Title
router.get('/movie/name=:name',movieController.getMovieByTitle)
//Get all movie
router.get('/movie/all', movieController.getAll)
//get by Director
router.get('/movie/director=:director',movieController.getMovieByDirector)
//get by Actor
router.get('/movie/actors=:actors',movieController.getMovieByActor)
//Filter movie by genre
router.get('/movie/genre=:genre', movieController.getByGenre)

//Exportamos router.
module.exports = router;