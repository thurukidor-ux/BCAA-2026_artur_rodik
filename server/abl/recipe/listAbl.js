const recipeDao = require("../../dao/recipe-dao.js");


module.exports = (req, res) => res.json(recipeDao.list())