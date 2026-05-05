const path = require("path");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const ingredientDao = require("../dao/ingredient-dao.js");
const { v4: uuidv4 } = require("uuid");
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
    // additionalProperties: false,
};

async function create(req, res) {
    console.log("ABL: Přijat požadavek na vytvoření");
    try {
        let ingredient = req.body;
        ingredient.id = uuidv4();

        const valid = ajv.validate(schema, ingredient);
        if (!valid) {
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }


        const list = ingredientDao.list();
        const exists = list.find((i) => i.name === ingredient.name);
        if (exists) {
            res.status(400).json({
                code: "ingredientAlreadyExists",
                message: `Ingredient with name ${ingredient.name} already exists`,
            });
            return;
        }


        ingredient = ingredientDao.create(ingredient);


        res.json(ingredient);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

async function get(req, res) {
    try {
        const { id } = req.query;
        const ingredient = ingredientDao.get(id);
        if (!ingredient) {
            res.status(404).json({
                code: "ingredientNotFound",
                message: `Ingredient with id ${id} not found`,
            });
            return;
        }
        res.json(ingredient);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

function list(req, res) {
    const ingredients = ingredientDao.list();
    res.json(ingredients);
}


module.exports = {
    create,
    get,
    list
};