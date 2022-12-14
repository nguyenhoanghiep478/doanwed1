document.addEventListener("DOMContentLoaded", loadSearchProduct(1));
function loadSearchProduct(paginationIndex,findArray) {
  let prefixObjectName='';
  if(localStorage.getItem('currentPage')=="search.html"){
    prefixObjectName='search';
  }else{
    prefixObjectName='chocolate';
  }
  let productList = document.getElementsByClassName("container-"+prefixObjectName)[0];
  let products ;
  if(typeof findArray =="undefined"){
    products= JSON.parse(localStorage.getItem("findProduct"))
  }else{
    products=findArray;
  }
  let user = JSON.parse(localStorage.getItem('user'));
  let iconHandle = '';
  let functionHandle = '';
  let startIndex = 0;
  let finalIndex = 0;
  if(user!=null&&user.role==="admin"){
      iconHandle = 'ti-settings icon_hover';
      functionHandle = 'redirectUpdateProduct(this)';
  } else {
    iconHandle = 'ti-shopping-cart-full icon_hover';
    functionHandle = 'addToCart(this);'
  }
  let HTML = `
      <div class="left left-${prefixObjectName}">
        <ul class="list-product">
          <li  onclick="renderProduct('BRANDS',1)" class="title-left title-left-${prefixObjectName} active">BRANDS</li>
          <hr class="left-space" />
          <li class="title-left-${prefixObjectName}" onclick="renderProduct('Consious Chocolate',1)">Consious Chocolate</li>
          <hr class="left-space hidden" />
          <li onclick="renderProduct('Coracao Confections',1)">Coracao Confections</li>
          <hr class="left-space hidden" />
          <li onclick="renderProduct('Element for life',1)">Element for life</li>
          <hr class="left-space hidden" />
          <li onclick="renderProduct('Enjoy',1)">Enjoy</li>
          <hr class="left-space hidden" />
          <li onclick="renderProduct('Forever Cacao',1)">Forever Cacao</li>
          <hr class="left-space hidden" />
          <li onclick="renderProduct('Ombar',1)">Ombar</li>
          <hr class="left-space hidden" />
        </ul>
      </div>

      <div class="right right-search">`


  if (typeof paginationIndex != "undefined") {
    startIndex = 8 * Number(paginationIndex - 1);
    finalIndex = startIndex + 8;
  } else {
    paginationIndex = 1;
  }
  for (var i = startIndex; i < finalIndex; i++) {
    if (typeof products[i] != "undefined") {
      HTML += `<div class="card">
      <div class="card-header" style="position: relative;">
        <img class="img-card" src="${products[i].image}" alt="Sr error !" />
        <ul class="product_hover">
          <li>
            <a href="${products[i].image}">
              <span class="ti-arrows-corner icon_hover" style="color: white;"></span>
            </a>
          </li>
          <li>
            <a class="btn-addto-cart">
              <span onclick="openQuickShop(${products[i].id})" class="ti-eye icon_hover" style="color:white;"></span>
            </a>
          </li>
          <li>
            <a class="btn-addto-cart">
                <span id="${products[i].id}" onclick="${functionHandle}" class="${iconHandle}"></span>
            </a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div class="card-reviews">
          <i class="ti-star"></i>
          <i class="ti-star"></i>
          <i class="ti-star"></i>
          <i class="ti-star"></i>
          <i class="ti-star"></i>
          <p class="status-review">review</p>
        </div>
        <div class="card-infor">
          <span class="infor-name">
           ${products[i].name}
          </span>
          <span class="infor-price">${products[i].price}</span>
        </div>
      </div>
    </div>`
    } else {
      break;
    }
  }
  let numberPagination = 0;
  if (products.length % 8 == 0) {
    numberPagination = parseInt(products.length / 8);
  } else {
    numberPagination = parseInt(products.length / 8) + 1;
  }
  HTML += `<div class="pagination-container">`
  HTML += `<ul class="pagination-list">`
  if (parseInt(paginationIndex) > 1) {
    HTML += ` <li onclick=loadSearchProduct(${paginationIndex - 1}) class="pagination"><a  href="#"><<</a></li>`;
  }
  for (let i = 1; i <= numberPagination; i++) {
    if (i == parseInt(paginationIndex)) {
      HTML += `<li  class="pagination"><a class="pagination-active" onclick="loadSearchProduct(this.innerText)" href="#">${i}</a></li>`
    } else {
      HTML += `<li  class="pagination"><a onclick="loadSearchProduct(this.innerText)" href="#">${i}</a></li>`
    }
  }
  if (parseInt(paginationIndex) < numberPagination) {
    HTML += ` <li onclick=loadSearchProduct(${parseInt(paginationIndex)+1}) class="pagination"><a  href="#">>></a></li>`;
  }
  HTML += `</ul>`
  HTML += `</div>`
  HTML += "</div>";
  productList.innerHTML = HTML;
  window.scrollTo(0,200);
}


