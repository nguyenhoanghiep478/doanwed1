// Lựa chọn các item trên nav-item
const navItems = document.querySelectorAll('.nav-item');
const sectionItems = document.querySelectorAll('.section > div');

navItems.forEach(function (navItem, index) {
    navItem.onclick = function () {
        document.querySelector('.nav-item.active').classList.remove('active');
        navItem.classList.add('active');
        sectionItems.forEach(function (sectionItem) {
            sectionItem.style.display = 'none';
        })

        switch (index) {
            case 0:
                window.location = "index.html";
                break;
            case 1:
                document.querySelector('.section__product').style.display = "block";
                break;
            case 2:
                document.querySelector('.section__order').style.display = "block";
                break;
            case 3:
                document.querySelector('.section__customer').style.display = "block";
                renderUserData();
                break;
            case 4:
                window.location.pathname = '/html/index.html';
                break;
        }
    }
})

if (sessionStorage.getItem('action') !== null) {
    let index = sessionStorage.getItem('action');
    sessionStorage.removeItem('action');
    navItems[index].click();
} else {
    navItems[1].click();
}
function updateProduct(product){                    
    let id=product.getAttribute('id');
    let settingProduct={};
    let categories=JSON.parse(localStorage.getItem('categories'));
    let products=JSON.parse(localStorage.getItem('products'));
    for(let i =0;i<products.length;i++){
        if(id===products[i].id){
            settingProduct=products[i];
            break;
        }  
    }
    let HTML=`<table> <tbody>`
    
    
    HTML+=`<tr>
    <td style="width: 5%">${settingProduct.id}</td>
    <td style="width: 10%">
    <select name id="categories" >
        `
        for(let i=0;i<categories.length;i++){
            if(categories[i]===settingProduct.category){
                HTML+=`<option selected value="${categories[i]}">${categories[i]}</option>`
            }else{
                HTML+=`<option value="${categories[i]}">${categories[i]}</option>`
            }
        }
    HTML+=
        `
    </select>
    
    </td>
    <td style="width: 40%" class="fa__left"><input type="text" value="${settingProduct.name}"></td>
    <td style="width: 15%"><input type="text" value="${settingProduct.price}"></td>
    <td style="width: 15%"><img src="${settingProduct.image}" style="max-width:80px"></td>
    <td style="width: 15%">
        <div  class="tooltip update" onclick="saveChange(${settingProduct.id})">
            <i class="ti-check"></i>
            <span class="tooltiptext">Sửa</span>
        </div>
        <div class="tooltip delete" onclick="deleteProduct(${settingProduct.id})">
            <i class="fa fa-trash"></i>  
            <span class="tooltiptext">Xóa</span>
        </div>
    </td>
    </tr>`
    HTML += `</tbody> <table>`;
    document.getElementById('table-product').innerHTML = HTML;
}
function saveChange(id){
    let inputs= document.getElementsByTagName('input');
    let selectValue=document.getElementById("categories").value;
    let listProduct=JSON.parse(localStorage.getItem('products'));
    for(let i =0;i<listProduct.length;i++){
        if(listProduct[i].id===id+""){
            listProduct[i].category=selectValue;
            listProduct[i].name=inputs[0].value;
            listProduct[i].price=inputs[1].value;
            break;
        }
    }
    localStorage.setItem('products',JSON.stringify(listProduct));
    window.location="settings.html";
}
// In sản phẩm ra Table
function showProduct() {
    const arr = JSON.parse(localStorage.getItem('products'));
    if (arr === null) {
        return;
    }
    // console.log(arr);
    var htmls = '<table>';
    let temp = 1;
    for (let i = 0; i < arr.length; i++) {

        // console.log(arr[i][j].name);
        htmls += `
        <tr>
        <td style="width: 5%">${arr[i].id}</td>
        <td style="width: 10%">${arr[i].category}</td>
        <td style="width: 40%" class="fa__left">${arr[i].name}</td>
        <td style="width: 15%">${arr[i].price}</td>
        <td style="width: 15%"><img src="${arr[i].image} " style="max-width:80px""></td>
        <td style="width: 15%">
        <div id="${arr[i].id}" class="tooltip update" onclick="updateProduct(this)">
                <i class="fa fa-wrench"></i>
                <span class="tooltiptext" >Sửa</span>
            </div>
            <div class="tooltip delete" onclick="deleteProduct(${i})">
                <i class="fa fa-trash"></i>  
                <span class="tooltiptext">Xóa</span>
            </div>
        </td>
        </tr>`

    }
    htmls += '</table>';
    document.getElementById('table-product').innerHTML = htmls;
    localStorage.setItem("products", JSON.stringify(arr));
}



showProduct();

// Xử lý thêm sản phẩm
const addProductBtn = document.getElementById('add-product');
const overlayProduct = document.querySelector('.overlay.product');
const confirmAdd = document.getElementById('add-btn');
const indexType = document.querySelector('.overlay.product select');
const nameProduct = document.querySelector('.overlay.product input.name');
const imgProduct = document.querySelector('.overlay.product input[type="file"]');
const priceProduct = document.querySelector('.overlay.product input.price');
const notify = document.querySelector('.notify');
const typeProduct = document.getElementById('typeProduct');;

function addProduct() {
    addProductBtn.addEventListener('click', function () {
        overlayProduct.style.transform = 'scale(1)';
    })

    confirmAdd.onclick = function () {
        const arr = JSON.parse(localStorage.getItem('product'));
        const img = imgProduct.value;
        const imgArr = img.split(/\/|\\/g)
        const imgDir = "../access/img/" + imgArr[imgArr.length - 1]
        const type = typeProduct.selectedOptions[0].text;
        const name = nameProduct.value;
        const price = priceProduct.value

        if (img != "" && name != "" && price != "") {
            arr[indexType.value].push({
                type: type,
                image: imgDir,
                name: name,
                price: price
            })

            localStorage.setItem("product", JSON.stringify(arr));

            setTimeout(function () {
                notify.classList.add('success');
                notify.innerHTML = `<i class="fa-solid fa-circle-check"></i>
                Thêm sản phẩm thành công`;
                notify.style.opacity = '1';
            }, 200)

            setTimeout(function () {
                notify.style.opacity = '0';
            }, 1200)

            setTimeout(function () {
                overlayProduct.style.transform = 'scale(0)';
            }, 1300)

            showProduct();
            imgProduct.value = "";
            nameProduct.value = "";
            priceProduct.value = "";
        }
        else {
            setTimeout(function () {
                notify.classList.add('error');
                notify.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>
                                Chưa điền đủ thông tin sản phẩm`;
                notify.style.opacity = '1';
            }, 200)

            setTimeout(function () {
                notify.style.opacity = '0';
            }, 1200)
        }
        notify.classList.remove('error');
        notify.classList.remove('success');
        notify.innerHTML = '';
    }

}

addProduct();

// Xử lý xóa sản phẩm
const notifyDelete = document.querySelector('.notify__delete');

function deleteProduct(i, j) {
    notifyDelete.innerHTML = `<div class="notify__delete-text">
                Bạn có chắc sẽ xóa sản phẩm này không?
            </div>
            <div class="notify__delete-btn">
                <div class="notify__delete-ok">
                    OK
                </div>
                <div class="notify__delete-cancel">
                    Hủy
                </div>
            </div>`

    setTimeout(function () {
        notifyDelete.style.transform = 'translate(-50%, 0)';
        notifyDelete.style.opacity = '1';
        document.querySelector('.notify__delete-ok').onclick = function () {
            const arr = JSON.parse(localStorage.getItem('product'));
            notifyDelete.style.transform = 'translate(-50%, -270%)';
            notifyDelete.style.opacity = '0';

            arr[i].splice(j, 1);

            localStorage.setItem("product", JSON.stringify(arr));
            showProduct();
        }
        document.querySelector('.notify__delete-cancel').onclick = function () {
            notifyDelete.style.transform = 'translate(-50%, -270%)';
            notifyDelete.style.opacity = '0';
        }
    }, 200)

}

// Xử lý sửa sản phẩm
function editProduct(i, j) {

}

function redirectPage(page) {
    window.location = page;
}
function renderUserData() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let temp = 1;
    let imageName = '';
    let HTML = `<table> <tbody>`;
    
    for (var i = 0; i < userData.length; i++) {
        if (userData[i].role !== "admin") {
            if (userData[i].status === "working") {
                imageName = 'greenpoint.png';
            } else {
                imageName = 'redpoint.png';
            }
            HTML +=
                `
            <tr>
            <td style="width: 5%;border:1px solid">${temp++}</td>
            <td style="width: 15%;border:1px solid">${userData[i].name}</td>
            <td style="width: 20%;border:1px solid" class="fa__left">${userData[i].email}</td>
            <td style="width: 20%;border:1px solid">${userData[i].user}</td>
            <td style="width: 10%;border:1px solid">${userData[i].password}</td>
            <td style="width: 10%;border:1px solid">
               <img src="../image/`+ imageName + `" style="max-width:10px">  ${userData[i].status}
            <div class="tooltip removeUser delete" onclick="deleteUser('${userData[i].user}')">
                <i class="fa fa-trash margin-2px"></i>  
                <span class="tooltiptext">Xóa</span>
            </div>
            </td>
            </tr>
        `
        }
    }
    HTML += `</tbody> <table>`;
    document.getElementById('table-customer').innerHTML = HTML;

}
function deleteUser(user) {
    let notifyDeleteCustomer=document.getElementsByClassName('notify__delete_customer')[0];
    notifyDeleteCustomer.innerHTML = `<div class="notify__delete_customer-text">
                Bạn có chắc sẽ xóa người dùng này không?
            </div>
            <div class="notify__delete_customer-btn">
                <div class="notify__delete_customer-ok">
                    OK
                </div>
                <div class="notify__delete_customer-cancel">
                    Hủy
                </div>
            </div>`
    setTimeout(function () {
        notifyDeleteCustomer.style.transform = 'translate(-50%, 0)';
        notifyDeleteCustomer.style.opacity = '1';
        document.querySelector('.notify__delete_customer-ok').onclick = function () {
            let userData = JSON.parse(localStorage.getItem("userData"));
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].user === user) {
                    userData.splice(i, 1);
                }
            }
            localStorage.setItem('userData', JSON.stringify(userData));
            sessionStorage.setItem("action", "3");
            window.location = "settings.html";
        }
        document.querySelector('.notify__delete_customer-cancel').onclick = function () {
            notifyDelete.style.transform = 'translate(-50%, -270%)';
            notifyDelete.style.opacity = '0';
        }
    }, 200)
    
}
function openThemNguoiDung() {
    sessionStorage.setItem('isRegister', "true");
    window.location = "adminRegister.html"
}

/*function timSanPham() {
    const arr = JSON.parse(localStorage.getItem('product'))
    var list = [];
    var x = `
    <tr>
    <th title="Sắp xếp" style="width: 5%"">Stt</th>
    <th title="Sắp xếp" style="width: 10%"">Mã</th>
    <th title="Sắp xếp" style="width: 40%"">Tên</th>
    <th title="Sắp xếp" style="width: 15%"">Giá</th>
    <th title="Sắp xếp" style="width: 15%"">Hình Ảnh</th>
    <th style="width: 15%">Hành động</th>
    </tr>
    `
    let temp = 0;
    let temp2 = 0;
    let temp3 = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (val == arr[i][j].name) {
                list.push(arr[i][j]);
                alert(list)
            }
        }
    }
    for (let i = 0; i < list.length; i++) {
        x += `<tr>
        <td>${temp++}</td>
        <td>${temp2++}</td>
        <td class="fa__left">${list[i].name}</td>
        <td>${list[i].price}</td>
        <td><img src="$list[i].image}"></td>
        <td>${temp3++}</td>
        </tr>`
    }
    document.getElementById('test').innerHTML = x;
}*/


