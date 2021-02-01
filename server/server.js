require('./config/config');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
// console.log(path.resolve(__dirname, '../public'));

// Configuracion global de rutas
app.use(require('./routes/index'));




mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        throw err;
    }
    console.log('Base de Datos online');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
})