var app = function() {

	let mainTitle = document.getElementById('main-title');
	let itemListContainer =
	document.querySelector('.itemsList__container');
	let check = document.querySelector('.item__checkbox');
	let selectAll = document.getElementById('select-all');
	let deselectAll = document.getElementById('deselect-all');
	let itemsCount=0;
	let itemCount = document.querySelector('.item-count');
	let subtotal = document.querySelector('.subtotal');
	let itemsSubtotal=0;
	let sendPrice = document.querySelector('.send');
	let sendPriceValue = parseInt(sendPrice.innerText);
	let total = document.querySelector('.item__price');
	let totalButton = document.querySelector('.price__button-buy');
	// let totalButtonValue = totalButton.innerText;

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
				<input type="hidden" value="${ingredient.price}" />
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


	function toggleSelection(value){
		let checkBoxList = document.querySelectorAll('.item__checkbox');
		checkBoxList.forEach(function(checkbox){
			checkbox.checked = value;
		});
	}


	function registerEvents(){
		let checkBoxList = document.querySelectorAll('.item__checkbox');
		checkBoxList.forEach(function(checkbox){
			checkbox.addEventListener('click', handleCheckIngredient)
		});

		let itemInputList = document.querySelectorAll('.item__input');
		itemInputList.forEach(function(input){
			input.addEventListener('change', handleItemChange)
		});
	}


	function handleItemChange(e){
		let itemInputEl = event.target;
		let itemInputValue = event.target.value;
		let priceEl = itemInputEl.parentElement.children[3];
		let unitPriceEl = itemInputEl.parentElement.children[4];
		let unitPriceValue = parseFloat(unitPriceEl.value);

		const itemTotalPrice = itemInputValue * unitPriceValue;
		priceEl.innerText = `${itemTotalPrice.toFixed(2)} €`;
	}


	function handleCheckIngredient(e){
		let checkbox = event.target
		let input = checkbox.parentElement.children[1];
		let inputValue = parseInt(input.value);
		let itemTotalPrice = checkbox.parentElement.children[3];
		let itemTotalPriceValue = parseFloat(itemTotalPrice.innerText);
		let totalValue = total.innerText;
		let totalPrice=0;

		if (checkbox.checked) {
			itemsCount += inputValue;
			itemsSubtotal += itemTotalPriceValue;
			subtotal.innerHTML = `${itemsSubtotal.toFixed(2)} €`;
			totalPrice = itemsSubtotal + sendPriceValue;
			total.innerHTML = `${totalPrice.toFixed(2)} €`;
			totalButton.innerHTML = `Comprar ingredientes: ${totalPrice.toFixed(2)} €`;
		} else {
			itemsCount -= inputValue;
			itemsSubtotal -= itemTotalPriceValue;
			subtotal.innerHTML = `${itemsSubtotal.toFixed(2)} €`;
			totalPrice = itemsSubtotal + sendPriceValue;
			total.innerHTML = `${totalPrice.toFixed(2)} €`;
			totalButton.innerHTML = `Comprar ingredientes: ${totalPrice.toFixed(2)} €`;
		}
		itemCount.innerHTML = itemsCount;

		console.log(itemsCount);
	}


}



();
