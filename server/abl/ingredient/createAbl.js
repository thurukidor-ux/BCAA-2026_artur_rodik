const ingredientDao = require("../../dao/ingredient-dao.js");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const { v4: uuidv4 } = require("uuid");

const ajv = new Ajv();
addFormats(ajv);

const schema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1 }
    },
    required: ["name"],
    additionalProperties: true
};

function create(req, res) {
    console.log("ABL: Start create s daty:", req.body);
    try {
        let ingredient = req.body;


        const valid = ajv.validate(schema, ingredient);
        if (!valid) {
            console.log("ABL: Validace selhala");
            return res.status(400).json({
                code: "dtoInIsNotValid",
                errors: ajv.errors
            });
        }


        const all = ingredientDao.list();
        if (all.some(i => i.name.toLowerCase() === ingredient.name.toLowerCase())) {
            console.log("ABL: Ingredience již existuje");
            return res.status(400).json({ code: "ingredientAlreadyExists" });
        }


        ingredient.id = uuidv4();
        const savedIngredient = ingredientDao.create(ingredient);

        console.log("ABL: Úspěšně uloženo přes DAO");
        res.json(savedIngredient);

    } catch (e) {
        console.error("ABL ERROR (create):", e);
        res.status(500).json({ message: e.message });
    }
}

module.exports = create;