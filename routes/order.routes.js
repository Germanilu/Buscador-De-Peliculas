//Requiero el controlador
const orderController = require('../controllers/OrderController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

//Create Order
router.post('/order/:id', verifyToken, orderController.create)

//Exportando router.
module.exports = router;