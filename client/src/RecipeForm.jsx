import { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeForm({ onRecipeCreated }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([{ ingredientId: '', amount: '' }]);


    useEffect(() => {
        axios.get('http://localhost:3000/ingredient/list')
            .then(res => setIngredients(res.data))
            .catch(err => console.error("Suroviny se nepodařilo načíst", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRecipe = { name, description, instruction: "Vařte s láskou", ingredientsList: recipeIngredients };
        try {
            await axios.post('http://localhost:3000/recipe/create', newRecipe);
            alert("Recept uložen!");
            onRecipeCreated();
        } catch (err) { alert("Chyba: " + err.response?.data?.message); }
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <h3>Nový recept</h3>
            <input placeholder="Název jídla" value={name} onChange={e => setName(e.target.value)} required />
            <textarea placeholder="Popis" value={description} onChange={e => setDescription(e.target.value)} />

            <h4>Suroviny:</h4>
            {recipeIngredients.map((item, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <select
                        onChange={e => {
                            const newList = [...recipeIngredients];
                            newList[index].ingredientId = e.target.value;
                            setRecipeIngredients(newList);
                        }}
                        required
                    >
                        <option value="">Vyberte surovinu...</option>
                        {ingredients.map(ing => (
                            <option key={ing.id} value={ing.id}>{ing.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Množství"
                        onChange={e => {
                            const newList = [...recipeIngredients];
                            newList[index].amount = parseInt(e.target.value);
                            setRecipeIngredients(newList);
                        }}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={() => setRecipeIngredients([...recipeIngredients, { ingredientId: '', amount: '' }])}>
                + Další surovina
            </button>
            <button type="submit">Uložit recept</button>
        </form>
    );
}
export default RecipeForm;