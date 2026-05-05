const fs = require("fs");
const path = require("path");
const storagePath = path.join(__dirname, "..", "storage", "ingredients");
console.log("Cílová složka pro ukládání:", storagePath);
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

function create(ingredient) {
  try {
    const filePath = path.join(storagePath, `${ingredient.id}.json`);
    console.log("Zapisuji do:", filePath);
    const fileData = JSON.stringify(ingredient);
    fs.writeFileSync(filePath, fileData, "utf8");
    return ingredient;
  } catch (error) {
    throw { code: "failedToCreateIngredient", message: error.message };
  }
}

function get(id) {
  try {
    const filePath = path.join(storagePath, `${id}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToGetIngredient", message: error.message };
  }
}

function list() {
  const files = fs.readdirSync(storagePath);
  return files.map((file) => {
    const data = fs.readFileSync(path.join(storagePath, file), "utf8");
    return JSON.parse(data);
  });
}

module.exports = {
  create,
  get,
  list
};

