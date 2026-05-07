const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");
const { v4: uuidv4 } = require("uuid");
const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 3 },
        description: { type: "string" },
        instruction: { type: "string" },
        ingredientsList: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    ingredientId: { type: "string" },
                    amount: { type: "number", minimum: 1 }
                },
                required: ["ingredientId", "amount"]
            }
        }
    },
    required: ["name", "instruction", "ingredientsList"]
};

function create(req, res) {
    try {
        let recipe = req.body;

        const valid = ajv.validate(schema, recipe);
        if (!valid) return res.status(400).json({ code: "dtoInIsNotValid", errors: ajv.errors });

        for (let item of recipe.ingredientsList) {
            if (!ingredientDao.get(item.ingredientId)) {
                return res.status(400).json({
                    code: "ingredientNotFound",
                    message: `Ingredient ${item.ingredientId} does not exist.`
                });
            }
        }

        recipe.id = uuidv4();
        const savedRecipe = recipeDao.create(recipe);
        res.json(savedRecipe);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

module.exports = create;