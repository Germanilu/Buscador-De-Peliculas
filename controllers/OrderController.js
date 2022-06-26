
const Order = require('../models/Order');
const Movie = require('../models/Movie')

const orderController = {};

//Create Order
orderController.create = async(req,res) => {
    try {
        //Requiero el id de la peli por url
        const {id} = req.params
        //Recupero el userId desde el token
        const userId = req.user_id;
        //Espero a que se encuentre la pelicula
       const movie = await Movie.findById(id)
        //Creo un nuevo pedido
       const newOrder = {
        userId,
        movie
    }
        await Order.create(newOrder)
        return res.status(200).json(
            {
                success: true,
                message: "Order created.",
                data: newOrder
            }
        )
    } catch (error) {
        if(error?.message.includes('Cast to ObjectId failed')){
            return res.status(404).json(
                {
                    success: true,
                    messagge: "Unable to place the Order"

                }
            );
        }

        return res.status(500).json(
            {
                success: false,
                message: 'Unable to place the Order',
                error: error.message
            }
        )
    }
}

module.exports= orderController