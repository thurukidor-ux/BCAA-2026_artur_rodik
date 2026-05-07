const express = require('express');


const IngredientSearchAbl = require("./abl/ingredient/searchAbl");
const IngredientCreateAbl = require("./abl/ingredient/createAbl");
const IngredientListAbl = require("./abl/ingredient/listAbl");
const IngredientUpdateStockAbl = require("./abl/ingredient/updateStockAbl");
const IngredientgetAbl = require("./abl/ingredient/getAbl");

const recipeCookAbl = require("./abl/recipe/cookAbl");
const recipeCreateAbl = require("./abl/recipe/createAbl");
const recipeSearchAbl = require("./abl/recipe/searchAbl");
const recipeListAbl = require("./abl/recipe/listAbl");

const app = express();
app.use(express.json());

app.post("/ingredient/create", IngredientCreateAbl);
app.get("/ingredient/search", IngredientSearchAbl);
app.get("/ingredient/list", IngredientListAbl);
app.post("/ingredient/updateStock", IngredientUpdateStockAbl);
app.get('/ingredient/get', IngredientgetAbl);

app.post('/recipe/cook', recipeCookAbl);
app.post('/recipe/create', recipeCreateAbl);
app.get('/recipe/search', recipeSearchAbl);
app.get('/recipe/list', recipeListAbl);






app.listen(3000, () => console.log(`Server běží na portu Artur Rodik`));