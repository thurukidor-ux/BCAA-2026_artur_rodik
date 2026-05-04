const express = require('express');
const Ajv = require('ajv');
const { v4: uuidv4 } = require('uuid');

const app = express();
const ajv = new Ajv();
const port = 3000;

app.use(express.json());

// Databáze v operační paměti
let ingredients = [];

// Schéma pro ingredienci (atributy: name, unit, quantityInStock)[cite: 1]
const ingredientSchema = {
    type: "object",
    properties: {
        name: { type: "string", minLength: 1 },
        unit: { enum: ["g", "ml", "ks"] }, // Jednotky z tvé tabulky[cite: 1]
        quantityInStock: { type: "integer", minimum: 0 } // Musí být 0 nebo více[cite: 1]
    },
    required: ["name", "unit", "quantityInStock"]
};

const validate = ajv.compile(ingredientSchema);

// --- ENDPOINTY ---

// 1. Zobrazení všech surovin (Katalog surovin)[cite: 1]
app.get('/ingredient/list', (req, res) => {
    res.json(ingredients);
});

// 2. Vytvoření suroviny (např. Mouka)[cite: 1]
app.post('/ingredient/create', (req, res) => {
    const isValid = validate(req.body);

    if (!isValid) {
        return res.status(400).json({ error: "Chyba validace", details: validate.errors });
    }

    const newIngredient = {
        id: uuidv4(), // Vygenerování unikátního UUID[cite: 1]
        ...req.body
    };

    ingredients.push(newIngredient); // Uložíme do pole
    res.status(201).json(newIngredient); // Informování o úspěchu[cite: 1]
});

// 3. Endpoint pro recepty, který jsi testoval na fotce[cite: 1]
app.get('/recipe/list', (req, res) => {
    res.json([]); // Prozatím prázdný seznam receptů
});

app.listen(port, () => {
    console.log(`Server Artur Rodik běží na http://localhost:${port}`);
});