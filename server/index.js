const express = require('express');
const ingredientAbl = require("./abl/ingredient-abl");

const app = express();
const port = 3000;

// Klíčové pro zpracování JSONu z Thunder Clienta
app.use(express.json());

// Routy
app.get('/ingredient/list', ingredientAbl.list);
app.post('/ingredient/create', ingredientAbl.create);
app.get('/ingredient/get', ingredientAbl.get);

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
    console.log(`Zkuste POST na http://localhost:3000/ingredient/create`);
});