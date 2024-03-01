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
const menuItemIngredients = document.querySelector('.menu-item-ingredients');
const menuItemAppliance = document.querySelector('.menu-item-appliance');
const menuItemUstensils = document.querySelector('.menu-item-ustensils');
let tabIngredient = [];
let tabAppliance = [];
let tabUstensils = [];
const emptyInput = document.querySelector('.fa-xmark');
let value = '';
searchBar.addEventListener('input', event => {
	value = event.target.value.trim().toLowerCase();

	if (value.length > 3) {
		emptyInput.style.display = 'block';
		//! A compléter
		emptyInput.addEventListener('click', () => {
			let textInput = document.querySelector('.search-bar');
			textInput.value = '';
		});

		//! AVEC BOUCLE FOR
		let filteredRecipes = [];
		for (const recipe of recipes) {
			let isRecipeIngredient = false;
			for (let i = 0; i < recipe.ingredients.length; i++) {
				let ingredient = recipe.ingredients[i].ingredient.toLowerCase().trim();
				if (ingredient.includes(value)) {
					isRecipeIngredient = true;
					break;
				}
			}
			let isRecipeName = recipe.name.toLowerCase().trim().includes(value);
			let isRecipeDescription = recipe.description
				.toLowerCase()
				.trim()
				.includes(value);

			if (isRecipeName || isRecipeDescription || isRecipeIngredient) {
				filteredRecipes.push(recipe);
			}
		}
		// Je vais filtrer les recettes selon la saisie du User
		// let filteredRecipes = recipes.filter(recipe => {
		// 	// On vérifie si la saisie correspond à un nom de recette
		// 	let isRecipeName = recipe.name.toLowerCase().trim().includes(value);
		// 	// On vérifie si la saisie correspond à un ingrédient
		// 	let isRecipeIngredient = recipe.ingredients.some(ingredient =>
		// 		ingredient.ingredient.toLowerCase().trim().includes(value)
		// 	);
		// 	// On vérifie si la saisie correspond à un mot de description
		// 	let isRecipeDescription = recipe.description
		// 		.toLowerCase()
		// 		.trim()
		// 		.includes(value);
		// 	// Retourner true si une des conditions matchent

		// 	return isRecipeName || isRecipeIngredient || isRecipeDescription;
		// });
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

		cardMenu.innerHTML = '';

		// Afficher les recettes correspondantes
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
	});
}
function emptyInputClick() {
	emptyInput.addEventListener('click', () => {
		let textInput = document.querySelector('.search-bar');
		textInput.value = '';
	});
}
emptyInputClick();
// Fonction updateFilter
// Filtre les recettes selon la recherche du user

// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
let menuIngredientLi;
let tagListUpdated = [];
// Création Liste
const getIngredientList = () => {
	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredient => {
			menuIngredientLi = document.createElement('li');
			menuIngredientLi.classList.add('menuIngredientLi');
			menuIngredientLi.textContent = `${ingredient.ingredient}`;
			menuItemIngredients.appendChild(menuIngredientLi);
			tabIngredient.push(menuIngredientLi.textContent);
			// menuIngredientLi.addEventListener('click', handleIngredientClick);
		});
	});
};

const filterIngredients = value => {
	let inputFilterIngredient = tabIngredient.filter(item => {
		return item.toLowerCase().includes(value);
	});
	inputFilterIngredient = inputFilterIngredient.map(item => item.toLowerCase());
	menuItemIngredients.innerHTML = '';
	const uniqueIngredients = [...new Set(inputFilterIngredient)];
	uniqueIngredients.forEach(item => {
		let filteredListIngredients = document.createElement('li');
		filteredListIngredients.classList.add('filteredListIngredients');

		filteredListIngredients.textContent = item;
		// console.log('uniqueIngredients', uniqueIngredients);
		menuItemIngredients.appendChild(filteredListIngredients);
		filteredListIngredients.addEventListener('click', handleIngredientClick);
	});
};
const handleIngredientClick = (event, value) => {
	let selectedElement = event.target.textContent;
	if (tagListUpdated.includes(selectedElement)) {
		tagListUpdated = tagListUpdated.filter(
			element => element !== selectedElement
		);
	} else {
		tagListUpdated.push(selectedElement);
	}
	console.log('tagListUpdated', tagListUpdated);

	updateFilteredRecipes(value);
	updateSelectedIngredientsDisplay(value);
	console.log('VALUE1', value);
};
function updateFilteredRecipes() {
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
			console.log('VALUE2', value);
			// Retourner vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette
			return isIngredientMatch || isApplianceMatch || isUstensilMatch;
		});
	});
	console.log('tagListUpdatedUstensils', tagListUpdated);

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
			console.log('filteredRecipes', filteredRecipes);
			// j'affiche le nombre de recettes, enlever le "s" pour 0 et 1 recette
		});
	} else {
		nbrecipes.textContent = `0 recette`;
		console.log('VALUE3', value);
		cardMenu.innerHTML = `Aucune recette ne contient ${value}. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
		console.log('ingredient');
	}
}

const updateSelectedIngredientsDisplay = value => {
	const paraListIngredients = document.querySelector('.paraList');
	paraListIngredients.innerHTML = '';
	tagListUpdated.forEach(ingredient => {
		let span = document.createElement('span');
		span.classList.add('spantagList');
		span.textContent = `${ingredient} X`;
		paraListIngredients.appendChild(span);
		console.log('VALUE4', value);
		span.addEventListener('click', event => {
			let index = tagListUpdated.indexOf(
				event.currentTarget.textContent.slice(0, -2)
			);
			event.currentTarget.remove();
			if (index !== -1) {
				tagListUpdated.splice(index, 1);
				updateFilteredRecipes(value);
			}
		});
	});
};
const updateFilterIngredient = () => {
	getIngredientList();
	const inputIngredient = document.querySelector('.inputIngredient');
	inputIngredient.addEventListener('input', event => {
		let value = event.target.value.trim().toLowerCase();
		filterIngredients(value);
		console.log('VALUE5', value);
	});
};
updateFilterIngredient();
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
// BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS

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
		let value = event.target.value.trim().toLowerCase();
		let inputFilterAppliance = tabAppliance.filter(item => {
			return item.toLowerCase().includes(value);
		});
		inputFilterAppliance = inputFilterAppliance.map(item => item.toLowerCase());

		menuItemAppliance.innerHTML = '';
		const uniqueAppliance = [...new Set(inputFilterAppliance)];
		uniqueAppliance.forEach(item => {
			let filteredListAppliance = document.createElement('li');
			filteredListAppliance.classList.add('filteredListAppliance');
			// const menuAppliance = document.querySelector('.menuApplianceLi');
			filteredListAppliance.textContent = item;
			menuItemAppliance.appendChild(filteredListAppliance);
			const handleApplianceClick = () => {};
			filteredListAppliance.addEventListener('click', event => {
				let selectedElement = event.target.textContent;
				if (tagListUpdated.includes(selectedElement)) {
					tagListUpdated = tagListUpdated.filter(
						appliance => appliance !== selectedElement
					);
				} else {
					tagListUpdated.push(selectedElement);
				}
				updateFilteredRecipes();

				const paraListAppliance = document.querySelector('.paraList');
				paraListAppliance.innerHTML = '';
				tagListUpdated.forEach(ingredient => {
					let span = document.createElement('span');
					span.textContent = `${ingredient} x`;
					paraListAppliance.appendChild(span);

					span.addEventListener('click', event => {
						let index = tagListUpdated.indexOf(
							event.currentTarget.textContent.slice(0, -2)
						);
						event.currentTarget.remove();

						if (index !== -1) {
							tagListUpdated.splice(index, 1);

							updateFilteredRecipes();
						}
					});
				});
			});
			function updateFilteredRecipes() {
				let filteredRecipes = recipes.filter(recipe => {
					return tagListUpdated.every(selectedElement => {
						let isIngredientMatch = recipe.ingredients.some(
							item =>
								item.ingredient.toLowerCase() === selectedElement.toLowerCase()
						);

						// Vérifier si l'élément sélectionné correspond à l'appareil de la recette
						let isApplianceMatch =
							recipe.appliance.toLowerCase() === selectedElement.toLowerCase();

						// Vérifier si l'élément sélectionné est présent dans les ustensiles de la recette
						let isUstensilMatch = recipe.ustensils.some(ustensil =>
							ustensil.toLowerCase().includes(selectedElement.toLowerCase())
						);

						// Retourner vrai si l'élément sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette
						return isIngredientMatch || isApplianceMatch || isUstensilMatch;
					});
				});
				console.log('tagListUpdatedUstensils', tagListUpdated);

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
						console.log('filteredRecipes', filteredRecipes);
						// j'affiche le nombre de recettes, enlever le "s" pour 0 et 1 recette
					});
				} else {
					nbrecipes.textContent = `0 recette`;
					cardMenu.innerHTML = `Aucune recette ne contient ${value}. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
				}
			}
		});
	});
};
updateFilterAppliance();

// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
// BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
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
		let value = event.target.value.trim().toLowerCase();
		let inputFilterUstensils = tabUstensils.filter(item => {
			return item.toLowerCase().includes(value);
			// Ligne pour effacer ma liste et ensuite la mettre à jour
		});
		menuItemUstensils.innerHTML = '';

		// console.log(event.target.value);
		inputFilterUstensils = inputFilterUstensils.map(item => item.toLowerCase());
		const uniqueUstensil = [...new Set(inputFilterUstensils)];
		uniqueUstensil.forEach(item => {
			let filteredListUstensils = document.createElement('li');
			filteredListUstensils.classList.add('filteredListUstensils');
			filteredListUstensils.textContent = item;
			menuItemUstensils.appendChild(filteredListUstensils);

			filteredListUstensils.addEventListener('click', event => {
				let selectedElement = event.target.textContent;
				if (tagListUpdated.includes(selectedElement)) {
					tagListUpdated = tagListUpdated.filter(
						ustensil => ustensil !== selectedElement
					);
				} else {
					tagListUpdated.push(selectedElement);
				}

				updateFilteredRecipes();
				// Afficher les ingrédients sélectionnés dans la liste des filtres
				const paraListUstensil = document.querySelector('.paraList');
				paraListUstensil.innerHTML = '';
				tagListUpdated.forEach(ingredient => {
					let span = document.createElement('span');
					span.textContent = `${ingredient} x`;
					paraListUstensil.appendChild(span);

					span.addEventListener('click', event => {
						let index = tagListUpdated.indexOf(
							event.currentTarget.textContent.slice(0, -2)
						);
						event.currentTarget.remove();

						if (index !== -1) {
							tagListUpdated.splice(index, 1);
							// Réactualiser les recettes filtrées lorsque l'appareil est supprimé
							updateFilteredRecipes();
						}
					});
				});
			});
			function updateFilteredRecipes() {
				let filteredRecipes = recipes.filter(recipe => {
					return tagListUpdated.every(selectedElement => {
						let isIngredientMatch = recipe.ingredients.some(
							item =>
								item.ingredient.toLowerCase() === selectedElement.toLowerCase()
						);
						// Vérifier si l'élément sélectionné correspond à l'appareil de la recette
						let isApplianceMatch =
							recipe.appliance.toLowerCase() === selectedElement.toLowerCase();
						// Vérifier si l'élément sélectionné est présent dans les ustensiles de la recette
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
						console.log('filteredRecipes', filteredRecipes);
						// j'affiche le nombre de recettes, enlever le "s" pour 0 et 1 recette
					});
				} else {
					nbrecipes.textContent = `0 recette`;
					cardMenu.innerHTML = `Aucune recette ne contient ${value}. Vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
				}
			}
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

	const divCardImage = document.createElement('div');
	divCardImage.classList.add('divCardImage');
	const cardMenuImage = document.createElement('img');
	cardMenuImage.setAttribute('src', `assets/images/${recipe.image}`);
	cardMenuImage.setAttribute('alt', recipe.name);
	cardMenuImage.classList.add('card-menu-image');
	recipeCard.appendChild(divCardImage);
	divCardImage.appendChild(cardMenuImage);

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

// const updateFilterAppliance = () => {
// 	const inputAppliance = document.querySelector('.inputAppliance');
// 	recipes.forEach(recipe => {
// 		const menuApplianceLi = document.createElement('li');
// 		menuApplianceLi.classList.add('menuApplianceLi');
// 		menuApplianceLi.textContent = `${recipe.appliance}`;
// 		menuItemAppliance.appendChild(menuApplianceLi);
// 		tabAppliance.push(menuApplianceLi.textContent);
// 	});

// 	inputAppliance.addEventListener('input', event => {
// 		let value = event.target.value.trim();

// 		let inputFilterAppliance = tabAppliance.filter(item => {
// 			return item.toLowerCase().includes(value);
// 			// Ligne pour effacer ma liste et ensuite la mettre à jour
// 		});
// 		menuItemAppliance.innerHTML = '';

// 		// console.log(event.target.value);
// 		inputFilterAppliance.forEach(item => {
// 			let filteredListAppliance = document.createElement('li');
// 			filteredListAppliance.classList.add('filteredListAppliance');

// 			// const menuAppliance = document.querySelector('.menuApplianceLi');
// 			filteredListAppliance.textContent = item;
// 			menuItemAppliance.appendChild(filteredListAppliance);

// 			filteredListAppliance.addEventListener('click', event => {
// 				//click sur mon element de liste puis maj des cartes
// 				let selectedAppliance = event.target.textContent;
// 				if (tagListUpdated.includes(selectedAppliance)) {
// 					tagListUpdated = tagListUpdated.filter(
// 						appliance => appliance !== selectedAppliance
// 					);
// 				} else {
// 					tagListUpdated.push(selectedAppliance);
// 				}

// 				// Tri des recettes
// 				console.log('tagListUpdatedAPPLIANCE', tagListUpdated);

// 				// console.log('tagListUpdated', tagListUpdated);
// 				let filteredRecipes = recipes.filter(recipe => {
// 					return tagListUpdated.every(selectedAppliance => {
// 						return recipe.appliance.includes(selectedAppliance);
// 					});
// 				});

// 				cardMenu.innerHTML = '';
// 				filteredRecipes.forEach(recipe => {
// 					displayRecipe(recipe);
// 				});
// 				console.log('tagListUpdatedAPPLIANCE2', tagListUpdated);
// 				// console.log('filteredRecipes', filteredRecipes);
// 				// Afficher les ingrédients sélectionnés dans la liste des filtres
// 				const paraListAppliance = document.querySelector('.paraList');
// 				paraListAppliance.innerHTML = '';
// 				tagListUpdated.forEach(ingredient => {
// 					let span = document.createElement('span');
// 					span.textContent = `${ingredient} x`;
// 					paraListAppliance.appendChild(span);

// 					span.addEventListener('click', event => {
// 						let index = tagListUpdated.indexOf(
// 							event.currentTarget.textContent.slice(0, -2)
// 						);
// 						event.currentTarget.remove();

// 						if (index !== -1) {
// 							tagListUpdated.splice(index, 1);
// 							// Réactualiser les recettes filtrées lorsque l'appareil est supprimé
// 							updateFilteredRecipes();
// 						}
// 					});
// 				});

// 				// Afficher les recettes filtrées
// 				cardMenu.innerHTML = '';
// 				filteredRecipes.forEach(recipe => {
// 					displayRecipe(recipe);
// 				});
// 			});
// 			function updateFilteredRecipes() {
// 				let filteredRecipes = recipes.filter(recipe => {
// 					return tagListUpdated.every(selectedAppliance => {
// 						return recipe.appliance.toLowerCase().includes(selectedAppliance);
// 					});
// 				});
// 				console.log('tagListUpdatedAPPLIANCE3', tagListUpdated);

// 				// Afficher les recettes filtrées
// 				cardMenu.innerHTML = '';
// 				filteredRecipes.forEach(recipe => {
// 					displayRecipe(recipe);
// 				});
// 			}
// 		});
// 	});
// };
// updateFilterAppliance();
