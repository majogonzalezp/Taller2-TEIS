// Ejecutar el proyecto con --> npm start

const express = require('express');
const os = require("os")
const app = express();
const path = require('path');
const port = 80;

// Requerimos el módulo de datos de pokeneas
app.use(express.json());
const pokeneas = require('./pokeneas');

app.use(express.static('public')); // Middleware para servir archivos estáticos

// Ruta para servir la página principal
app.get('/pokenea', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Ruta para mostrar información JSON de un pokenea aleatorio
app.get('/api/randompokenea', (req, res) => {
    const number = Math.floor(Math.random() * pokeneas.length);
    const randomPokenea = pokeneas[number];
    randomPokenea.hostname = os.hostname();
    res.json(randomPokenea);
});

app.get('/api/pokenea', (req, res) => {
    const randomIndex = Math.floor(Math.random() * pokeneas.length);
    const randomPokenea = pokeneas[randomIndex];
    const keysToKeep = ["id", "name", "height", "ability"];

    // Filtrar pokenea para mantener solo las propiedades deseadas
    const filteredPokenea = keysToKeep.reduce((obj, key) => {
        if (randomPokenea.hasOwnProperty(key)) {
            obj[key] = randomPokenea[key];
        }
        return obj;
    }, {});

    filteredPokenea.hostname = os.hostname();

    res.json(filteredPokenea);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});