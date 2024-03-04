// import recipes from "./assets/data/recipes";
// const cardMenu = document.querySelector('.card-menu');

// function displayRecipe(recipe) {
// 	// Créer une nouvelle div pour chaque recette

// 	const recipeCard = document.createElement('div');
// 	const h2recipe = document.createElement('h2');
// 	const h3ingredient = document.createElement('h3');
// 	h3ingredient.classList.add('headline-ingredient');
// 	h2recipe.classList.add('headline-recipe');
// 	h2recipe.textContent = 'RECETTE';
// 	h3ingredient.textContent = 'INGRÉDIENTS';
// 	recipeCard.classList.add('card-recipe');

// 	const divCardImage = document.createElement('div');
// 	divCardImage.classList.add('divCardImage');
// 	const cardMenuImage = document.createElement('img');
// 	cardMenuImage.setAttribute('src', `assets/images/${recipe.image}`);
// 	cardMenuImage.setAttribute('alt', recipe.name);
// 	cardMenuImage.classList.add('card-menu-image');
// 	recipeCard.appendChild(divCardImage);
// 	divCardImage.appendChild(cardMenuImage);

// 	const recipeTime = document.createElement('p');
// 	recipeTime.classList.add('recipe-time');
// 	recipeTime.textContent = `${recipe.time}min`;
// 	recipeCard.appendChild(recipeTime);

// 	// Mettre à jour le contenu des éléments avec les données de la recette
// 	const recipeName = document.createElement('h2');
// 	recipeName.classList.add('recipes-name');
// 	recipeName.textContent = recipe.name;
// 	recipeCard.appendChild(recipeName);
// 	recipeCard.appendChild(h2recipe);

// 	const recipeDescription = document.createElement('p');
// 	recipeDescription.classList.add('recipe-description');
// 	recipeDescription.textContent = recipe.description;
// 	recipeCard.appendChild(recipeDescription);
// 	recipeCard.appendChild(h3ingredient);

// 	// Afficher les ingrédients
// 	const ingredientContainer = document.createElement('div');
// 	ingredientContainer.classList.add('ingredient-container');
// 	recipeCard.appendChild(ingredientContainer);

// 	recipe.ingredients.forEach(ingredient => {
// 		const ingredientContent = document.createElement('div');
// 		ingredientContent.classList.add('ingredient-content');
// 		recipeCard.appendChild(ingredientContent);
// 		const ingredientName = document.createElement('p');
// 		const ingredientQuantityUnit = document.createElement('p');
// 		ingredientName.textContent = `${ingredient.ingredient}`;
// 		ingredientQuantityUnit.textContent = `${
// 			ingredient.quantity ? ingredient.quantity : ''
// 		} ${ingredient.unit ? ingredient.unit : ''}`;
// 		ingredientQuantityUnit.classList.add('ingredient-quantity-unit');
// 		ingredientContent.appendChild(ingredientName);
// 		ingredientContent.appendChild(ingredientQuantityUnit);
// 		ingredientContainer.appendChild(ingredientContent);
// 	});

// 	// Ajouter la carte de recette à la carte principale
// 	cardMenu.appendChild(recipeCard);
// }
// export { displayRecipe };
