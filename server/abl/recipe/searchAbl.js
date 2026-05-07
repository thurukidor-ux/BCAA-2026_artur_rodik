const recipeDao = require("../../dao/recipe-dao.js");

function search(req, res) {
    try {

        const { text } = req.query;

        if (!text) {
            return res.status(400).json({
                code: "missingSearchTerm",
                message: "Parametr 'text' je povinný pro vyhledávání receptů."
            });
        }

        const allRecipes = recipeDao.list();


        const filtered = allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(text.toLowerCase()) ||
            (recipe.description && recipe.description.toLowerCase().includes(text.toLowerCase()))
        );

        console.log(`ABL: Vyhledáno ${filtered.length} receptů pro výraz: ${text}`);
        res.json(filtered);
    } catch (e) {
        console.error("ABL ERROR (recipe-search):", e);
        res.status(500).json({ message: e.message });
    }
}

module.exports = search;