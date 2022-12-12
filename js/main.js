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
window.onload=loadCheckOutId();
window.onload = loadNumberProductInCart();
function loadNumberProductInCart(){
    let currentUser=JSON.parse(localStorage.getItem('user'));
    let currentUserId;
    if(currentUser!=null){
        currentUserId=currentUser.id;
    }else{
        currentUserId=0;
    }
    let listCart=JSON.parse(localStorage.getItem('carts'))[currentUserId];
    let totalProductInCart=0;
    listCart.map(x=>{
        if(typeof x.checkOutId =="undefined"){
            totalProductInCart+=parseInt(x.soluong);
        }
    })
    document.getElementById('countOrderCart').innerText=totalProductInCart;
}
function loadCheckOutId(){
    let checkOutCartIds=new Array();
    if(localStorage.getItem('checkOutIds')==null){
        localStorage.setItem('checkOutIds',JSON.stringify(checkOutCartIds));
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

function next ()
{
    var imgs = ["/access/img/slideshow_1.webp","/access/img/slideshow_2.webp","/access/img/slideshow_3.webp"];
    index++;
    if (index >= imgs.length)
    {
        index = 0;
    }
    document.getElementById("img-slider").src = imgs[index];
}

function prev () {
    var imgs = ["/access/img/slideshow_1.web","/access/img/slideshow_2.web","/access/img/slideshow_3.web"];
    index--;
    if (index < 0)
    {
        index = imgs.length - 1;
    }
    document.getElementById("img-slider").src = imgs[index];
}

function showListSearch() {
}
