//Requiero el controlador
const orderController = require('../controllers/OrderController');
const verifyToken = require('../middlewares/verifyToken');
const isSuperAdmin = require('../middlewares/isSuperAdmin');
const router = require('express').Router();

//Create Order
router.post('/order/:id', verifyToken, orderController.create)
//Mostrar TODAS las order realizadas
router.get('/orders',verifyToken,isSuperAdmin, orderController.getAll)


//Exportando router.
module.exports = router;