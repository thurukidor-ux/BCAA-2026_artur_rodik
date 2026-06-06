function RecipeCard({ recipe, onCook }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px' }}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <button onClick={() => onCook(recipe.id)}>Uvařit recept</button>
        </div>
    );
}
export default RecipeCard;