import { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';
import InventoryList from './InventoryList';
import RecipeList from './RecipeList';
import './App.css';

function App() {

  const [activeView, setActiveView] = useState('recipes');

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h3>Kitchen Manager</h3>
        <nav>
          {/* */}
          <button onClick={() => setActiveView('recipes')}>Menu (Recepty)</button>
          <button onClick={() => setActiveView('inventory')}>Sklad (Suroviny)</button>
          <button onClick={() => setActiveView('stats')}>Statistiky</button>
        </nav>
      </aside>

      <main className="dashboard">
        <header className="header">
          <h1>{activeView === 'recipes' ? 'Menu restaurace' : 'Skladové zásoby'}</h1>
        </header>

        <section className="recipe-grid">
          {/* */}
          {activeView === 'recipes' && <p>Tady bude seznam receptů...</p>}
          {activeView === 'inventory' && <InventoryList />}
          {activeView === 'stats' && <p>Tady budou statistiky...</p>}
          {activeView === 'recipes' && <RecipeList />}
        </section>
      </main>
    </div>
  );
}


export default App;