const ingredientDao = require("../../dao/ingredient-dao.js");

function get(req, res) {
    try {
        const id = req.query.id;
        const ingredient = ingredientDao.get(id);
        if (!ingredient) {
            return res.status(404).json({ code: "ingredientNotFound" });
        }
        res.json(ingredient);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}



module.exports = get;