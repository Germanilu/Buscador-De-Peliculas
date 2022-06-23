
// Requiero express para las rutas
const router = require('express').Router()

//Me llevo los controllers
const userController = require('../controllers/UserController');

//Requiero la funcion middleware de isSuperAdmin
const isSuperAdmin = require('../middlewares/isSuperAdmin');
//Requiero la funcion middleware de verifyToken
const verifyToken = require('../middlewares/verifyToken');


//Todas las rutas tienen verifyToken para que se verifique que el usuario existe y esta registrado
//Ruta para buscar todos los usuarios
router.get('/users', verifyToken, isSuperAdmin, userController.getAll);  

// Ruta para buscar un usuario por Id
router.get('/users/:id', verifyToken, isSuperAdmin, userController.getUserById); 

//Ruta para borrar el usuario pasando el Id por url
router.delete('/users/:id',verifyToken,  userController.deleteById);

//Ruta para actualizar el usuario pasando el Id por url
router.put('/users/:id', verifyToken, userController.update);

//Exporto router
module.exports = router