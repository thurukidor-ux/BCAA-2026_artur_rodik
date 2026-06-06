import { useEffect, useState } from 'react';
import axios from 'axios';
import './InventoryList.css';

function InventoryList() {
    const [ingredients, setIngredients] = useState([]);

    const loadIngredients = () => {
        axios.get('http://localhost:3000/ingredient/list')
            .then(res => setIngredients(res.data))
            .catch(err => console.error("Chyba načítání skladu:", err));
    };

    const handleCreateIngredient = () => {
        const name = prompt("Zadejte název nové suroviny:");
        if (name && name.length >= 3) {
            axios.post('http://localhost:3000/ingredient/create', {
                name: name,
                quantityInStock: 0
            })
                .then(() => loadIngredients())
                .catch(err => alert("Chyba: " + err.response?.data?.message));
        } else {
            alert("Název musí mít alespoň 3 znaky.");
        }
    };




    useEffect(() => { loadIngredients(); }, []);

    const handleStockChange = (id, operation) => {
        const userInput = prompt(`Zadejte množství k ${operation === 'add' ? 'přidání' : 'ubrání'}:`);


        const amount = Number(userInput);


        if (!isNaN(amount) && amount > 0) {
            const finalAmount = operation === 'add' ? amount : -amount;

            axios.post('http://localhost:3000/ingredient/updateStock', { id, amount: finalAmount })
                .then(() => loadIngredients())
                .catch(err => {

                    const errorMessage = err.response?.data?.message || "Došlo k chybě";
                    alert("Chyba: " + errorMessage);
                });
        } else {
            alert("Zadejte prosím platné kladné číslo.");
        }
    };

    return (


        <div className="inventory-container">
            <div className="inventory-header">
                <h2>Skladové zásoby</h2>
                <button onClick={handleCreateIngredient}>+ Přidat novou surovinu</button>
            </div>
            <h2>Skladové zásoby</h2>
            <table>
                <thead>
                    <tr>
                        <th>Surovina</th>
                        <th>Množství</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map(ing => (
                        <tr key={ing.id}>
                            <td>{ing.name}</td>
                            <td>{ing.quantityInStock || 0}</td>
                            <td>
                                <button onClick={() => handleStockChange(ing.id, 'add')}>+</button>
                                <button onClick={() => handleStockChange(ing.id, 'subtract')}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}



export default InventoryList;