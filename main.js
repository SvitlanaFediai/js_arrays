'use strict';

let shoppingList = [
  { id: generateUniqueId(),
    name: "potato",
    quantity: 2,
    buyed: false,
    price: 20,
    sum: 0
  }, 
  { id: generateUniqueId(),
    name: "banana",
    quantity: 1,
    buyed: true,
    price: 70,
    sum: 0
  }, 
  { id: generateUniqueId(),
    name: "cabbage",
    quantity: 2,
    buyed: false,
    price: 45,
    sum: 0
  }, 
  { id: generateUniqueId(),
    name: "carrot",
    quantity: 1,
    buyed: true,
    price: 22,
    sum: 0
  }, 
  { id: generateUniqueId(),
    name: "eggs",
    quantity: 2,
    buyed: true,
    price: 70,
    sum: 0
  }, 
];

let nameProduct = document.getElementById('name'),
    quantity = document.getElementById('qty'),
    price = document.getElementById('price');

printProduct(shoppingList.sort(showExpensiveProductFirst));
printProduct(shoppingList.sort(showExpensiveProductFirst));

//Sort product in array by buyed or not
/*function sorting(elem) {
  if (elem.buyed) return 1 
  else return -1;
}*/

//Sort shopping items in array by two condition - by buyed and sum (from expensive first)
function showExpensiveProductFirst(a, b) {
  return a.buyed - b.buyed || b.sum - a.sum;
}

//Add array of product in HTML
function printProduct() {
  let div = document.querySelector('.shopping__list'),
      table = document.createElement('table'),
      tbody = document.createElement('tbody'),
      thead = document.createElement('thead'),
      trh = document.createElement('tr');

  div.innerHTML = '';
  table.classList.add('table');

  trh.innerHTML = '<th class = "row__head">Product name</th><th class = "row__head">Quantity</th><th class = "row__head">Unit price, UAH</th><th class = "row__head">Subtotal, UAH</th><th class = "input row__head">Buy</th>';

  thead.appendChild(trh);
  table.append(thead, tbody);

  shoppingList.forEach((product) => {
    product.sum = product.price * product.quantity;

    let tr = document.createElement('tr'),
        blockHTML = `<td>${product.name}</td><td>${product.quantity}</td><td>${product.price}</td><td>${product.sum}</td><input class="checkbox" type="checkbox" name="${product.name}" value="${product.buyed}"><button class="btn btn__del" data-name="${product.name}" data-id="${product.id}" type="button">Delete</button>`;
        
    tr.classList.add('row');
    tr.innerHTML += blockHTML;
    tbody.appendChild(tr);
    
    if (product.buyed === true) {
      tr.classList.add('buyed');
    }
    
    let input = tr.getElementsByTagName('input');
 
    for (let i = 0; i < input.length; i++ ) {
      input[i].addEventListener('change', buyedProduct);

      if (tr.classList.contains('buyed')) {
        input[i].setAttribute('checked', true);
      }
    }
  });
  
  div.prepend(table);
  total();

  let deleteBtn = document.querySelectorAll('.btn__del');
  deleteBtn.forEach((el) => {
    el.addEventListener('click', removeItem);
  })
  
}

//Add item to shopping list
let addBtn = document.querySelector('.btn__add');
addBtn.addEventListener('click', addItem);

function addItem() {
  if (nameProduct.value == '' || price.value == '') {
		showWarning('Please, fill all fields!');
		return;
	}

  let found = shoppingList.find(element => element.name === nameProduct.value);
  
  if (found) {
    if (found.price === parseInt(price.value)) {
      found.buyed = false;
      found.quantity += parseInt(quantity.value);
    } else {
      shoppingList.push({
        id: generateUniqueId(),
        name: nameProduct.value,
        quantity: parseInt(quantity.value),
        buyed: false,
        price: parseInt(price.value),
        sum: 0,
      });
    }
  } else {
    shoppingList.push({
      id: generateUniqueId(),
      name: nameProduct.value,
      quantity: parseInt(quantity.value),
      buyed: false,
      price: parseInt(price.value),
      sum: 0,
    });
  } 

  printProduct(shoppingList.sort(showExpensiveProductFirst));
  printProduct(shoppingList.sort(showExpensiveProductFirst));
  clearField();
}

//Buy item
function buyedProduct() {
  let item = shoppingList.find(element => element.name === this.name);

  if (this.checked) {
    this.parentNode.classList.add('buyed');
    item.buyed = true;
  } else {
    this.parentNode.classList.remove('buyed');
    item.buyed = false;
  }

  total();
  printProduct(shoppingList.sort(showExpensiveProductFirst));
}

//clear input field
function clearField() {
  nameProduct.value = '';
  quantity.value = 1;
  price.value = '';
}

//Delete item
function removeItem() {
  let nameItem = this.dataset.name,
      idItem = this.dataset.id,
      userAnswer = confirm(`Are you sure you want to delete ${nameItem}?`);

  if (userAnswer) {
    for (let i = 0; i < shoppingList.length; i++) {
      if (shoppingList[i].id === idItem) {
        shoppingList.splice(i, 1);
      }
    }
    
  }
  //shoppingList.sort(showExpensiveProductFirst);
  printProduct();
}

//Sum total of all shopping list 
function total(){
  let totalResult = document.querySelector('.total'),
      boughtResult = document.querySelector('.bought__total'),
      unbResult = document.querySelector('.unb__total'),
      amount = 0,
      boughtAmount = 0,
      unbAmount = 0;
  
  shoppingList.forEach((element) => {
    amount += element.sum;

    if (element.buyed === true) {
      boughtAmount += element.sum;
    }
    else {
      unbAmount += element.sum;
    }
  });

  totalResult.innerHTML = `The amount of all goods is ${amount.toFixed(2)} UAH`;
  boughtResult.innerHTML = `The amount of all purchased goods is ${boughtAmount.toFixed(2)} UAH`;
  unbResult.innerHTML = `The amount of unacquired goods is ${unbAmount.toFixed(2)} UAH`;
}

function showWarning(message) {
	var dialog = document.createElement('div'),
		dialogOverlay = document.createElement('div');

	dialogOverlay.className = 'dialog-overlay';
	dialog.className = 'dialog';

	dialog.innerHTML = `<p>${message}</p>`;

	document.body.append(dialogOverlay, dialog);

	setTimeout(function(){
		dialogOverlay.remove();
		dialog.remove();
	}, 3000);
}

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}