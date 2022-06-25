//Requiero el controlador
const movieController = require('../controllers/MovieController')

//Requiero express
const router = require('express').Router();

//Create movie.
router.post('/movie', movieController.create)


module.exports = router;