var app = function (config) {

let mainTitle = document.getElementById('main-title');
let itemListContainer =
document.querySelector('.itemsList__container');
let check = document.querySelector('.item__checkbox');
console.log(itemListContainer);
let input = document.querySelector('.item__input');


fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		renderItems(json);
	});

function renderItems(itemsJson) {
	console.log(itemsJson);
	const recipe = itemsJson.recipe;
	const ingredients = recipe.ingredients;
	mainTitle.innerHTML = recipe.name;

	for (let i=0; i < ingredients.length; i++) {
		//itemListContainer.innerHTML += renderIngredient(ingredients[i]);
		let itemElement = document.createElement('div');
		itemElement.innerHTML = renderIngredient(ingredients[i]);
		itemListContainer.append(itemElement);
	}

	registerEvents();
}

function registerEvents(){
	let checkBoxList = document.querySelectorAll('.item__checkbox');
	checkBoxList.forEach(function(checkbox){
		console.log(checkbox);
		checkbox.addEventListener('click', handleCheckIngredient)
	});
}

function selectAll(){
	let checkBoxList = document.querySelectorAll('.item__checkbox');
	checkBoxList.forEach(function(checkbox){
		checkbox.checked = true;
	});
}

function handleCheckIngredient(e){
	console.log('handleCheckIngredient', e);
}

function renderIngredient(ingredient){
	return `
	<div class="item__container">
  		<input class="item__checkbox" type="checkbox" name="add-ingredient">
  		<input class="item__input" type="text" name="number-ingredients" value="${ingredient.items}">
  		<div class="item__details">
  			<h4 class="roboto-slab">${ingredient.product}</h4>
  			<p class="item__paragraph-c7">${ingredient.brand}</p>
  			<p class="item__paragraph-grey">${ingredient.quantity}</p>
  		</div>
  		<h3 class="item__price">${ingredient.price} €</h3>
  	</div>`;
}

return {};

}();
