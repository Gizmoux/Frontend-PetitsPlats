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
			console.log("J'ai cliquer sur le chevron down");
		});
		chevronIconUp.addEventListener('click', () => {
			chevronIconUp.style.display = 'none';
			chevronIcon.style.display = 'inline-block';
			dropdownContent.classList.toggle('show-options');
			console.log("J'ai cliquer sur le chevron up");
		});
	});
};
dropdown();
// INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS INGREDIENTS
let tabIngredient = [];
let tabAppliance = [];
let tabUstensils = [];

const menuItemIngredients = document.querySelector('.menu-item-ingredients');
const menuItemAppliance = document.querySelector('.menu-item-appliance');
const menuItemUstensils = document.querySelector('.menu-item-ustensils');

// Fonction réutilisable sur les autres filtres
const updateFilter = (inputElement, targetElement, ingredients) => {
	inputElement.addEventListener('input', event => {
		let value = event.target.value.toLowerCase();
		let filteredIngredients = ingredients.filter(ingredient => {
			return ingredient.toLowerCase().includes(value);
		});
		// console.log('filteredIngredients', filteredIngredients);

		targetElement.innerHTML = '';
		filteredIngredients.forEach(ingredient => {
			const menuIngredientLi = document.createElement('li');
			menuIngredientLi.classList.add('menuIngredientLi');
			menuIngredientLi.textContent = ingredient;
			targetElement.appendChild(menuIngredientLi);

			menuIngredientLi.addEventListener('click', event => {
				const spanList = document.querySelector('.spanList');
				spanList.appendChild(menuIngredientLi);
				// let clickFilter = menuIngredientLi.filter()
				// Il faut que menuIngredientLi doit inclu dans
				console.log('je clique sur une liste Résultat');
			});
		});
		// console.log('value', value);
	});
};

// Pour les ingrédients
recipes.forEach(recipe => {
	recipe.ingredients.forEach(ingredient => {
		const menuIngredientLi = document.createElement('li');
		menuIngredientLi.classList.add('menuIngredientLi');
		menuIngredientLi.textContent = `${ingredient.ingredient}`;
		menuItemIngredients.appendChild(menuIngredientLi);
		// console.log('menuIngredientLi', menuIngredientLi);

		// console.log('menuItemAppliance', menuItemAppliance);
		// console.log('menuIngredientLi.innerHTML', menuIngredientLi);
		tabIngredient.push(menuIngredientLi.textContent); // Stocker les noms des ingrédients ds le tabIngredient
	});
});
const inputIngredient = document.querySelector('.inputIngredient');
updateFilter(inputIngredient, menuItemIngredients, tabIngredient);

// APPLIANCE APPLIANCE APPLIANCE APPLIANCE APPLIANCE APPLIANCE APPLIANCE APPLIANCE
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

// USTENSILS USTENSILS USTENSILS USTENSILS USTENSILS USTENSILS USTENSILS USTENSILS
const inputUstensils = document.querySelector('.inputUstensils');
recipes.forEach(recipe => {
	const menuUstensilsLi = document.createElement('li');
	menuUstensilsLi.classList.add('menuUstensilsLi');
	menuUstensilsLi.textContent = `${recipe.ustensils}`;
	menuItemUstensils.appendChild(menuUstensilsLi);
	tabUstensils.push(menuUstensilsLi.textContent);
});
updateFilter(inputUstensils, menuItemUstensils, tabUstensils);

const cardMenu = document.querySelector('.card-menu');
// Fonction pour afficher une recette
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

	recipe.ingredients.forEach(ingredient => {
		const ingredientName = document.createElement('p');
		const ingredientQuantityUnit = document.createElement('p');
		ingredientName.textContent = `${ingredient.ingredient}`;
		ingredientQuantityUnit.textContent = `${ingredient.quantity} ${ingredient.unit}`;
		recipeCard.appendChild(ingredientName);
		recipeCard.appendChild(ingredientQuantityUnit);
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
