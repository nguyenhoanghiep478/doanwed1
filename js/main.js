var index = 1;
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
        if(x.status!='Đã nhận hàng'){
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

function showDivs(k) {
    var i;
    var imgs = ["../slideshow_1.webp", "../slideshow_2.webp", "../slideshow_3.webp"];
    if (k > 2) { index = 1 }
    if (k < 1) { index = 2 }
    for (i = 0; i < 3; i++) {
        document.getElementById("img-slider").src = imgs[i];
    }
    document.getElementById("img-slider").src = imgs[index - 1];
}

function plusDivs(k) {
    showDivs(index += k);
}

function showListSearch() {
}


