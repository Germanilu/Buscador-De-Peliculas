const express = require('express'); // almaceno en la variable express
require('dotenv').config(); // para cargar las variables de entorno (.env)
const db = require('./config/database'); // requiero el fichero de config/database.js donde tengo mongoose para que funcione el db 


//Esto se conecta con app.use('/api)
const userRoutes = require('./routes/user.routes') // Esto conecta a la carpeta routes 
const authRoutes = require('./routes/auth.routes'); // esto conecto con auth routes

const app = express(); //conecto express a mi const app

//Middleware un middleware es una funcion que lo que hace es se ejecutarse antes o despues de la logica de  nuestro controlador
app.use(express.json())  // Analizza le richieste json in arrivo e inserisce i dati nel req.body

//Creo variable puerto que va a usar mi servidor
const port = process.env.PORT || 4000; 


//routes
app.use('/api', userRoutes)  // siempre con api como primer endpoint
app.use('/api', authRoutes) // Conecto con auth.routes de rutas 

//ruta de bienvenida
app.get('/' , (req,res) => {   // Primera ruta creada 
    return res.send('Bienvenidos a mi aplicacion de tareas')
});


// Esto es por si no encuentra la ruta indicada retorna un error 404
app.get('*', (req,res) => {
    return res.status(404).send('404 Route not found')
})


//Para que funcione el db
// Ejecuto db para que funcione database.js
db().then(() => {
//Levanto el sv ene l puerto indicado.
app.listen(port, () => {   
    console.log('server is running: ' + port);
}) 
}) 
.catch((error) => {
    console.log("error connecting to mongoDB ", error)
})
