//get all html elements needed

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
		const recipe = json.recipe;
		let ingredients = json.recipe.ingredients;
		mainTitle.innerHTML = recipe.name;

		for (let i=0; i<=ingredients.length; i++) {
		itemListContainer.innerHTML += '<div class="item__container"><input class="item__checkbox" type="checkbox" value="" name="add-ingredient" onchange=checked()><input class="item__input" type="text" name="number-ingredients" value=""><div class="item__details"><h4 class="roboto-slab">' +  ingredients[i].product + '</h4><p class="item__paragraph-c7">' + ingredients[i].brand + '</p><p class="item__paragraph-grey">' + ingredients[i].quantity + '</p></div><h3 class="item__price">' + ingredients[i].price + '&nbsp€ </h3></div></div>'
		}
});


	function checked() {
		alert('has cambiado');
	}
