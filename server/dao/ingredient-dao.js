const fs = require("fs");
const path = require("path");

const storagePath = path.resolve(__dirname, "..", "storage", "ingredients");

console.log("DAO: Inicializace. Data se ukládají do:", storagePath);

if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

function create(ingredient) {
  try {
    const filePath = path.join(storagePath, `${ingredient.id}.json`);
    console.log("DAO: Zapisuji soubor:", filePath);

    const fileData = JSON.stringify(ingredient, null, 2);
    fs.writeFileSync(filePath, fileData, "utf8");
    return ingredient;
  } catch (error) {
    console.error("DAO ERROR (create):", error);
    throw { code: "failedToCreateIngredient", message: error.message };
  }
}

function get(id) {
  try {
    const filePath = path.join(storagePath, `${id}.json`);
    if (!fs.existsSync(filePath)) return null;

    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("DAO ERROR (get):", error);
    throw { code: "failedToGetIngredient", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(storagePath);
    return files.map((file) => {
      const data = fs.readFileSync(path.join(storagePath, file), "utf8");
      return JSON.parse(data);
    });
  } catch (error) {
    console.error("DAO ERROR (list):", error);
    return [];
  }
}

module.exports = { create, get, list };