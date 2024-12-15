import React, { useState, useEffect } from "react";
import '../css/recipe.css';

export default function RecipeFinder() {
  const [search, setSearch] = useState(""); 
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const API_ID = "33ee4876"; 
 const API_KEY = "bfee531bd0ae46359547d9a7bc610725"; 


  // Handle search input change
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // Fetch recipes from API
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&to=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes.");
      }
      const data = await response.json();
      setRecipe(data.hits);
    } catch (error) {
      setError("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes when search changes (debounce to prevent too many requests)
  useEffect(() => {
    if (search.length > 2) {
      const timer = setTimeout(() => {
        fetchRecipes(search);
      }, 500); // 500ms debounce

      return () => clearTimeout(timer); // Clear the timeout if search changes before the timer expires
    } else {
      setRecipe([]); // Reset recipes if search is too short or empty
    }
  }, [search]); // This ensures the effect runs only when 'search' changes

  return (
    <div className="body">
      <div className="input-text">
        <h1>Find Your Recipe</h1>
        <input
          type="text"
          name="search"
          id="search-input"
          placeholder="Search by ingredient"
          value={search}
          onChange={handleChange}
        />
      </div>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="error">{error}</p>}

      {recipe.length > 0 && (
        <div className="recipe">
          <ul>
            {recipe.map((item, index) => (
              <div className="card" key={index}>
                <li>
                  <h2>{item.recipe.label}</h2>
                  <p><b>Calories:</b> {Math.round(item.recipe.calories)}</p>
                  <p><b>Ingredients</b></p>
                  <ul>
                    {item.recipe.ingredientLines.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                  <a
                    href={item.recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </a>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}

      {recipe.length === 0 && !loading && !error && (
        <p>No recipes found.</p>
      )}
    </div>
  );
}
