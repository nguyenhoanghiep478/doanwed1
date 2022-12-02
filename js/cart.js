window.onload = renderCart();
function addToCart(product) {
  let currentDate = new Date();
  let time = currentDate.getHours() + ":" + currentDate.getMinutes() + " " + currentDate.getDate() + "/" + Number(currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
  let cartId = Math.random();
  let duplicateIndex;
  let listCart = JSON.parse(localStorage.getItem('carts'));
  let currentUser = JSON.parse(localStorage.getItem('user'));
  let currentUserId = currentUser.id;
  let listProduct = JSON.parse(localStorage.getItem('products'));
  let productId = product.getAttribute('id');
  let productIndex = listProduct.findIndex(element => element.id == productId);
  console.log(productIndex)
  if ((duplicateIndex = findByProductId(productId, listCart[currentUserId])) != -1) {
    listCart[currentUserId][duplicateIndex].soluong += 1;
  } else {
    listProduct[productIndex].userName = currentUser.name;
    listProduct[productIndex].soluong = 1;
    listProduct[productIndex].time = time;
    listProduct[productIndex].status = "chờ xác nhận";
    listProduct[productIndex].cartId = cartId;
    listCart[currentUserId].push(listProduct[productIndex]);
  }
  localStorage.setItem('carts', JSON.stringify(listCart));
}
function findByProductId(productId, userCart) {
  return userCart.findIndex(element => element.id == productId);
}
function renderCart() {
  if (localStorage.getItem('currentPage') == "cart.html") {
    let currentId = JSON.parse(localStorage.getItem('user')).id;
    let listCart = (JSON.parse(localStorage.getItem('carts')))[currentId];
    let HTML = '';
    let totalCost = 0;
    let subCart = document.getElementsByClassName('sub-cart-container')[0];

    if (listCart.length == 0) {
      subCart.classList.add('showCart');
      subCart.nextElementSibling.classList.add('hiddenCart');
    } else {
      subCart.classList.remove('showCart');
      subCart.nextElementSibling.classList.remove('hiddenCart');
      listCart.map((x) => {
        if (x.status != "Đã nhận hàng") {
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
function changeCount(object) {
  let currentId = JSON.parse(localStorage.getItem('user')).id;
  let listCart = (JSON.parse(localStorage.getItem('carts')));
  let productCartIndex = listCart[currentId].findIndex(x => x.id == object.getAttribute('id'));
  let a = 1;
  if (listCart[currentId][productCartIndex].soluong > object.value) {
    a = -1;
  }
  listCart[currentId][productCartIndex].soluong = object.value;
  let numberPrice = listCart[currentId][productCartIndex].price.split('£')[1];
  localStorage.setItem('carts', JSON.stringify(listCart));
  let changeCost = (numberPrice * object.value);
  object.parentElement.nextElementSibling.innerHTML = '£' + changeCost.toFixed(2) + `<i class="ti-close hover_icon"></i>`;
  let subTotalObject = document.getElementsByClassName("subtotal-price")[0];
  let totalCost = (subTotalObject.firstElementChild.innerText).split('£')[1];
  subTotalObject.firstElementChild.innerText = '£' + (parseFloat(totalCost) + a * numberPrice).toFixed(2);
}
function deleteProductFromCart(object) {
  let deleteId = object.parentElement.previousElementSibling.firstElementChild.getAttribute('id');
  let currentId = JSON.parse(localStorage.getItem('user')).id;
  let listCart = (JSON.parse(localStorage.getItem('carts')));
  let productCartIndex = listCart[currentId].findIndex(x => x.id == deleteId);
  listCart[currentId].splice(productCartIndex, 1);
  localStorage.setItem('carts', JSON.stringify(listCart));
  window.location = "cart.html";
}
