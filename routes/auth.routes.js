//Me llevo los controllers a esta constante
const authController = require('../controllers/AuthController'); 
const verifyToken = require('../middlewares/verifyToken');
//Requiero express
const router = require('express').Router();

// Estas dos rutas son publicas y no hace falta meterle token xk sino no podria acceder nadie.
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.profile);

//Exporto router
module.exports = router;