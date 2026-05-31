const ingredientDao = require("../../dao/ingredient-dao.js");



function updateStock(req, res) {
    try {
        const { id, amount } = req.body;


        if (typeof amount !== "number" || amount === 0) {
            return res.status(400).json({
                code: "invalidAmount",
                message: "Množství musí být nenulové číslo (kladné pro přidání, záporné pro ubrání)."
            });
        }


        const ingredient = ingredientDao.get(id);
        if (!ingredient) {
            return res.status(404).json({ code: "ingredientNotFound" });
        }


        const newQuantity = (ingredient.quantityInStock || 0) + amount;

        if (newQuantity < 0) {
            return res.status(400).json({
                code: "insufficientStock",
                message: `Nelze ubrat takové množství. Na skladě je pouze ${ingredient.quantityInStock || 0}.`
            });
        }


        ingredient.quantityInStock = newQuantity;
        const updatedIngredient = ingredientDao.create(ingredient);


        res.json({
            message: "Sklad byl úspěšně aktualizován.",
            ingredient: updatedIngredient
        });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = updateStock;