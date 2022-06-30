//Requiero express
const express = require('express'); 
//Cargo las variables de entorno
require('dotenv').config(); 
//Requiero database.js para que funcione el db de mongoose
const db = require('./config/database');  




// Conexion con user routes 
const userRoutes = require('./routes/user.routes') 
// Conexion con auth routes 
const authRoutes = require('./routes/auth.routes'); 
//Conexion con movie routes
const movieRoutes = require('./routes/movie.routes');
//Conexion con order routes
const orderRoutes = require('./routes/order.routes');


//conecto express a mi const app
const app = express(); 

//Analiza la request de entrada y pinta los datos en el body
app.use(express.json())  

//Puerto que utiliza el sv
const port = process.env.PORT || 4000; 


//routes
// Conecto con user.routes
app.use('/api', userRoutes)  
// Conecto con auth.routes 
app.use('/api', authRoutes)  
// Conecto con movie.routes
app.use('/api', movieRoutes)
// Conecto con order.routes
app.use('/api', orderRoutes)

//ruta de bienvenida
app.get('/' , (req,res) => {   // Primera ruta creada 
    return res.send('Bienvenidos a mi aplicacion de tareas')
});


// Si no encuentra la ruta indicada retorna un error 404
app.get('*', (req,res) => {
    return res.status(404).send('404 Route not found')
})



//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});






// Ejecuto db para que funcione database.js
db().then(() => {

app.listen(port, () => {   
    console.log('server is running: ' + port);
}) 
}) 
.catch((error) => {
    console.log("error connecting to mongoDB ", error)
})
