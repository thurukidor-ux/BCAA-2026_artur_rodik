const ingredientDao = require("../../dao/ingredient-dao.js");

function list(req, res) {
    try {
        const ingredients = ingredientDao.list();
        res.json(ingredients);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = list;