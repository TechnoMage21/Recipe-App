import React, {  useState } from "react";
import '../css/recipe.css';

export default function RecipeFinder() {
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] = useState([]);
  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(search);
    setRecipe([]);
  };

  const API_ID = "33ee4876";
  const API_KEY = "bfee531bd0ae46359547d9a7bc610725";
  const fetchApiKey = async (query) => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}&to=10`
      );
      if (!response.ok) {
        throw new Error("Not Fetched");
      } else {
        const data = await response.json();
        return data.hits;
      }
    } catch {
      throw new Error("Error");
    }
  };

  const handleSearch = async () => {
    if (search) {
      try {
        const result = await fetchApiKey(search);
        setRecipe(result);
      } catch {
        console.log("Error");
      }
    }
  };
//   useEffect(() => {
//     console.log(recipe);
//   }, [recipe]);
  return (
    <>
    <div className="body">
    <div className="input-text">
      <h1>Find Your Recipe</h1>
      <input
        type="text"
        name="search"
        id=""
        placeholder="Search BY ingredient"
        value={search}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button>
      </div>
      {Object.keys(recipe).length !== 0 ? (
        <div className="recipe">
        <ul>
          {recipe.map((recipe, index) => (
            <div className="card">
            <li key={index}>
              <h2>{recipe.recipe.label}</h2> 
              <p><b>Calories: </b>{Math.round(recipe.recipe.calories)}</p>{" "}
              <p><b>Ingredients</b></p>
              <ul>
                {recipe.recipe.ingredientLines.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe
              </a>{" "}
            </li>
            </div>
          ))}
        </ul>
      </div>
      ):""}
      
    </div>
    
    </>
  );
}
