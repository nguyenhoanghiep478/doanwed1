const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("#header");
btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
});

var index = 0;
var i = 1;
// window.onload(function(){
//     if(sessionStorage.getItem("username")!==null){
//         let login_href=document.getElementById("login-href");
//         login_href.innerText=sessionStorage.getItem("username");
//     }
// })
window.onload = loadCheckOutId();
window.onload = loadNumberProductInCart();
function closeQuickShop(object) {
    let quickShopObject = object.parentElement.parentElement;
    quickShopObject.classList.add('hiddenPage');
}
function openQuickShop(id) {
    let quickShop = document.getElementsByClassName('quick-shop')[0];
    let products = getLocalStorage('products');
    quickShop.classList.remove('hiddenPage');
    let inforProduct = document.getElementsByClassName('inforProduct');
    let productIndex = products.findIndex(x => x.id == id);
    let HTML = `<div class="container-quick-shop">
 <div onclick="closeQuickShop(this)" class=" btn-close-quick-shop">
     <i class="ti-close"></i>
 </div>
 <img src="${products[productIndex].image}"
     alt="" class="inforProduct img-quick-shop">
 <div class="content-quick-shop">
     <p class= " inforProduct title">
        ${products[productIndex].name}</p>
     <hr>
     <p class="inforProduct price">${products[productIndex].price}</p>
     <p class="inforProduct quantity">Quantity</p>
     <div class="quick-cart inforProduct">
         <input  type="number" class="amountProduct" value="1" min="0">
         <button id=${id} onclick="quickShopAdd(this)" type="submit" class="btn-submit inforProduct"><span class="text">add to cart</span></button>
     </div>
     <hr>
     <p class="recommend-product inforProduct">These sophisticated award winning truffles from Booja Booja are made with
         pure Ecuadorian 100% dark chocolate which delivers an unadulterated, intense, and decadent flavour.
     </p>
     <p class="capicity inforProduct">Nutrition Information (Per Unit): Energy 1709kj (411kcal), Fat 34.5g, of which
         saturates 24.2g, Carbohydrates 14.5g, of which sugars 8.9g, Protein 4.1g, Salt 0g.</p>
 </div>
</div>`
quickShop.innerHTML=HTML;
}
function loadNumberProductInCart() {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    let currentUserId;
    if (currentUser != null) {
        currentUserId = currentUser.id;
    } else {
        currentUserId = 0;
    }
    let listCart = JSON.parse(localStorage.getItem('carts'))[currentUserId];
    let totalProductInCart = 0;
    listCart.map(x => {
        if (typeof x.checkOutId == "undefined") {
            totalProductInCart += parseInt(x.soluong);
        }
    })
    document.getElementById('countOrderCart').innerText = totalProductInCart;
}
function loadCheckOutId() {
    let checkOutCartIds = new Array();
    if (localStorage.getItem('checkOutIds') == null) {
        localStorage.setItem('checkOutIds', JSON.stringify(checkOutCartIds));
    }
}
function changeimg() {
    var imgs = ["../slideshow_1.webp", "../slideshow_2.webp", "../slideshow_3.webp"];
    document.getElementById("img-slider").src = imgs[index];
    index++;
    if (index == 3) {
        index = 0;
    }
}
setInterval(changeimg, 2000);

function showDiv(k) {
    var imgs = ["../slideshow_1.webp", "../slideshow_2.webp", "../slideshow_3.webp"];
    document.getElementById("img-slider").src = imgs[k - 1];
}

function next() {
    var imgs = ["/access/img/slideshow_1.webp", "/access/img/slideshow_2.webp", "/access/img/slideshow_3.webp"];
    index++;
    if (index >= imgs.length) {
        index = 0;
    }
    document.getElementById("img-slider").src = imgs[index];
}

function prev() {
    var imgs = ["/access/img/slideshow_1.web", "/access/img/slideshow_2.web", "/access/img/slideshow_3.web"];
    index--;
    if (index < 0) {
        index = imgs.length - 1;
    }
    document.getElementById("img-slider").src = imgs[index];
}

function showListSearch() {
}
