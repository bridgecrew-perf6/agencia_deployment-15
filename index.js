//Common js (esta sintaxis de abajo)
//const express = require('express');

//Modulos nativos para los imports y exports
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//Conectar la Base de datos (DB)
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error))

//Puerto y HOST para la app - Heroku la va a asignar solo
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

//CADA UNA DE ESTAS LINEAS DE app. son lineas de middleware en express

//Habilitar Pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    next();
})

//Agregar Body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port} y host: ${host}`);
});


//*******************************************************************************//

/*LO MOVEMOS TODO A LA CARPETA ROUTES
app.get('/', (req, res) => {//req: lo que enviamos / res: lo que express nos responde
    res.send('Hola mundo');
    /*res.json({
        id: 1
    });
    //res.render();
});

app.get('/nosotros', (req, res) => {
    res.send('nosotros');
});

app.get('/contacto', (req, res) => {
    res.send('contacto');
});*/