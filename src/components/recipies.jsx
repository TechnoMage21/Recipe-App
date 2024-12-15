import React from 'react';
import PropTypes from 'prop-types'; // For prop validation

export default function Recipes({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found. Please try a different search.</p>;
  }

  return (
    <div className="recipe-list">
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index} className="recipe-card">
            <h2>{recipe.recipe.label}</h2>
            <p><b>Calories:</b> {Math.round(recipe.recipe.calories)}</p>

            <h3>Ingredients:</h3>
            <ul>
              {recipe.recipe.ingredientLines.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>

            <a
              href={recipe.recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="recipe-link"
            >
              View Recipe
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Prop validation for 'recipes'
Recipes.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      recipe: PropTypes.shape({
        label: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        ingredientLines: PropTypes.arrayOf(PropTypes.string).isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
