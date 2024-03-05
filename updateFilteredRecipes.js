import recipes from './assets/data/recipes.js';
import { displayRecipe } from './displayRecipe.js';
import { tagListUpdated } from './index.js';

const nbrecipes = document.getElementById('total-recipes');
const cardMenu = document.querySelector('.card-menu');

let value = '';

function updateFilteredRecipes() {
	// Fonction commune
	let filteredRecipes = recipes.filter(recipe => {
		return tagListUpdated.every(selectedElement => {
			let isIngredientMatch = recipe.ingredients.some(
				item => item.ingredient.toLowerCase() === selectedElement.toLowerCase()
			);
			// Vérifier si l'élément sélectionné correspond à l'appareil de la recette
			let isApplianceMatch =
				recipe.appliance.toLowerCase() === selectedElement.toLowerCase();

			// Vérifier si l'élément sélectionné est présent dans les ustensiles de la recette
			let isUstensilMatch = recipe.ustensils.some(ustensil =>
				ustensil.toLowerCase().includes(selectedElement.toLowerCase())
			);

			// Retourner vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette
			console.log('tagListUpdated1', tagListUpdated);
			console.log('tagListUpdated2', tagListUpdated);
			console.log('tagListUpdated3', tagListUpdated);

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
			// j'affiche le nombre de recettes, enlever le "s" pour 0 et 1 recette
		});
	} else {
		nbrecipes.textContent = `0 recette`;
		cardMenu.innerHTML = `Aucune recette ne contient ces articles. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
	}
}
export { updateFilteredRecipes };
