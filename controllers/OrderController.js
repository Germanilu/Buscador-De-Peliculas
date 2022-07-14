
const Order = require('../models/Order');
const Movie = require('../models/Movie')

const orderController = {};

//Create Order
orderController.create = async(req,res) => {
    try {
        //Requiero el id de la peli por url
        const { id } = req.params
        console.log("este es el id de la peli",id)
        //Recupero el userId desde el token
        const userId = req.user_id;
        //Espero a que se encuentre la pelicula
        const movie = await Movie.findById(id)
            console.log("LLego aqui", movie)
        const movieName = movie.name
        console.log("moviename",movieName)

        const newOrder = {
        userId,
        movieName,
        movie
    }      

    
        //Logic if user already Order 1 movie.
        const order = await Order.find({userId})
          
        if(order.length > 0){
            return res.status(400).json(
                {
                    success: false,
                    message: "Ya tienes una pelicula alquilada",
                    data: movieName
                    
                }
            )
        }

        //Creacion Nueva Orden
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

orderController.getbyUserId = async (req,res) => {
    try {
        const {userId} = req.body;
        
        
        const pedido = await Order.find({userId});
        
        if(!userId || pedido.length === 0 || !pedido){
             
            return res.status(404).json(
                
                {
                    success: false,
                    message: "pedido Not Found by user ID"             
                }
            )
        }

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




orderController.getMyOrder = async(req,res) => {
    try {
        const idusuario = req.user_id
        console.log(idusuario)
        const order = await Order.findOne( {userId:idusuario})

        console.log("Soy x",order._id)
        return res.status(200).json(
            {
                success: true,
                message: "User profile",
                data:order
            }
        )
    } catch (error) {
        return res.status(400).json(
            {
                success: false,
                message: 'ERROR'
            }
        )
    }
}

module.exports= orderController