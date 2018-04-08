var app = function (config) {

	let mainTitle = document.getElementById('main-title');
	let itemListContainer =
	document.querySelector('.itemsList__container');
	let check = document.querySelector('.item__checkbox');
	let selectAll = document.getElementById('select-all');
	let deselectAll = document.getElementById('deselect-all');
	let itemsCount=0;
	let itemCount = document.querySelector('.item-count');

	selectAll.addEventListener('click', function() {
		toggleSelection(true);
	});
	deselectAll.addEventListener('click', function() {
		toggleSelection(false);
	});


	fetch('https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json')
		.then(function(response){
			return response.json();
		})
		.then(function(json){
			renderItems(json);
		});

	function renderIngredient(ingredient){
		return `
			<div class="item__container">
				<input class="item__checkbox" type="checkbox" name="add-ingredient">
				<input class="item__input" type="text" name="number-ingredients" value="${ingredient.items}">
				<div>
					<h4 class="roboto-slab">${ingredient.product}</h4>
					<p class="item__paragraph-c7">${ingredient.brand}</p>
					<p class="item__paragraph-grey">${ingredient.quantity}</p>
				</div>
				<h3 class="item__price">${ingredient.price} €</h3>
			</div>`;
		}

	function renderItems(itemsJson) {
		console.log(itemsJson);
		const recipe = itemsJson.recipe;
		const ingredients = recipe.ingredients;
		mainTitle.innerHTML = recipe.name;

		for (let i=0; i < ingredients.length; i++) {
			let itemElement = document.createElement('div');
			itemElement.innerHTML = renderIngredient(ingredients[i]);
			itemListContainer.append(itemElement);
		}
		registerEvents();
	}

	// let checkBoxList = document.querySelectorAll('.item__checkbox');

	function toggleSelection(value){
		let checkBoxList = document.querySelectorAll('.item__checkbox');
		checkBoxList.forEach(function(checkbox){
			checkbox.checked = value;
		});
	}


	function registerEvents(){
		let checkBoxList = document.querySelectorAll('.item__checkbox');
		checkBoxList.forEach(function(checkbox){
			console.log(checkbox);
			checkbox.addEventListener('click', handleCheckIngredient)
		});
	}


	function handleCheckIngredient(e){
		let checkbox = event.target
		console.log("value", checkbox);
		let input = checkbox.parentElement.children[1];
		console.log("input", input);

		let inputValue = parseInt(input.value);
		console.log('inputValue:',inputValue);

	 	itemsCount= (checkbox.checked) ? itemsCount + inputValue:
		itemsCount - inputValue;
		itemCount.innerHTML = itemsCount;
		console.log(itemsCount);

	}

}



();
