const ingredientDao = require("../dao/ingredient-dao.js");
const { v4: uuidv4 } = require("uuid");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string", minLength: 3 },
        unit: { type: "string" }
    },
    required: ["name", "unit"],
};

function create(req, res) {
    console.log("ABL: Start create s daty:", req.body);
    try {
        let ingredient = req.body;
        ingredient.id = uuidv4();

        const valid = ajv.validate(schema, ingredient);
        if (!valid) {
            console.log("ABL: Validace selhala");
            return res.status(400).json({ code: "dtoInIsNotValid", errors: ajv.errors });
        }

        const all = ingredientDao.list();
        if (all.some(i => i.name === ingredient.name)) {
            console.log("ABL: Ingredience již existuje");
            return res.status(400).json({ code: "ingredientAlreadyExists" });
        }

        const savedIngredient = ingredientDao.create(ingredient);
        console.log("ABL: Úspěšně uloženo přes DAO");

        res.json(savedIngredient);
    } catch (e) {
        console.error("ABL ERROR (create):", e);
        res.status(500).json({ message: e.message });
    }
}

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

function list(req, res) {
    try {
        const ingredients = ingredientDao.list();
        res.json(ingredients);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}


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





module.exports = { create, get, list, updateStock };