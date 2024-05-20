import recipes from './assets/data/recipes.js';
import { displayRecipe } from './displayRecipe.js';
import { tagListUpdated } from './index.js';

const nbrecipes = document.getElementById('total-recipes');
const cardMenu = document.querySelector('.card-menu');

let value = '';

function updateFilteredRecipes() {
	let filteredRecipes = recipes.filter(recipe => {
		return tagListUpdated.every(selectedElement => {
			let isIngredientMatch = recipe.ingredients.some(
				item => item.ingredient.toLowerCase() === selectedElement.toLowerCase()
			);
			// Vérifier si l'élément sélectionné correspond à l'appareil de la recette / ustensile
			let isApplianceMatch =
				recipe.appliance.toLowerCase() === selectedElement.toLowerCase();

			let isUstensilMatch = recipe.ustensils.some(ustensil =>
				ustensil.toLowerCase().includes(selectedElement.toLowerCase())
			);

			// Retourner vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette

			return isIngredientMatch || isApplianceMatch || isUstensilMatch;
		});
	});
	// Afficher les recettes filtrées
	cardMenu.innerHTML = '';
	if (filteredRecipes.length > 1) {
		filteredRecipes.forEach(recipe => {
			displayRecipe(recipe);
			nbrecipes.textContent = `${filteredRecipes.length} recettes`;
		});
	} else if (filteredRecipes.length === 1) {
		filteredRecipes.forEach(recipe => {
			nbrecipes.textContent = `${filteredRecipes.length} recette`;
			displayRecipe(recipe);
		});
	} else {
		nbrecipes.textContent = `0 recette`;
		cardMenu.innerHTML = `Aucune recette ne contient ces articles. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
	}
}
export { updateFilteredRecipes };
