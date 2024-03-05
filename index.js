import recipes from './assets/data/recipes.js';
import { dropdown } from './dropDown.js';
import { mainSearch } from './mainSearch.js';
import { updateFilteredRecipes } from './updateFilteredRecipes.js';
import { displayRecipe } from './displayRecipe.js';
// DOM
const nbrecipes = document.getElementById('total-recipes');
const menuItemIngredients = document.querySelector('.menu-item-ingredients');
const menuItemAppliance = document.querySelector('.menu-item-appliance');
const menuItemUstensils = document.querySelector('.menu-item-ustensils');

let tabIngredient = [];
let tabAppliance = [];
let tabUstensils = [];
let tagListUpdated = [];
let menuIngredientLi;
nbrecipes.textContent = `${recipes.length} recettes`;

dropdown();
mainSearch();
// function updateFilteredRecipes() ici

//! BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
//! BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
// Création Liste
const getIngredientList = () => {
	recipes.forEach(recipe => {
		recipe.ingredients.forEach(ingredient => {
			menuIngredientLi = document.createElement('li');
			menuIngredientLi.classList.add('menuIngredientLi');
			menuIngredientLi.textContent = `${ingredient.ingredient}`;
			menuItemIngredients.appendChild(menuIngredientLi);
			tabIngredient.push(menuIngredientLi.textContent);
			menuIngredientLi.addEventListener('click', handleIngredientClick);
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
const handleIngredientClick = event => {
	let selectedElement = event.target.textContent;
	if (tagListUpdated.includes(selectedElement)) {
		tagListUpdated = tagListUpdated.filter(
			element => element !== selectedElement
		);
	} else {
		tagListUpdated.push(selectedElement);
	}
	updateFilteredRecipes();
	updateSelectedIngredientsDisplay();
};

const updateSelectedIngredientsDisplay = () => {
	const paraListIngredients = document.querySelector('.paraList');
	paraListIngredients.innerHTML = '';
	tagListUpdated.forEach(ingredient => {
		let span = document.createElement('span');
		span.classList.add('spantagList');
		span.textContent = `${ingredient} X`;
		paraListIngredients.appendChild(span);

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
};
const updateFilterIngredient = () => {
	getIngredientList();
	const inputIngredient = document.querySelector('.inputIngredient');
	inputIngredient.addEventListener('input', event => {
		let value = event.target.value.trim().toLowerCase();
		filterIngredients(value);
	});
};
updateFilterIngredient();
//! BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS
//! BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS BOUTONS APPAREILS / LISTE DES APPAREILS

const handleClickAppliance = event => {
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

	tagListUpdated.forEach(appliance => {
		console.log('appliance', appliance);

		let span = document.createElement('span');
		span.textContent = `${appliance} x`;
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
	// console.log('tagListUpdated', tagListUpdated);
};
const updateFilterAppliance = () => {
	const inputAppliance = document.querySelector('.inputAppliance');
	const uniqueAppliances = new Set();
	recipes.forEach(recipe => {
		if (!uniqueAppliances.has(recipe.appliance)) {
			const menuApplianceLi = document.createElement('li');
			menuApplianceLi.classList.add('menuApplianceLi');
			menuApplianceLi.textContent = `${recipe.appliance}`;
			menuItemAppliance.appendChild(menuApplianceLi);
			tabAppliance.push(menuApplianceLi.textContent);
			uniqueAppliances.add(recipe.appliance);
			menuApplianceLi.addEventListener('click', handleClickAppliance);
		}
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
			filteredListAppliance.addEventListener('click', handleClickAppliance);
			updateFilteredRecipes();
		});
	});
};
updateFilterAppliance();

//! BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS
//! BOUTONS USTENSILS / LISTE DES USTENSILS BOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILSBOUTONS USTENSILS / LISTE DES USTENSILS

const handleClickUstensil = event => {
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
};
const updateFilterUstensils = () => {
	const inputUstensils = document.querySelector('.inputUstensils');

	recipes.forEach(recipe => {
		recipe.ustensils.forEach(ustensil => {
			const menuUstensilsLi = document.createElement('li');
			menuUstensilsLi.classList.add('menuUstensilsLi');
			menuUstensilsLi.textContent = `${ustensil}`;
			menuItemUstensils.appendChild(menuUstensilsLi);
			tabUstensils.push(menuUstensilsLi.textContent);
			menuUstensilsLi.addEventListener('click', handleClickUstensil);
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
		inputFilterUstensils = inputFilterUstensils.map(item => item.toLowerCase());
		const uniqueUstensil = [...new Set(inputFilterUstensils)];
		uniqueUstensil.forEach(item => {
			let filteredListUstensils = document.createElement('li');
			filteredListUstensils.classList.add('filteredListUstensils');
			filteredListUstensils.textContent = item;
			menuItemUstensils.appendChild(filteredListUstensils);

			filteredListUstensils.addEventListener('click', handleClickUstensil);
			updateFilteredRecipes();
		});
	});
};
updateFilterUstensils();

// Fonction pour afficher une recette

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
export {
	handleIngredientClick,
	handleClickAppliance,
	handleClickUstensil,
	updateFilteredRecipes,
	tagListUpdated,
};
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
