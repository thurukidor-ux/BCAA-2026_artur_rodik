const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");

function cook(req, res) {
    try {
        const { id } = req.body;
        const recipe = recipeDao.get(id);
        if (!recipe) return res.status(404).json({ message: "Recipe not found" });

        for (let item of recipe.ingredientsList) {
            const ing = ingredientDao.get(item.ingredientId);
            if (ing.quantityInStock < item.amount) {
                return res.status(400).json({
                    message: `Not enough stock for ${ing.name}. Need ${item.amount}, have ${ing.quantityInStock}`
                });
            }
        }

        recipe.ingredientsList.forEach(item => {
            const ing = ingredientDao.get(item.ingredientId);
            ing.quantityInStock -= item.amount;
            ingredientDao.create(ing);
        });

        res.json({ message: "Cooking successful, stock updated." });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = cook;