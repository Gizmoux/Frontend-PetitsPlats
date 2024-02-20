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

const searchBar = document.querySelector('.search-bar');
const nbrecipes = document.getElementById('total-recipes');

searchBar.addEventListener('input', event => {
	let value = event.target.value.trim().toLowerCase();

	if (value.length > 3) {
		// Je vais filtrer les recettes selon la saisie du User
		let filteredRecipes = recipes.filter(recipe => {
			// On vérifie si la saisie correspond à un nom de recette
			let isRecipeName = recipe.name.toLowerCase().includes(value);

			// On vérifie si la saisie correspond à un ingrédient
			let isRecipeIngredient = recipe.ingredients.some(ingredient =>
				ingredient.ingredient.toLowerCase().includes(value)
			);
			// On vérifie si la saisie correspond à un mot de description
			let isRecipeDescription = recipe.description
				.toLowerCase()
				.includes(value);
			// Retourner true si une des conditions match
			return isRecipeName || isRecipeIngredient || isRecipeDescription;
		});
		cardMenu.innerHTML = '';
		// j'affiche le nombre de recettes, enelever le "s" pour 0 et 1 recette
		nbrecipes.textContent = `${filteredRecipes.length} recettes`;
		// Afficher les recettes correspondantes
		if (filteredRecipes.length > 0) {
			filteredRecipes.forEach(recipe => {
				displayRecipe(recipe);
				console.log('filteredRecipes.length', filteredRecipes.length);
			});
		} else {
			cardMenu.innerHTML = `Aucune recette ne contient ${value}. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
		}
	} else if (value.length === 0) {
		cardMenu.innerHTML = '';
		recipes.forEach(recipe => {
			displayRecipe(recipe);
		});
	}
});

// Fonction updateFilter
// Filtre les recettes selon la recherche du user

let tabIngredient = [];
let tabAppliance = [];
let tabUstensils = [];

const menuItemIngredients = document.querySelector('.menu-item-ingredients');
const menuItemAppliance = document.querySelector('.menu-item-appliance');
const menuItemUstensils = document.querySelector('.menu-item-ustensils');

// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
let menuIngredientLi;
const updateFilterIngredient = () => {
	// ma liste d'ingrédients
	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredient => {
			menuIngredientLi = document.createElement('li');
			menuIngredientLi.classList.add('menuIngredientLi');
			menuIngredientLi.textContent = `${ingredient.ingredient}`;
			menuItemIngredients.appendChild(menuIngredientLi);
			tabIngredient.push(menuIngredientLi.textContent);
			// console.log('menuIngredientLi.textContent', menuIngredientLi.textContent);
		});
	});
	// je tape le nom d'un ingrédient que je recherche puis ça filtre en fonction de ma liste et ensuite je clique
	const inputIngredient = document.querySelector('.inputIngredient');
	inputIngredient.addEventListener('input', event => {
		let value = event.target.value.trim();

		let inputFilterIngredient = tabIngredient.filter(item => {
			return item.toLowerCase().includes(value);
			// Ligne pour effacer ma liste et ensuite la mettre à jour
		});
		menuItemIngredients.innerHTML = '';

		console.log(event.target.value);
		inputFilterIngredient.forEach(item => {
			let filteredListIngredients = document.createElement('li');

			filteredListIngredients.textContent = item;
			menuItemIngredients.appendChild(filteredListIngredients);

			filteredListIngredients.addEventListener('click', event => {
				//click sur mon element de liste puis maj des cartes
				let selectedIngredient = event.target.textContent;

				let filteredRecipes = recipes.filter(recipe => {
					return recipe.ingredients.some(
						item =>
							item.ingredient.toLowerCase() ===
							selectedIngredient.toLocaleLowerCase()
					);
				});
				cardMenu.innerHTML = '';

				filteredRecipes.forEach(recipe => {
					displayRecipe(recipe);
				});
			});
		});

		console.log('event.target.value', value);
		console.log('inputFilterIngredient', inputFilterIngredient);

		// console.log('inputFilterIngredient', inputFilterIngredient);
	});
};
updateFilterIngredient();

// // BOUTONS APPAREILS / LISTE DES APPAREILS
const updateFilterAppliance = () => {
	const inputAppliance = document.querySelector('.inputAppliance');
	recipes.forEach(recipe => {
		const menuApplianceLi = document.createElement('li');
		menuApplianceLi.classList.add('menuApplianceLi');
		menuApplianceLi.textContent = `${recipe.appliance}`;
		menuItemAppliance.appendChild(menuApplianceLi);
		tabAppliance.push(menuApplianceLi.textContent);
	});

	inputAppliance.addEventListener('input', event => {
		let value = event.target.value.trim();

		let inputFilterAppliance = tabAppliance.filter(item => {
			return item.toLowerCase().includes(value);
			// Ligne pour effacer ma liste et ensuite la mettre à jour
		});
		menuItemAppliance.innerHTML = '';

		console.log(event.target.value);
		inputFilterAppliance.forEach(item => {
			let filteredListAppliance = document.createElement('li');
			// const menuAppliance = document.querySelector('.menuApplianceLi');
			filteredListAppliance.textContent = item;
			menuItemAppliance.appendChild(filteredListAppliance);

			filteredListAppliance.addEventListener('click', event => {
				//click sur mon element de liste puis maj des cartes
				let selectedAppliance = event.target.textContent;

				let filteredRecipes = recipes.filter(
					element =>
						element.appliance.toLocaleLowerCase() ===
						selectedAppliance.toLocaleLowerCase()
				);
				cardMenu.innerHTML = '';

				filteredRecipes.forEach(recipe => {
					displayRecipe(recipe);
				});
			});
		});

		// console.log('event.target.value', value);
		// console.log('inputFilterAppliance', inputFilterAppliance);

		// console.log('inputFilterAppliance', inputFilterAppliance);
	});
};
updateFilterAppliance();
// BOUTONS USTENSILS / LISTE DES USTENSILS
const updateFilterUstensils = () => {
	const inputUstensils = document.querySelector('.inputUstensils');
	recipes.forEach(recipe => {
		recipe.ustensils.forEach(ustensil => {
			const menuUstensilsLi = document.createElement('li');
			menuUstensilsLi.classList.add('menuUstensilsLi');
			menuUstensilsLi.textContent = `${ustensil}`;
			menuItemUstensils.appendChild(menuUstensilsLi);
			tabUstensils.push(menuUstensilsLi.textContent);
		});
		// console.log('recipe.ustensils', recipe.ustensils);
	});
	inputUstensils.addEventListener('input', event => {
		let value = event.target.value.trim();
		let inputFilterUstensils = tabUstensils.filter(item => {
			return item.toLowerCase().includes(value);
			// Ligne pour effacer ma liste et ensuite la mettre à jour
		});
		menuItemUstensils.innerHTML = '';

		// console.log(event.target.value);
		inputFilterUstensils.forEach(item => {
			let filteredListUstensils = document.createElement('li');
			// const menuUstensils = document.querySelector('.menuUstensilsLi');
			filteredListUstensils.textContent = item;
			menuItemUstensils.appendChild(filteredListUstensils);

			filteredListUstensils.addEventListener('click', event => {
				//click sur mon element de liste puis maj des cartes
				let selectedUstensils = event.target.textContent;

				let filteredRecipes = recipes.filter(recipe => {
					return recipe.ustensils.some(
						ustensil =>
							ustensil.toLocaleLowerCase() ===
							selectedUstensils.toLocaleLowerCase()
					);
				});

				console.log('selectedUstensils', selectedUstensils);
				console.log('filteredRecipes', filteredRecipes);
				cardMenu.innerHTML = '';

				filteredRecipes.forEach(recipe => {
					displayRecipe(recipe);
				});
			});
		});
	});
};
updateFilterUstensils();
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

// Fonction réutilisable sur les autres filtres
// const updateFilter = (inputElement, targetElement, tabElement) => {
// 	inputElement.addEventListener('input', event => {
// 		let value = event.target.value.toLowerCase();
// 		let filteredElement = tabElement.filter(element => {
// 			let elementIncludesValue = element.toLowerCase().includes(value);
// 			return elementIncludesValue;
// 		});
// 		// console.log('filteredElement', filteredElement);

// 		targetElement.innerHTML = '';
// 		filteredElement.forEach(element => {
// 			const menuElementLi = document.createElement('li');
// 			menuElementLi.classList.add('menuElementLi');
// 			menuElementLi.textContent = element;
// 			targetElement.appendChild(menuElementLi);

// 			menuElementLi.addEventListener('click', event => {
// 				const spanList = document.querySelector('.spanList');
// 				// const containerTag = document.querySelector('.container-tag');
// 				const closeTag = document.createElement('img');
// 				closeTag.setAttribute('src', './assets/images/Vector.png');
// 				spanList.appendChild(menuElementLi);
// 				menuElementLi.appendChild(closeTag);
// 				// containerTag.appendChild(closeTag);
// 				const elementClicked = event.target.textContent;
// 				// FILTRER RECETTE POUR LES INGREDIENTS
// 				filteredRecipesForIngredient(elementClicked);
// 			});
// 		});

// 		// console.log('value', value);
// 	});
// };

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

// const filteredRecipesForAppliance = elementClicked => {
// 	let filteredRecipesAppliance = recipes.filter(
// 		item => item.appliance === elementClicked
// 	);

// 	// console.log('filteredRecipesAppliance', filteredRecipesAppliance);
// 	cardMenu.innerHTML = '';
// 	filteredRecipesAppliance.forEach(recipe => {
// 		displayRecipe(recipe);
// 	});
// };
// const filteredRecipesForIngredient = elementClicked => {
// 	let filteredRecipes = recipes.filter(recipe => {
// 		return recipe.ingredients.some(item => item.ingredient === elementClicked);
// 	});
// 	cardMenu.innerHTML = '';

// 	filteredRecipes.forEach(recipe => {
// 		displayRecipe(recipe);
// 	});
// };
