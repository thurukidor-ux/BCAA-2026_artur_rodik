const ingredientDao = require("../../dao/ingredient-dao.js");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

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

function SearchAbl(req, res) {
    try {

        const queryData = req.query;


        const valid = ajv.validate(schema, queryData);
        if (!valid) {
            return res.status(400).json({
                code: "invalidDtoIn",
                message: "Neplatný vstupní formát",
                validationError: ajv.errors,
            });
        }

        const { name } = queryData;


        const allIngredients = ingredientDao.list();


        const filtered = allIngredients.filter((ing) =>
            ing.name.toLowerCase().includes(name.toLowerCase())
        );


        console.log(`ABL: Vyhledáno ${filtered.length} výsledků pro: "${name}"`);
        res.json(filtered);

    } catch (e) {
        console.error("ABL ERROR (search):", e);
        res.status(500).json({
            code: "internalServerError",
            message: e.message
        });
    }
}


module.exports = SearchAbl;