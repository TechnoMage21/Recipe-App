import React from 'react'

export default function recipies() {
  return (
    <div>
       <ul>
          {recipe.map((recipe, index) => (
            <li key={index}>
              <h2>{recipe.recipe.label}</h2> 
              <p>Calories: {Math.round(recipe.recipe.calories)}</p>{" "}
            
              <p>Ingredients:</p>
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
              {/* Link to the recipe */}
            </li>
          ))}
        </ul>
    </div>
  )
}
