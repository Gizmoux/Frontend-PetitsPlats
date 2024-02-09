import recipes from './assets/data/recipes.js';

function dropdown() {
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
}
dropdown();
const inputIngredient = document.querySelector('.inputIngredient');
const menuItemIngredients = document.querySelector('.menu-item-ingredients');
let originalIngredients = []; // Tableau pour stocker les ingrédients d'origine

// Fonction pour afficher tous les ingrédients
function displayAllIngredients() {
	menuItemIngredients.innerHTML = ''; // Effacer la liste des ingrédients actuelle
	originalIngredients.forEach(ingredient => {
		const menuIngredientLi = document.createElement('li');
		menuIngredientLi.textContent = ingredient;
		menuItemIngredients.appendChild(menuIngredientLi);
	});
}

// Ecouteur d'événement change sur l'input
inputIngredient.addEventListener('input', event => {
	const value = event.target.value.trim().toLowerCase(); // Normaliser et mettre en minuscules la valeur entrée
	menuItemIngredients.innerHTML = ''; // Effacer la liste des ingrédients actuelle

	if (value === '') {
		displayAllIngredients(); // Si la recherche est vide, afficher tous les ingrédients
	} else {
		originalIngredients.forEach(ingredient => {
			const ingredientLowerCase = ingredient.toLowerCase();
			if (ingredientLowerCase.includes(value)) {
				const menuIngredientLi = document.createElement('li');
				menuIngredientLi.textContent = ingredient;
				menuItemIngredients.appendChild(menuIngredientLi);
			}
		});
	}
});

// Remplir le tableau originalIngredients
recipes.forEach(recipe => {
	recipe.ingredients.forEach(ingredient => {
		originalIngredients.push(ingredient.ingredient);
	});
});

// Afficher tous les ingrédients initialement
displayAllIngredients();

// const inputIngredient = document.querySelector('.inputIngredient');
// inputIngredient.addEventListener('change', event => {
// 	const value = event.target.value.toLowerCase();
// 	for (let i = 0; i < tabIngredient.length - 1; i++) {
// 		const ingredient = tabIngredient[i].toLowerCase();
// 		let newTab = [];
// 		if (ingredient.includes(value)) {
// 			newTab = newTab.push(value);
// 		}

// 	}
// 	console.log('value', value);
// });
// let tabIngredient = [];
// recipes.forEach(recipe => {
// 	recipe.ingredients.forEach(ingredient => {
// 		const menuItemIngredients = document.querySelector(
// 			'.menu-item-ingredients'
// 		);
// 		const menuIngredientLi = document.createElement('li');
// 		menuIngredientLi.classList.add('menuIngredientLi');
// 		menuItemIngredients.appendChild(menuIngredientLi);
// 		menuIngredientLi.textContent = `${ingredient.ingredient}`;
// 		menuItemIngredients.appendChild(menuIngredientLi);
// 		tabIngredient.push(menuIngredientLi.innerHTML);
// 	});
// });
// console.log('tabIngredient', tabIngredient);

recipes.forEach(recipe => {
	const menuItemAppliance = document.querySelector('.menu-item-appliance');
	const menuApplianceLi = document.createElement('li');
	menuApplianceLi.classList.add('menuApplianceLi');
	menuApplianceLi.textContent = `${recipe.appliance}`;
	menuItemAppliance.appendChild(menuApplianceLi);

	// console.log('recipe.appliance', recipe.appliance);
});
recipes.forEach(recipe => {
	const menuItemUstensils = document.querySelector('.menu-item-ustensils');
	const menuUstensilsLi = document.createElement('li');
	menuUstensilsLi.classList.add('menuustensilsLi');
	menuUstensilsLi.textContent = `${recipe.ustensils}`;
	menuItemUstensils.appendChild(menuUstensilsLi);

	// console.log('recipe.ustensils', recipe.ustensils);
});
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
