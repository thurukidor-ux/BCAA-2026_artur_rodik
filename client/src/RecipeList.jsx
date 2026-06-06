import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeForm from './RecipeForm';
import './App.css';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    const loadData = () => {

        axios.get('http://localhost:3000/recipe/list')
            .then(res => setRecipes(res.data))
            .catch(err => console.error("Chyba načítání receptů:", err));


        axios.get('http://localhost:3000/ingredient/list')
            .then(res => setIngredients(res.data))
            .catch(err => console.error("Chyba načítání skladu:", err));
    };

    useEffect(() => { loadData(); }, []);


    const isRecipeAvailable = (recipe) => {
        if (!recipe.ingredientsList || recipe.ingredientsList.length === 0) return true;

        return recipe.ingredientsList.every(req => {
            const stockIng = ingredients.find(ing => ing.id === req.ingredientId);
            return stockIng && stockIng.quantityInStock >= req.amount;
        });
    };

    const handleCook = (id) => {
        axios.post('http://localhost:3000/recipe/cook', { id })
            .then(res => {
                alert(res.data.message);
                loadData();
            })
            .catch(err => alert("Chyba: " + (err.response?.data?.message || "Nelze uvařit")));
    };

    return (
        <div className="recipe-container">
            <h2>Menu restaurace</h2>

            {/*  */}
            <RecipeForm onRecipeCreated={loadData} />

            <div className="recipe-grid">
                {recipes.map(r => {
                    const available = isRecipeAvailable(r);
                    return (
                        <div key={r.id} className={`recipe-card ${!available ? 'disabled' : ''}`}>
                            <h3>{r.name}</h3>
                            <p>{r.description}</p>
                            <button
                                onClick={() => handleCook(r.id)}
                                disabled={!available}
                            >
                                {available ? 'UVAŘIT' : 'NEDOSTATEK SUROVIN'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RecipeList;