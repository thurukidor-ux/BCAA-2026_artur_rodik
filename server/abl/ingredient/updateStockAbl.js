const ingredientDao = require("../../dao/ingredient-dao.js");

function updateStock(req, res) {
    try {
        const { id, amount } = req.body;


        if (typeof amount !== "number" || amount <= 0) {
            return res.status(400).json({
                code: "invalidAmount",
                message: "Množství musí být kladné číslo."
            });
        }

        const ingredient = ingredientDao.get(id);
        if (!ingredient) {
            return res.status(404).json({ code: "ingredientNotFound" });
        }


        ingredient.quantityInStock = (ingredient.quantityInStock || 0) + amount;


        const updatedIngredient = ingredientDao.create(ingredient);

        res.json({
            message: "Zásoby byly úspěšně doplněny.",
            ingredient: updatedIngredient
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = updateStock;