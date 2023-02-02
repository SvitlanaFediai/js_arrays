let shoppingList = [
    {name: "potato",
    quantity: 2,
    buyed: false,
    price: 20,
    sum: 0
  }, 
  {name: "banana",
    quantity: 1,
    buyed: true,
    price: 70,
    sum: 0
  }, 
  {name: "cabbage",
    quantity: 2,
    buyed: false,
    price: 45,
    sum: 0
  }, 
  {name: "carrot",
    quantity: 1,
    buyed: true,
    price: 22,
    sum: 0
  }, 
  {name: "eggs",
    quantity: 2,
    buyed: true,
    price: 70,
    sum: 0
  }, 
  
];

calcSum();
shoppingList.sort(sorting);
printProduct(shoppingList);


function calcSum() {
  shoppingList.forEach((element) => {
    element.sum = element.quantity * element.price;
  });
}

//Sort method

/*let sorted = [];

shoppingList.forEach(function (elem) {

  if (elem.buyed !== true) {
    sorted.unshift(elem);
  } else {
    sorted.push(elem);
  }
})*/

function sorting(elem) {
  if (elem.buyed) return 1 
  else return -1;
}


//Add array of product in HTML
function printProduct(array) {
let div = document.querySelector('.shopping__list'),
    table = document.createElement('table'),
    tbody = document.createElement('tbody'),
    thead = document.createElement('thead'),
    trh = document.createElement('tr');
    
div.innerHTML = '';
table.classList.add('table');

trh.innerHTML = '<th class = "row__head">Product name</th><th class = "row__head">Quantity</th><th class = "row__head">Unit price, UAH</th><th class = "row__head">Subtotal, UAH</th>';

thead.appendChild(trh);
table.append(thead, tbody);

/*tr.appendChild(td);*/

  array.forEach((product) => {
    let tr = document.createElement('tr');
        tr.classList.add('row');
        tbody.appendChild(tr);
        tr.innerHTML += `<td>${product.name}</td><td>${product.quantity}</td><td>${product.price}</td><td>${product.sum}</td><td><button class = "btn btn__del" data-name="${product.name}" type="button">Delete</button></td>`;
    
    if (product.buyed === true) {
      tr.classList.add('buyed');
    }
  });
  
  /*let delBtn = document.querySelectorAll('.btn__del');
  delBtn.forEach((elem) => {
    elem.addEventListener('click', function(e) {
      if (e.target && e.target.classList.contains('btn__del')) {
        let name = e.target.dataset.name
        removeItem(name);
      }
    });
  });*/
  let tr = document.createElement('tr');
  tr.addEventListener('click', function(e){
    if (e.target && e.target.classList.contains('btn__del')) {
      let name = e.target.dataset.name
      removeItem(name);
    }
  });

  div.prepend(table); 
}
   

//Buy item
let buyBtn = document.querySelector('.btn__buy');
buyBtn.addEventListener('click', buyItem);
let nameProduct = document.getElementById('name');
let quantity = document.getElementById('qty');
let price = document.getElementById('price');

function buyItem() {
  
      /*priceProduct = document.getElementById('price'),
      qtyProduct = document.getElementById('qty');*/

  let found = shoppingList.find(element => element.name === nameProduct.value);
  if (found) {
    if (found.buyed === false) {
      found.buyed = true;
    }
    else {
       alert('This product has been bought');
       return;
    }
  } else {
    alert('No such product in the list');
      return;
  }

  shoppingList.sort(sorting);
  printProduct(shoppingList);
}

//Add item to shopping list
let addBtn = document.querySelector('.btn__add');
addBtn.addEventListener('click', addItem);

function addItem() {
  let found = shoppingList.find(element => element.name === nameProduct.value);
  
  if (found) {
    found.buyed = false;

    if (quantity.value === '') {
      found.quantity++;
    }
    else {
      found.quantity += quantity.value;
    }
    
  } else {
    shoppingList.push({
      name: nameProduct.value,
      quantity: quantity.value,
      buyed: false,
      price: price.value,
      sum: 0,
    });
  } 

  calcSum();
  shoppingList.sort(sorting);
  printProduct(shoppingList);
  
}


//Delete item
function removeItem(name) {

  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i].name === name) {
      if (shoppingList[i].quantity > 0) {
        shoppingList[i].quantity -= shoppingList[i].quantity
      }
      if (shoppingList[i].quantity < 1 || shoppingList[i].quantity === 0) {
        shoppingList.splice(i, 1);
      }
      printProduct(shoppingList);
      return

    }
    
  }
}
removeItem();

/*delBtn.addEventListener('click', function (e) {
  node.parentNode.removeChild(node);
}, false);
  /*})

})


/*let newShoppingList = shoppingList;*/

/*function removeItem() {

  shoppingList.splice(i, 1);
  printProduct();
  /*newShoppingList = newShoppingList.filter(word => word.name !== nameProduct.value);
  printProduct(newShoppingList);

  clearField();

  let i = shoppingList.findIndex(elem => elem.name === name);
  shoppingList.splice(i, 1);

  printProduct();

  /*for (let i = 0; i < shoppingList.length; i++) {
    shoppingList.splice(i, 1);
    
  } 
}*/



//clear input field
function clearField() {
  nameProduct.value = '';
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
  boughtResult.innerHTML = `The amount of all goods is ${boughtAmount.toFixed(2)} UAH`;
  unbResult.innerHTML = `The amount of unacquired goods is ${unbAmount.toFixed(2)} UAH`;
  
}
total();
