const express = require('express');
const ingredientAbl = require("./abl/ingredient-abl");
const recipeAbl = require("./abl/recipe-abl");

const IngredientSearchAbl = require("./abl/ingredient/searchAbl");//

const app = express();
app.use(express.json());

app.get('/ingredient/list', ingredientAbl.list);
app.post('/ingredient/create', ingredientAbl.create);
app.get('/ingredient/get', ingredientAbl.get);
app.post('/ingredient/updateStock', ingredientAbl.updateStock);

app.get("/ingredient/search", IngredientSearchAbl);

app.post('/recipe/create', recipeAbl.create);
app.get('/recipe/list', recipeAbl.list);
app.post('/recipe/cook', recipeAbl.cook);
app.get('/recipe/search', recipeAbl.search);

app.listen(3000, () => console.log(`Server běží na portu Artur Rodik`));