
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

        //Per poterlo vedere in compass
        movieName = movie.name

        const newOrder = {
        userId,
        movie,
        movieName
    }

        //User can only order 1 movie at time.
        const order = await Order.find()
        const haveAlready = order.filter(i => i.haveOrder === false);
        if(haveAlready.length != ""){
            return res.status(404).json(
            
                {
                    success: false,
                    message: "User already ordered a film",
                    data: haveAlready
                }
            )
        }
 
       await Order.create(newOrder)

        return res.status(200).json(
            
            {
                success: true,
                message: "Order created.",
                data: userId , movie,
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

orderController.getAll = async (req,res) => {
    try {
        const pedido = await Order.find()
        return res.status(200).json(
            {
                success: true,
                message: 'All orders retrieved succsessfully',
                data: pedido
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error retriving all orders',
                error: error.message
            }
        )
    }
}

module.exports= orderController