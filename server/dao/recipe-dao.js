const fs = require("fs");
const path = require("path");

const storagePath = path.resolve(__dirname, "..", "storage", "recipes");

if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

function create(recipe) {
    try {
        const filePath = path.join(storagePath, `${recipe.id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(recipe, null, 2), "utf8");
        return recipe;
    } catch (error) {
        throw { code: "failedToCreateRecipe", message: error.message };
    }
}

function get(id) {
    try {
        const filePath = path.join(storagePath, `${id}.json`);
        if (!fs.existsSync(filePath)) return null;
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
        throw { code: "failedToGetRecipe", message: error.message };
    }
}

function list() {
    try {
        const files = fs.readdirSync(storagePath);
        return files.map(file => JSON.parse(fs.readFileSync(path.join(storagePath, file), "utf8")));
    } catch (error) {
        return [];
    }
}



module.exports = { create, get, list };