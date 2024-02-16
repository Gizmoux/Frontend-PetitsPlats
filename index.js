import recipes from './assets/data/recipes.js';

const dropdown = () => {
	const buttonFilters = document.querySelectorAll('.button-filter');

	buttonFilters.forEach(button => {
		const chevronIcon = button.querySelector('.fas.fa-chevron-down');
		const chevronIconUp = button.querySelector('.fas.fa-chevron-up');
		const dropdownContent = button.nextElementSibling;

		chevronIcon.addEventListener('click', () => {
			chevronIconUp.style.display = 'inline-block';
			chevronIcon.style.display = 'none';
			dropdownContent.classList.toggle('show-options');
			// console.log("J'ai cliqué sur le chevron down");
		});
		chevronIconUp.addEventListener('click', () => {
			chevronIconUp.style.display = 'none';
			chevronIcon.style.display = 'inline-block';
			dropdownContent.classList.toggle('show-options');
			// console.log("J'ai cliqué sur le chevron up");
		});
	});
};
dropdown();

// RECHERCHE PRINCIPALE
//Mon input doit être égale au titre,à un ingrédient ou à un mot de la description de la recette

const searchBar = () => {
	const searchBar = document.querySelector('.search-bar');

	searchBar.addEventListener('input', event => {
		let value = event.target.value.toLowerCase();
		let titleRecipes = recipes.map(recipe => recipe.name);
		console.log('titleRecipes', titleRecipes);

		if (value.length >= 3) {
			let titleRecipesFiltered = titleRecipes.filter(item => {
				return item.toLowerCase().includes(value);
			});
			cardMenu.innerHTML = '';

			if (titleRecipesFiltered.length > 0) {
				titleRecipesFiltered.forEach(recipeName => {
					let recipe = recipes.find(recipe => recipe.name === recipeName);
					displayRecipe(recipe);
				});
			} else {
				cardMenu.innerHTML = `Aucune recette ne contient ${value} vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
			}
			console.log('titleRecipesFiltered', titleRecipesFiltered);
		}
		// let tabIngredientsRecipe = [];
		// let ingredientsRecipes = recipes.forEach(recipe => {
		// 	recipe.ingredients.forEach(element => {
		// 		tabIngredientsRecipe.push(element.ingredient);
		// 	});
		// });
		// if (value.length > 3) {
		// 	let filterRecipesIngredients = tabIngredientsRecipe.filter(item => {
		// 		return item.toLowerCase().includes(value);
		// 	});
		// 	cardMenu.innerHTML = '';
		// 	if (filterRecipesIngredients.length > 0) {
		// 		filterRecipesIngredients.forEach(recipeIngredient => {
		// 			let recipe = recipes.find(
		// 				recipe => recipe.ingredients === recipeIngredient
		// 			);
		// 		});
		// 	} else {
		// 		cardMenu.innerHTML = `Aucune recette ne contient ${value} vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
		// 	}
		// }
		// console.log('Ingredients', tabIngredientsRecipe);
	});
};
searchBar();

let tabIngredient = [];
let tabAppliance = [];
let tabUstensils = [];

const menuItemIngredients = document.querySelector('.menu-item-ingredients');
const menuItemAppliance = document.querySelector('.menu-item-appliance');
const menuItemUstensils = document.querySelector('.menu-item-ustensils');

// Fonction réutilisable sur les autres filtres
const updateFilter = (inputElement, targetElement, tabElement) => {
	inputElement.addEventListener('input', event => {
		let value = event.target.value.toLowerCase();
		let filteredElement = tabElement.filter(element => {
			let elementIncludesValue = element.toLowerCase().includes(value);
			return elementIncludesValue;
		});
		// console.log('filteredElement', filteredElement);

		targetElement.innerHTML = '';
		filteredElement.forEach(element => {
			const menuElementLi = document.createElement('li');
			menuElementLi.classList.add('menuElementLi');
			menuElementLi.textContent = element;
			targetElement.appendChild(menuElementLi);

			menuElementLi.addEventListener('click', event => {
				const spanList = document.querySelector('.spanList');
				// const containerTag = document.querySelector('.container-tag');
				const closeTag = document.createElement('img');
				closeTag.setAttribute('src', './assets/images/Vector.png');

				spanList.appendChild(menuElementLi);
				menuElementLi.appendChild(closeTag);
				// containerTag.appendChild(closeTag);
				const elementClicked = event.target.textContent;
				// FILTRER RECETTE POUR LES INGREDIENTS
				filteredRecipesForIngredient(elementClicked);
				// // FILTRER RECETTE POUR LES APPAREILS
				// filteredRecipesForAppliance(elementClicked);

				// // // // FILTRER RECETTE POUR LES USTENSILS
				// filteredRecipesForUstensils(elementClicked);
			});
		});

		// console.log('value', value);
	});
};

// const filteredRecipesForUstensils = elementClicked => {
// 	let filteredRecipesUstensils = recipes.filter(recipe => {
// 		//Renvoie tableau des ustensils
// 		return recipe.ustensils.includes(elementClicked);
// 	});
// 	// console.log(filteredRecipesUstensils);
// 	cardMenu.innerHTML = '';
// 	filteredRecipesUstensils.forEach(recipe => {
// 		displayRecipe(recipe);
// 	});
// };

const filteredRecipesForAppliance = elementClicked => {
	let filteredRecipesAppliance = recipes.filter(
		item => item.appliance === elementClicked
	);

	// console.log('filteredRecipesAppliance', filteredRecipesAppliance);
	cardMenu.innerHTML = '';
	filteredRecipesAppliance.forEach(recipe => {
		displayRecipe(recipe);
	});
};
const filteredRecipesForIngredient = elementClicked => {
	let filteredRecipes = recipes.filter(recipe => {
		return recipe.ingredients.some(item => item.ingredient === elementClicked);
	});
	cardMenu.innerHTML = '';

	filteredRecipes.forEach(recipe => {
		displayRecipe(recipe);
	});
};
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
recipes.forEach(recipe => {
	recipe.ingredients.forEach(ingredient => {
		const menuIngredientLi = document.createElement('li');
		menuIngredientLi.classList.add('menuIngredientLi');
		menuIngredientLi.textContent = `${ingredient.ingredient}`;
		menuItemIngredients.appendChild(menuIngredientLi);
		tabIngredient.push(menuIngredientLi.textContent); // Stocker les noms des ingrédients ds le tabIngredient

		// console.log('menuIngredientLi.textContent', menuIngredientLi.textContent);
	});
});
const inputIngredient = document.querySelector('.inputIngredient');
updateFilter(inputIngredient, menuItemIngredients, tabIngredient);

// // BOUTONS APPAREILS / LISTE DES APPAREILS
const inputAppliance = document.querySelector('.inputAppliance');
recipes.forEach(recipe => {
	const menuApplianceLi = document.createElement('li');
	menuApplianceLi.classList.add('menuApplianceLi');
	menuApplianceLi.textContent = `${recipe.appliance}`;
	menuItemAppliance.appendChild(menuApplianceLi);
	tabAppliance.push(menuApplianceLi.textContent);
	// console.log('recipe.appliance', recipe.appliance);
	// console.log('menuItemAppliance', menuItemAppliance);
	// console.log('tabAppliance', tabAppliance);
});
updateFilter(inputAppliance, menuItemAppliance, tabAppliance);

// BOUTONS USTENSILS / LISTE DES USTENSILS

const inputUstensils = document.querySelector('.inputUstensils');
recipes.forEach(recipe => {
	const menuUstensilsLi = document.createElement('li');
	menuUstensilsLi.classList.add('menuUstensilsLi');
	menuUstensilsLi.textContent = `${recipe.ustensils}`;
	menuItemUstensils.appendChild(menuUstensilsLi);
	tabUstensils.push(menuUstensilsLi.textContent);
});
updateFilter(inputUstensils, menuItemUstensils, tabUstensils);

// Fonction pour afficher une recette
const cardMenu = document.querySelector('.card-menu');
function displayRecipe(recipe) {
	// Créer une nouvelle div pour chaque recette

	const recipeCard = document.createElement('div');
	const h2recipe = document.createElement('h2');
	const h3ingredient = document.createElement('h3');
	h3ingredient.classList.add('headline-ingredient');
	h2recipe.classList.add('headline-recipe');
	h2recipe.textContent = 'RECETTE';
	h3ingredient.textContent = 'INGRÉDIENTS';
	recipeCard.classList.add('card-recipe');

	const cardMenuImage = document.createElement('img');
	cardMenuImage.setAttribute('src', `assets/images/${recipe.image}`);
	cardMenuImage.setAttribute('alt', recipe.name);
	cardMenuImage.classList.add('card-menu-image');
	recipeCard.appendChild(cardMenuImage);

	const recipeTime = document.createElement('p');
	recipeTime.classList.add('recipe-time');
	recipeTime.textContent = `${recipe.time}min`;
	recipeCard.appendChild(recipeTime);

	// Mettre à jour le contenu des éléments avec les données de la recette
	const recipeName = document.createElement('h2');
	recipeName.classList.add('recipes-name');
	recipeName.textContent = recipe.name;
	recipeCard.appendChild(recipeName);
	recipeCard.appendChild(h2recipe);

	const recipeDescription = document.createElement('p');
	recipeDescription.classList.add('recipe-description');
	recipeDescription.textContent = recipe.description;
	recipeCard.appendChild(recipeDescription);
	recipeCard.appendChild(h3ingredient);

	// Afficher les ingrédients
	const ingredientContainer = document.createElement('div');
	ingredientContainer.classList.add('ingredient-container');
	recipeCard.appendChild(ingredientContainer);

	recipe.ingredients.forEach(ingredient => {
		const ingredientContent = document.createElement('div');
		ingredientContent.classList.add('ingredient-content');
		recipeCard.appendChild(ingredientContent);
		const ingredientName = document.createElement('p');
		const ingredientQuantityUnit = document.createElement('p');
		ingredientName.textContent = `${ingredient.ingredient}`;
		ingredientQuantityUnit.textContent = `${ingredient.quantity} ${ingredient.unit}`;
		ingredientQuantityUnit.classList.add('ingredient-quantity-unit');
		ingredientContent.appendChild(ingredientName);
		ingredientContent.appendChild(ingredientQuantityUnit);
		ingredientContainer.appendChild(ingredientContent);
	});

	// Ajouter la carte de recette à la carte principale
	cardMenu.appendChild(recipeCard);
}

// Fonction pour récupérer les données
async function fetchData() {
	try {
		recipes.forEach(recipe => {
			displayRecipe(recipe);
		});
	} catch (error) {
		console.error("Une erreur s'est produite :", error.message);
		throw error;
	}
}

// Appeler la fonction fetchData pour récupérer les données
fetchData();
