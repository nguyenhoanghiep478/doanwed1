window.onload=setDefaultUser();
window.onload=getSession();
window.onload=setCurrentPage();
function setCurrentPage(){
    localStorage.setItem('currentPage','index.html');
}
function setDefaultUser(){
    let carts=[[]];
    if(localStorage.getItem("userData")==null){
        let userData=[
            {   
                "id":'1',
                "user":"hiep",
                "password":"1",
                "name":"Nguyễn Hoàng Hiệp",
                "email":"nguyenhoanghiep478@gmail.com",
                "Địa chỉ":"Sgu",
                "phone":'0965478891',
                "sex":"nam",
                "Tôn giáo":'Phật giáo',
                "status":"working",
                "role":"user"
            },  
            {
                "user":"admin",
                "password":"1",
                "name":"admin",
                "email":"nguyenhoanghiep478@gmail.com",
                "date":"31/08/2003",
                "phone":'0326991379',
                "sex":"nam",
                "role":"admin",
                "status":"working"
            }
        ];
        carts[1]=[];
        localStorage.setItem("carts",JSON.stringify(carts));
        localStorage.setItem("userData",JSON.stringify(userData));
    }
}
function logOut(){
    localStorage.removeItem("user")
    window.location="index.html"
}

const loginbtn = document.querySelector(".js-login");
const modal = document.querySelector(".js-modal");
const modalformlogin = document.querySelector(".js-modal-login");
const modalformsingup = document.querySelector(".js-modal-singup")
const modalclose = document.querySelectorAll(".js-modal-close");
const nextLink = document.querySelector(".nextLine");
const turnBack = document.querySelector(".modal-turn-back");
loginbtn.onclick = () => {
    modalformlogin.style.display="block";
    modalformsingup.style.display="none";
}
nextLink.addEventListener("click",() => {
    modalformlogin.style.display = "none";
    modalformsingup.style.display = "block";
})

turnBack.addEventListener("click",()=>{
    modalformlogin.style.display="block";
    modalformsingup.style.display="none";
})

loginbtn.addEventListener("click",()=>{
    if(localStorage.getItem('user')===null){
        modal.classList.add("open");
    }else {
        window.location="profile.html"
    }
})

modal.addEventListener("click",()=>{
    modal.classList.remove("open");
})

modalclose.forEach((item)=>{
    item.onclick = function() {
        modal.classList.remove("open");
    }
})

modalformlogin.addEventListener("click",(e)=>{
    e.stopPropagation();
})

modalformsingup.addEventListener("click",(e)=>{
    e.stopPropagation();
})

const overplaynotify = document.querySelector('.overplay-notify')
const loginEmail = document.getElementById('modal-email');
const loginPassword = document.getElementById('modal-password');

function openFormLogin ()
{
    loginbtn.onclick = function() {
        if(localStorage.getItem('user')===null){
            const arr = JSON.parse(localStorage.getItem('account'));
            if(arr[0].isAdmin == false && arr[0].isUser == false) {
            modalformsingup.style.display = 'none';
            modalformlogin.style.display = 'block';
            modal.classList.add('open');
        }
     }
    }
}
function showPassword(){
    let passwordInput=document.getElementById("modal-password");
    if(passwordInput.getAttribute("type")=="password"){
        passwordInput.setAttribute("type","text");
    }else{
        passwordInput.setAttribute("type","password");
    }
}
function showPasswordSignUp(){
    let passwordInput=document.getElementById("modal-password-signup");
    if(passwordInput.getAttribute("type")=="password"){
        passwordInput.setAttribute("type","text");
    }else{
        passwordInput.setAttribute("type","password");
    }
}
function checkLogin(){
    let user = document.getElementById("modal-email").value;
    let password=document.getElementById("modal-password").value;
    let passwordInput=document.getElementById("modal-password");
    let userData=JSON.parse(localStorage.getItem("userData"));
    let flag = false;
    if(user!==''&&password!==''){
        for(let i=0;i<userData.length;i++){
            if(userData[i].user===user&&userData[i].password===password){
                if(userData[i].status=="working") {
                    localStorage.setItem("user",JSON.stringify(userData[i]));
                    if(userData[i].role==="user"){
                        addNoneUserCartToUserCart(userData[i].id);
                        window.location="index.html";

                    }else if(userData[i].role==="admin"){
                        window.location="settings.html";
                    }
                }
                else
                    alert("Tài khoản này đã bị khóa"); 
            }
        }
        if(localStorage.getItem("user")===null){
            passwordInput.value='';
            let messageLogin=document.getElementById("messageLogin");
            let message="<span class='warning-alert' style='margin-left:40%;margin-bottom:20px' > <strong>Your user or password incorrect</strong> </span>";
            messageLogin.innerHTML=message;
        }
    }
    
}
function messageAlert(messageAlert){
    let message="<span class='warning-alert' style='margin-left:145px' > <strong>"+messageAlert+"</strong> </span>";
    return message;
}
function isCorrect(username,name,date,sex,email,password){
    let check = true;
    if(username.value===''){
        let userNof=document.getElementById("userNofication");
        userNof.innerHTML=messageAlert("user name can't empty");
        check=false;
    }
    if(name.value===''){
        let nameNof=document.getElementById("nameNofication");
        nameNof.innerHTML=messageAlert("full name can't empty");
        check=false;
    }
    if(date.value===''){
        let dateNof=document.getElementById("dateNofication");
        dateNof.innerHTML=messageAlert("date can't empty");
        check=false;
    }
    if(email.value===''){
        let emailNof=document.getElementById("emailNofication");
        emailNof.innerHTML=messageAlert("email can't empty");
        check=false;
    }
    // let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let regex = new RegExp('[a-z0-9]+@gmail.com');
    if (!(regex.test(email.value))){
        let emailNof=document.getElementById("emailNofication");
        emailNof.innerHTML=messageAlert("email is invalid");
        check=false;
    }
    if(password.value===''){
        let passwordNof=document.getElementById("passwordNofication");
        passwordNof.innerHTML=messageAlert("password can't empty");
        check=false;
    }
    return check;

}
function Register(){
    let username=document.getElementById("modal-username-signup");
    let name=document.getElementById("modal-name");
    let date=document.getElementById("modal-date");
    let sex=document.getElementById("modal-sex");
    let email=document.getElementById("modal-email-signup");
    let password=document.getElementById("modal-password-signup")
    if(isCorrect(username,name,date,sex,email,password)){
        let userData=JSON.parse(localStorage.getItem("userData"));
        let role;
        let id=userData.length;
        if((username.value).includes("admin"))role="admin";
        else role="user";
        userData.push({
            "id":id,
            "user":username.value,
            "name":name.value,
            "date":date.value,
            "sex":sex.value,
            "email":email.value,
            "password":password.value,
            "role":role,
            "status":"working"
        })
        let carts=JSON.parse(localStorage.getItem("carts"));
        carts[parseInt(id)] = [];
        localStorage.setItem('carts',JSON.stringify(carts));
        localStorage.setItem("userData",JSON.stringify(userData));
        window.location="index.html";
    };
}
function redirectPage(page){
    document.getElementById(localStorage.getItem('currentPage')).classList.add('hiddenPage');
    document.getElementById(page).classList.remove('hiddenPage');
    localStorage.setItem('currentPage',page);
    if(page=="cart.html"){
        renderCart();
    }else if(page=="search.html"){
        loadSearchProduct()
    }
    window.scrollTo(0,0); 
}
function getSession(){
    let user;
    if((user=JSON.parse(localStorage.getItem("user")))!==null){
        let login_href=document.getElementById("login-href");
        login_href.innerText="Hello,"+ JSON.parse(localStorage.getItem("user")).name;
        let list=document.getElementById("contact-list");
        let item=document.createElement("li");
        let item2=document.createElement("li");
        if(user.role==="admin"){
            let childs=list.childNodes;
            list.removeChild(childs[3]);
            childs=list.childNodes;
            list.removeChild(childs[4]);
            item2.innerHTML="Admin Page";
            item2.setAttribute('onclick',"redirectAdminPage('settings.html')");
            item2.setAttribute("cursor","pointer");
            list.appendChild(item2);
        }
        item.innerHTML="LOG OUT";
        item.setAttribute("onclick","logOut()");
        item.setAttribute("cursor","pointer");
        list.appendChild(item);
    }
}