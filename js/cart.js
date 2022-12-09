window.onload = renderCart();

function addToCart(product) {
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let currentUserId;
  if (currentUser != null) {
    currentUserId = currentUser.id;
  } else {
    currentUserId = 0;
  }
  let currentDate = new Date();
  let time = currentDate.getHours() + "h:" + currentDate.getMinutes() + "m " + currentDate.getDate() + "/" + Number(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
  let cartId = Math.random();
  let duplicateIndex;
  let listCart = JSON.parse(localStorage.getItem('carts'));
  let listProduct = JSON.parse(localStorage.getItem('products'));
  let productId = product.getAttribute('id');
  let productIndex = listProduct.findIndex(element => element.id == productId);
  if ((duplicateIndex = findByProductIdWithoutCheckOutId(productId, listCart[currentUserId])) != -1 ) {
    listCart[currentUserId][duplicateIndex].soluong = parseInt(listCart[currentUserId][duplicateIndex].soluong) + 1;
  } else {
    if (currentUser != null) {
      listProduct[productIndex].userName = currentUser.name;
    }
    listProduct[productIndex].soluong = 1;
    listProduct[productIndex].time = time;
    listProduct[productIndex].cartId = cartId;
    listCart[currentUserId].push(listProduct[productIndex]);
  }
  alert("Đã thêm vào giỏ hàng");
  let orderNumberObject = document.getElementById('countOrderCart');
  let currentOrderNumber = parseInt(orderNumberObject.innerText);
  if (currentOrderNumber == NaN) {
    currentOrderNumber = 0;
  }
  orderNumberObject.innerText = currentOrderNumber + 1;
  localStorage.setItem('carts', JSON.stringify(listCart));
}
function findByProductIdWithoutCheckOutId(productId, userCart) {
  return userCart.findIndex(element => element.id == productId && typeof element.checkOutId =="undefined");
}
function renderCart() {
  if (localStorage.getItem('currentPage') == "cart.html") {
    var currentUser = JSON.parse(localStorage.getItem('user'));
    let listCart;
    let checkCartEmpty = true;
    if (currentUser != null) {
      listCart = (JSON.parse(localStorage.getItem('carts')))[currentUser.id];

    } else {
      listCart = (JSON.parse(localStorage.getItem('carts')))[0];
    }
    for (let i = 0; i < listCart.length; i++) {
      if (typeof listCart[i].checkOutId =="undefined") {
        checkCartEmpty = false;
        break;
      }
    }
    let HTML = '';
    let totalCost = 0;
    let subCart = document.getElementsByClassName('sub-cart-container')[0];

    if (listCart.length == 0 || checkCartEmpty) {
      subCart.classList.add('showCart');
      subCart.nextElementSibling.classList.add('hiddenCart');
    } else {
      subCart.classList.remove('showCart');
      subCart.nextElementSibling.classList.remove('hiddenCart');
      listCart.map((x) => {
        if (typeof x.checkOutId=="undefined") {
          HTML += `
              <div class="product">
                <ul class="title-cart">
                  <li class="item">
                    <img src="${x.image}" alt="" />${x.name}
                  </li>
                  <li class="price">${x.price}</li>
                  <li class="qty">
                    <input onchange="changeCount(this)"
                      type="number"
                      min="0"
                      size="2"
                      class="quantity"
                      name="updates[]"
                      id="${x.id}"
                      value="${x.soluong}"
                    />
                  </li>
                  <li class="total">£${((x.price.split('£'))[1] * x.soluong).toFixed(2)}<i onclick="deleteProductFromCart(this)" class="ti-close hover_icon"></i></li>
                  
                </ul>
                <hr>
              </div>`

          totalCost += ((x.price.split('£'))[1] * x.soluong);
        }
      })
    }

    let subTotalObject = document.getElementsByClassName("subtotal-price")[0];
    subTotalObject.firstElementChild.innerText = '£' + totalCost.toFixed(2);
    document.getElementsByClassName('list-product-cart')[0].innerHTML = HTML;
  }

}
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function checkOutCart() {
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let currentCheckOutId;
  if (currentUser == null) {
    document.getElementsByClassName('js-login')[0].click();
  } else {
    let currentUserId = currentUser.id;
    let listCart = JSON.parse(localStorage.getItem('carts'));
    let checkOutIds = JSON.parse(localStorage.getItem('checkOutIds'));
    do {
      currentCheckOutId = getRndInteger(0, 100);
    } while (checkOutIds.findIndex(x => x == currentCheckOutId) >= 0);
    checkOutIds.push(currentCheckOutId);
    localStorage.setItem('checkOutIds',JSON.stringify(checkOutIds));
    listCart[currentUserId].map(x => {
      if (typeof x.status == "undefined") {
        x.status = 'Chờ xác nhận';
        x.checkOutId = currentCheckOutId;
      }
    })
    localStorage.setItem('carts', JSON.stringify(listCart));
    renderCart();
    alert("chờ xác nhận");
  }
  loadNumberProductInCart();
}
function addNoneUserCartToUserCart(id) {
  let userData = JSON.parse(localStorage.getItem('userData'));
  let currentUserIndex = userData.findIndex(x => x.id = id);
  let allCart = JSON.parse(localStorage.getItem('carts'));
  if (allCart[0].length > 0) {
    allCart[0].map(x => {
      if ((duplicateIndex = findByProductIdWithoutCheckOutId(x.id, allCart[id])) != -1) {
        allCart[currentUserIndex][duplicateIndex].soluong += x.soluong;
      } else {
        x.userName = userData[currentUserIndex].name;
        allCart[id].push(x);
      }
    })
    allCart[0] = [];
    localStorage.setItem('carts', JSON.stringify(allCart));
  }
}
function changeCount(object) {
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let currentId;
  if (currentUser != null) {
    currentId = currentUser.id;
  } else {
    currentId = 0;
  }
  let listCart = (JSON.parse(localStorage.getItem('carts')));
  let productCartIndex = listCart[currentId].findIndex(x => x.id == object.getAttribute('id'));
  if (object.value >= 0) {
    let a = 1;
    if (listCart[currentId][productCartIndex].soluong > object.value) {
      a = -1;
    }

    let orderNumberObject = document.getElementById('countOrderCart');
    let currentOrderNumber = parseInt(orderNumberObject.innerText);
    orderNumberObject.innerText = currentOrderNumber + a;
    listCart[currentId][productCartIndex].soluong = object.value;
    let numberPrice = listCart[currentId][productCartIndex].price.split('£')[1];
    localStorage.setItem('carts', JSON.stringify(listCart));
    let changeCost = (numberPrice * object.value);
    object.parentElement.nextElementSibling.innerHTML = '£' + changeCost.toFixed(2) + `<i class="ti-close hover_icon"></i>`;
    let subTotalObject = document.getElementsByClassName("subtotal-price")[0];
    let totalCost = (subTotalObject.firstElementChild.innerText).split('£')[1];
    subTotalObject.firstElementChild.innerText = '£' + (parseFloat(totalCost) + a * numberPrice).toFixed(2);
  } else {
    object.value = parseInt(listCart[currentId][productCartIndex].soluong);
  }

}
function deleteProductFromCart(object) {
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let deleteId = object.parentElement.previousElementSibling.firstElementChild.getAttribute('id');
  let currentId;
  if (currentUser != null) {
    currentId = currentUser.id;
  } else {
    currentId = 0;
  }
  let listCart = (JSON.parse(localStorage.getItem('carts')));
  let productCartIndex = listCart[currentId].findIndex(x => x.id == deleteId);
  let orderNumberObject = document.getElementById('countOrderCart');
  let currentOrderNumber = parseInt(orderNumberObject.innerText);
  orderNumberObject.innerText = currentOrderNumber - parseInt(listCart[currentId][productCartIndex].soluong);
  listCart[currentId].splice(productCartIndex, 1);
  localStorage.setItem('carts', JSON.stringify(listCart));
  redirectPage('cart.html')
}
