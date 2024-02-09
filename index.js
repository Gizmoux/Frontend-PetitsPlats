import recipes from './assets/data/recipes.js';
const chevronIcon = document.querySelector('.fas.fa-chevron-down');
const chevronIconUp = document.querySelector('.fas.fa-chevron-up');
const dropdownContent = document.querySelector('.dropdown_content');
function dropdown() {
	const buttonFilters = document.querySelectorAll('.button-filter');
	chevronIcon.addEventListener('click', () => {
		// Toggle la classe pour afficher ou cacher les options
		chevronIconUp.style.display = 'inline-block';
		chevronIcon.style.display = 'none';
		dropdownContent.classList.toggle('show-options');
		console.log("J'ai cliquer sur le chevron");
	});
	chevronIconUp.addEventListener('click', () => {
		// Toggle la classe pour afficher ou cacher les options
		chevronIconUp.style.display = 'none';
		chevronIcon.style.display = 'inline-block';
		dropdownContent.classList.toggle('show-options');
	});
}
dropdown();
function displayFilters() {
	const menuItemIngredients = document.querySelector('.menu-item-ingredients');
	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredient => {
			const menuIngredientLi = document.createElement('li');
			menuIngredientLi.classList.add('menuIngredientLi');
			menuItemIngredients.appendChild(menuIngredientLi);
			menuIngredientLi.textContent = `${ingredient.ingredient} x`;
			menuItemIngredients.appendChild(menuIngredientLi);
			// console.log('menuItemIngredients', ingredient.ingredient);
		});
	});
}
displayFilters();
const menuItemAppliance = document.querySelector('.menu-item-appliance');
recipes.forEach(recipe => {
	const menuApplianceLi = document.createElement('li');
	menuApplianceLi.classList.add('menuApplianceLi');
	menuItemAppliance.appendChild(menuApplianceLi);
	menuItemAppliance.textContent = `${recipe.appliance} x`;

	console.log(recipe.appliance);
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
