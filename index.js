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
// BOUTONS INGREDIENTS / LISTE DES INGREDIENTS
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

		menuItemIngredients.appendChild(filteredListIngredients);
		filteredListIngredients.addEventListener('click', handleIngredientClick);
	});
	// Mettre à jour les filtres pour les appareils
	const filteredRecipes = recipes.filter(recipe => {
		return recipe.ingredients.some(ingredient =>
			uniqueIngredients.includes(ingredient.ingredient.toLowerCase())
		);
	});
	const filteredAppliance = filteredRecipes.map(recipe => recipe.appliance);
	const uniqueAppliance = [...new Set(filteredAppliance)];
	displayFilteredItems(uniqueAppliance, menuItemAppliance);

	// Mettre à jour les filtres pour les ustensiles
	const filteredUstensils = filteredRecipes.reduce((acc, recipe) => {
		return [...acc, ...recipe.ustensils];
	}, []);
	const uniqueUstensils = [...new Set(filteredUstensils)];
	displayFilteredItems(uniqueUstensils, menuItemUstensils);
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
// BOUTONS APPAREILS / LISTE DES APPAREILS

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
		let span = document.createElement('span');
		span.textContent = `${appliance} X`;
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

			filteredListAppliance.textContent = item;
			menuItemAppliance.appendChild(filteredListAppliance);
			filteredListAppliance.addEventListener('click', handleClickAppliance);
		});
		const filteredRecipesByAppliance = recipes.filter(recipe => {
			return uniqueAppliance.includes(recipe.appliance.toLowerCase());
		});
		const filteredIngredientsByAppliance = filteredRecipesByAppliance.reduce(
			(acc, recipe) => {
				return [
					...acc,
					...recipe.ingredients.map(ingredient =>
						ingredient.ingredient.toLowerCase()
					),
				];
			},
			[]
		);
		const uniqueIngredientsByAppliance = [
			...new Set(filteredIngredientsByAppliance),
		];
		displayFilteredItems(uniqueIngredientsByAppliance, menuItemIngredients);

		// Filtrer et mettre à jour les ustensiles en fonction des appareils filtrés
		const filteredUstensilsByAppliance = filteredRecipesByAppliance.reduce(
			(acc, recipe) => {
				return [...acc, ...recipe.ustensils];
			},
			[]
		);
		const uniqueUstensilsByAppliance = [
			...new Set(filteredUstensilsByAppliance),
		];
		displayFilteredItems(uniqueUstensilsByAppliance, menuItemUstensils);
		updateFilteredRecipes();
	});
};
updateFilterAppliance();

// BOUTONS USTENSILS / LISTE DES USTENSILS

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
		span.textContent = `${ingredient} X`;
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
			// Filtrer et mettre à jour les ingrédients en fonction des ustensiles filtrés
			const filteredRecipesByUstensils = recipes.filter(recipe => {
				return recipe.ustensils.some(ustensil =>
					uniqueUstensil.includes(ustensil.toLowerCase())
				);
			});
			const filteredIngredientsByUstensils = filteredRecipesByUstensils.reduce(
				(acc, recipe) => {
					return [
						...acc,
						...recipe.ingredients.map(ingredient =>
							ingredient.ingredient.toLowerCase()
						),
					];
				},
				[]
			);
			const uniqueIngredientsByUstensils = [
				...new Set(filteredIngredientsByUstensils),
			];
			displayFilteredItems(uniqueIngredientsByUstensils, menuItemIngredients);

			// Filtrer et mettre à jour les appareils en fonction des ustensiles filtrés
			const filteredApplianceByUstensils = filteredRecipesByUstensils.map(
				recipe => recipe.appliance
			);
			const uniqueApplianceByUstensils = [
				...new Set(filteredApplianceByUstensils),
			];
			displayFilteredItems(uniqueApplianceByUstensils, menuItemAppliance);
			updateFilteredRecipes();
		});
	});
};
updateFilterUstensils();

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

fetchData();
export {
	handleIngredientClick,
	handleClickAppliance,
	handleClickUstensil,
	updateFilteredRecipes,
	displayRecipe,
	tagListUpdated,
};
