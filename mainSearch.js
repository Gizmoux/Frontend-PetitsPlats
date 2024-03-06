import recipes from './assets/data/recipes.js';
import {
	handleIngredientClick,
	handleClickAppliance,
	handleClickUstensil,
	updateFilteredRecipes,
} from './index.js';
import { displayRecipe } from './displayRecipe.js';
const searchBar = document.querySelector('.search-bar');
const emptyInput = document.querySelector('.fa-xmark');
const cardMenu = document.querySelector('.card-menu');
const nbrecipes = document.getElementById('total-recipes');
const menuItemIngredients = document.querySelector('.menu-item-ingredients');
const menuItemAppliance = document.querySelector('.menu-item-appliance');
const menuItemUstensils = document.querySelector('.menu-item-ustensils');

let value = '';
const mainSearch = () => {
	searchBar.addEventListener('input', event => {
		value = event.target.value.trim().toLowerCase();
		if (value.length > 3) {
			emptyInput.style.display = 'block';

			// Je vais filtrer les recettes selon la saisie du User
			let filteredRecipes = recipes.filter(recipe => {
				// On vérifie si la saisie correspond à un nom de recette
				let isRecipeName = recipe.name.toLowerCase().trim().includes(value);
				// On vérifie si la saisie correspond à un ingrédient
				let isRecipeIngredient = recipe.ingredients.some(ingredient =>
					ingredient.ingredient.toLowerCase().trim().includes(value)
				);
				// On vérifie si la saisie correspond à un mot de description
				let isRecipeDescription = recipe.description
					.toLowerCase()
					.trim()
					.includes(value);
				// Retourner true si une des conditions matchent

				return isRecipeName || isRecipeIngredient || isRecipeDescription;
			});
			const filteredIngredients = filteredRecipes.reduce((acc, recipe) => {
				return [
					...acc,
					...recipe.ingredients.map(ingredient => ingredient.ingredient),
				];
			}, []);

			const uniqueIngredients = [...new Set(filteredIngredients)];
			displayFilteredItems(uniqueIngredients, menuItemIngredients);

			// Filtrer et afficher les appareils correspondants
			const filteredAppliance = filteredRecipes.map(recipe => recipe.appliance);
			const uniqueAppliance = [...new Set(filteredAppliance)];

			displayFilteredItems(uniqueAppliance, menuItemAppliance);

			// Filtrer et afficher les ustensiles correspondants
			const filteredUstensils = filteredRecipes.reduce((acc, recipe) => {
				return [...acc, ...recipe.ustensils];
			}, []);
			const uniqueUstensils = [...new Set(filteredUstensils)];
			displayFilteredItems(uniqueUstensils, menuItemUstensils);

			// Afficher les recettes correspondantes
			cardMenu.innerHTML = '';

			if (filteredRecipes.length > 1) {
				filteredRecipes.forEach(recipe => {
					nbrecipes.textContent = `${filteredRecipes.length} recettes`;
					displayRecipe(recipe);
					console.log('filteredRecipes', filteredRecipes);
				});
			} else if (filteredRecipes.length === 1) {
				nbrecipes.textContent = `1 recette`;
				filteredRecipes.forEach(recipe => {
					nbrecipes.textContent = `${filteredRecipes.length} recette`;
					displayRecipe(recipe);
					console.log('filteredRecipes', filteredRecipes);
					// j'affiche le nombre de recettes, enlever le "s" pour 0 et 1 recette
				});
			} else {
				nbrecipes.textContent = `0 recette`;
				cardMenu.innerHTML = `Aucune recette ne contient ${value}. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
			}
		} else if (value.length === 0) {
			cardMenu.innerHTML = '';
			emptyInput.style.display = 'none';

			recipes.forEach(recipe => {
				nbrecipes.textContent = `${recipes.length} recettes`;
				displayRecipe(recipe);
			});
		}
	});
	function displayFilteredItems(filteredItems, listContainer) {
		listContainer.innerHTML = '';
		filteredItems.forEach(item => {
			let filteredListItem = document.createElement('li');
			filteredListItem.textContent = item;
			listContainer.appendChild(filteredListItem);
			filteredListItem.addEventListener('click', handleIngredientClick);
			filteredListItem.addEventListener('click', handleClickAppliance);
			filteredListItem.addEventListener('click', handleClickUstensil);
		});
	}
	function emptyInputClick() {
		emptyInput.addEventListener('click', () => {
			let textInput = document.querySelector('.search-bar');
			textInput.value = '';
			emptyInput.style.display = 'none';

			updateFilteredRecipes();
		});
	}
	emptyInputClick();
};
export { mainSearch };
