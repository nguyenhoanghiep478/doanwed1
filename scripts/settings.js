
window.onload = () => {
    if (localStorage.getItem('redirectAction') === "updateProduct") {
        let id = JSON.parse(localStorage.getItem('redirectParameter'));
        document.getElementById(id + "").click();
        localStorage.removeItem('redirectParameter');
        localStorage.removeItem('redirectAction');
    }
}
// window.onload = thongKe();

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
                document.querySelector('.section__stats').style.display = "flex";
                window.onload = thongKe();
                break;
            case 1:
                document.querySelector('.section__product').style.display = "block";
                break;
            case 2:
                document.querySelector('.section__order').style.display = "block";
                renderAdminCart();
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
function updateProduct(product) {
    let id = product.getAttribute('id');
    let settingProduct = {};
    let categories = JSON.parse(localStorage.getItem('categories'));
    let products = JSON.parse(localStorage.getItem('products'));
    for (let i = 0; i < products.length; i++) {
        if (id === products[i].id) {
            settingProduct = products[i];
            break;
        }
    }
    let HTML = `<table> <tbody>`


    HTML += `<tr>
    <td style="width: 5%">${settingProduct.id}</td>
    <td style="width: 10%">
    <select name id="categories" >
        `
    for (let i = 0; i < categories.length; i++) {
        if (categories[i] === settingProduct.category) {
            HTML += `<option selected value="${categories[i]}">${categories[i]}</option>`
        } else {
            HTML += `<option value="${categories[i]}">${categories[i]}</option>`
        }
    }
    HTML +=
        `
    </select>
    
    </td>
    <td style="width: 40%" class="fa__left"><input type="text" value="${settingProduct.name}"></td>
    <td style="width: 15%"><input type="text" value="${settingProduct.price}"></td>
    <td style="width: 15%"><input type="file"></td>
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
function saveChange(id) {
    let inputs = document.getElementsByTagName('input');
    let selectValue = document.getElementById("categories").value;
    let listProduct = JSON.parse(localStorage.getItem('products'));
    for (let i = 0; i < listProduct.length; i++) {
        if (listProduct[i].id == id) {
            listProduct[i].category = selectValue;
            listProduct[i].name = inputs[0].value;
            const imgArr = inputs[2].value.split(/\/|\\/g)
            const imgDir = "../access/img/" + imgArr[imgArr.length - 1]
            listProduct[i].price = inputs[1].value;
            listProduct[i].image = imgDir;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(listProduct));
    window.location = "settings.html";
}

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
        <td style="width: 15%"><img src="${arr[i].image}" style="max-width:80px""></td>
        <td style="width: 15%">
        <div id="${arr[i].id}" class="tooltip update" onclick="updateProduct(this)">
                <i class="fa fa-wrench"></i>
                <span class="tooltiptext" >Sửa</span>
            </div>
            <div class="tooltip delete" onclick="deleteProduct(${arr[i].id})">
                <i class="fa fa-trash"></i>  
                <span class="tooltiptext">Xóa</span>
            </div>
        </td>
        </tr>`

    }
    htmls += '</table>';
    document.getElementById('table-product').innerHTML = htmls;
    setLocalStorage('products', arr);
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
        const arr = JSON.parse(localStorage.getItem('products'));
        const img = imgProduct.value;
        const imgArr = img.split(/\/|\\/g)
        const imgDir = "../access/img/" + imgArr[imgArr.length - 1]
        const type = typeProduct.selectedOptions[0].text;
        const name = nameProduct.value;
        const price = '£' + priceProduct.value
        const id = 1 + parseInt(arr[arr.length - 1].id);
        const category = type;
        if (img != "" && name != "" && price != "") {
            arr.push({
                category: category,
                image: imgDir,
                name: name,
                price: price,
                id: id,
            })

            setLocalStorage('products', arr);

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

function deleteProduct(id) {
    window.scrollTo(0, 0);
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

            const arr = JSON.parse(localStorage.getItem('products'));
            notifyDelete.style.transform = 'translate(-50%, -270%)';
            notifyDelete.style.opacity = '0';

            let deleteIndex = arr.findIndex(x => x.id == id);
            arr.splice(deleteIndex, 1);
            localStorage.setItem("products", JSON.stringify(arr));
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
function getSubTotal() {
    let listCart = getLocalStorage('carts');
    let listSoldOut = Array(7).fill(0);
    for (let j = 1; j < listCart.length; j++) {
        for (let i = 0; i < listCart[j].length; i++) {
            if (listCart[j][i].status == "Đã nhận hàng") {
                switch (listCart[j][i].category) {
                    case "Consious Chocolate": {
                        listSoldOut[0] += parseFloat(listCart[j][i].price.split('£')[1]) * listCart[j][i].soluong;
                        break;
                    }
                    case "Coracao Confections": {
                        listSoldOut[1] += parseFloat(listCart[j][i].price.split('£')[1]) * listCart[j][i].soluong;
                        break;
                    }
                    case "Element for life": {
                        listSoldOut[2] += parseFloat(listCart[j][i].price.split('£')[1]) * listCart[j][i].soluong;
                        break;
                    }
                    case "BRANDS": {
                        listSoldOut[6] += parseFloat(listCart[j][i].price.split('£')[1]) * listCart[j][i].soluong;
                        break;
                    }
                    case "Enjoy": {
                        listSoldOut[3] += parseFloat(listCart[j][i].price.split('£')[1]) * listCart[j][i].soluong;
                        break;
                    }
                    case "Forever Cacao": {
                        listSoldOut[4] += parseFloat(listCart[j][i].price.split('£')[1]) * listCart[j][i].soluong;
                        break;
                    }
                    case "Ombar": {
                        listSoldOut[5] += parseFloat(listCart[j][i].price.split('£')[1]);
                        break;
                    }
                }
            }
        }
    }
    for (let i = 0; i < 7; i++) {
        listSoldOut[i] = listSoldOut[i].toFixed(2);
    }
    return listSoldOut;
}
function getCheckOutArray() {
    let checkOutIds = getLocalStorage('checkOutIds');
    let listCart = getLocalStorage('carts');
    let checkOuts = Array(checkOutIds.length);
    for (let i = 0; i < checkOutIds.length; i++) {
        checkOuts[i] = [];
    }
    for (let i = 0; i < listCart.length; i++) {
        for (let j = 0; j < listCart[i].length; j++) {
            for (let k = 0; k < checkOutIds.length; k++) {
                if (checkOutIds[k] == listCart[i][j].checkOutId) {
                    checkOuts[k].push(listCart[i][j]);
                    break;
                }
            }
        }
    }
    return checkOuts;
}
function getLocalStorage(localName) {
    return JSON.parse(localStorage.getItem(localName));
}
function setLocalStorage(localName, localValue) {
    localStorage.setItem(localName, JSON.stringify(localValue));
}
function renderAdminCart(paginationIndex) {
    let temp = 1;
    let checkOuts = getCheckOutArray();
    let HTML = `<table> <tbody>`;
    let actionHTML = '';
    let rowSpanHTML = ``;
    let imageName = '';
    let adminStatus = '';
    let listCart = JSON.parse(localStorage.getItem('carts'));
    for (let i = 0; i < listCart.length; i++) {
        if(typeof checkOuts[i] == undefined) 
            continue;
        HTML += `
        <tr>
        <td rowspan="${checkOuts[i].length}" class="rowspanTable">${temp++}</td>
        <td rowspan="${checkOuts[i].length}" class="rowspanTable" style="width: 13%;border:1px solid">${checkOuts[i][0].checkOutId}</td>
        <td rowspan="${checkOuts[i].length}" class="rowspanTable" style="width: 7%;border:1px solid" class="fa__left">${checkOuts[i][0].userName}</td>
        `

        for (let j = 0; j < checkOuts[i].length; j++) {
            if (checkOuts[i][0].status == "Chờ lấy hàng") {
                adminStatus = "Chờ khách hàng xác nhận";
            } else {
                adminStatus = checkOuts[i][0].status;
            }
            if (checkOuts[i][j].status === "Chờ xác nhận") {
                imageName = 'redpoint.png';
            } else {
                imageName = 'greenpoint.png';
            }
            if (j == 0) {
                rowSpanHTML += `
                    <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">${checkOuts[i][0].time}</td>
                    <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">
                        <img src="../image/`+ imageName + `" style="max-width:10px"> ${adminStatus}
                    </td>
                `
                if (checkOuts[i][j].status != "Đã nhận hàng" && checkOuts[i][j].status != "Chờ lấy hàng") {
                    actionHTML += `
                                    <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">
                                        <div  id=${checkOuts[i][j].id} class="tooltip update" onclick="changeStatus(this,${checkOuts[i][j].checkOutId})">
                                            <i class="ti-check"></i>
                                            <span class="tooltiptext">Xác nhận</span>
                                        </div>
                                        <div class="tooltip delete" onclick="deleteAdminCart(${checkOuts[i][j].checkOutId},this)">
                                            <i class="fa fa-trash"></i>  
                                            <span class="tooltiptext">Xóa</span>
                                        </div>
                                    </td>
                                </tr> 
                            `
                } else {
                    actionHTML += `<td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">
                        </td>
                        </tr> 
                        `
                }
            } else {
                HTML += `<tr>`
            }
            if (typeof checkOuts[i][j].status != "undefined") {
                HTML += `<td style="width: 20%;border:1px solid"><img src="../image/` + checkOuts[i][j].image + `" style="max-width:90px"></td>
                    <td style="width: 15%;border:1px solid">£${(parseFloat((checkOuts[i][j].price).split('£')[1]) * parseInt(checkOuts[i][j].soluong)).toFixed(2)}</td>  
                        ${rowSpanHTML}
                        ${actionHTML}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                `
            }

            HTML += `</tr>`;
            actionHTML = '';
            rowSpanHTML = ``;
        }
    }
    HTML += `</tbody> <table>`;
    document.getElementById('table-order').innerHTML = HTML;
}
function changeStatus(object, checkOutId) {
    let currentLogin = getLocalStorage('user');
    let parentNode = object.parentElement;
    let checkOutIds = getLocalStorage('checkOutIds');
    let checkOuts = getCheckOutArray();
    let checkOutIndex = checkOutIds.findIndex(x => x == checkOutId);
    for (let i = 0; i < checkOuts[checkOutIndex].length; i++) {
        if (checkOuts[checkOutIndex][i].status == "Chờ xác nhận") {
            checkOuts[checkOutIndex][i].status = "Đang giao hàng";
        } else if (checkOuts[checkOutIndex][i].status == "Đang giao hàng") {
            checkOuts[checkOutIndex][i].status = "Chờ lấy hàng";
            parentNode.innerHTML = '';
        } else {
            checkOuts[checkOutIndex][i].status = "Đã nhận hàng";
            parentNode.innerHTML = '';
            if (currentLogin.role == "admin") {
                thongKe();
            }
        }
    }
    referenceCheckOutToCarts(checkOuts, checkOutIndex);
    let adminStatus = '';
    if (checkOuts[checkOutIndex][0].status == "Chờ lấy hàng") {
        adminStatus = 'Chờ khách hàng xác nhận';
    } else {
        adminStatus = checkOuts[checkOutIndex][0].status;
    }
    let HTML = `<img src="../image/greenpoint.png" style="max-width:10px">  ${adminStatus}`
    parentNode.previousElementSibling.innerHTML = HTML;
}
function referenceCheckOutToCarts(checkOutArray, checkOutIndex) {
    checkOutArray || [];
    let listCart = getLocalStorage('carts');
    let listUser = getLocalStorage('userData');
    let currentUserId = 0;
    let currentCartIndex = 0;
    checkOutArray[checkOutIndex].forEach(e => {
        currentUserId = listUser[listUser.findIndex(x => x.name == e.userName)].id;
        currentCartIndex = listCart[currentUserId].findIndex(x => x.id == e.id && x.checkOutId == e.checkOutId);
        listCart[currentUserId][currentCartIndex].status = e.status;
    })
    setLocalStorage('carts', listCart);
}
function deleteAdminCart(checkOutId, object) {
    let checkOuts = getCheckOutArray();
    let checkOutIds = getLocalStorage('checkOutIds');
    let currentCheckOutIndex = checkOutIds.findIndex(x => x == checkOutId);
    let listCart = getLocalStorage('carts');
    let listUser = getLocalStorage('userData');
    let currentUserId = listUser.findIndex(x => x.name == checkOuts[currentCheckOutIndex][0].userName);
    checkOuts[currentCheckOutIndex].forEach(e => {
        let deleteIndex = listCart[currentUserId].findIndex(x => x.id == e.id && x.checkOutId == e.checkOutId);
        listCart[currentUserId].splice(deleteIndex, 1);
    })
    setLocalStorage('carts', listCart);
    let tableOrder = document.getElementById('table-order');
    tableOrder.removeChild(object.parentElement.parentElement);
}
function renderUserData() {
    let userData = getLocalStorage('userData');
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
               <img src="../image/`+ imageName + `" style="max-width:13px"> 
               <span> ${userData[i].status} </span> 
            <div class="tooltip changestatus" onclick="changeStatusUser('${userData[i].user}')">
                <i class="ti-loop"></i>  
                <span class="tooltiptext">Đổi trạng thái</span>
            </div>
            </td>
            </tr>
        `
        }
    }
    HTML += `</tbody> <table>`;
    document.getElementById('table-customer').innerHTML = HTML;

}
function changeStatusUser(user) {
    let userData = getLocalStorage('userData');

    for (let i = 0; i < userData.length; i++) {
        if (userData[i].user === user) {
            if (userData[i].status == "blocked")
                userData[i].status = "working"
            else
                userData[i].status = "blocked"
            localStorage.setItem('userData', JSON.stringify(userData));
            let alertNof = "Đổi trạng thái khách hàng " + user + " thành công";
            alert(alertNof);
            break;
        }
    }
    renderUserData();
    // document.querySelector('.blockUser > span')
    // let notifyDeleteCustomer = document.getElementsByClassName('notify__delete_customer')[0];
    // notifyDeleteCustomer.innerHTML = `<div class="notify__delete_customer-text">
    //             Bạn có chắc sẽ xóa người dùng này không?
    //         </div>
    //         <div class="notify__delete_customer-btn">
    //             <div class="notify__delete_customer-ok">
    //                 OK
    //             </div>
    //             <div class="notify__delete_customer-cancel">
    //                 Hủy
    //             </div>
    //         </div>`
    // setTimeout(function () {
    //     notifyDeleteCustomer.style.transform = 'translate(-50%, 0)';
    //     notifyDeleteCustomer.style.opacity = '1';
    //     document.querySelector('.notify__delete_customer-ok').onclick = function () {
    //         let userData = JSON.parse(localStorage.getItem("userData"));
    //         for (let i = 0; i < userData.length; i++) {
    //             if (userData[i].user === user) {
    //                 userData.splice(i, 1);
    //             }
    //         }
    //         localStorage.setItem('userData', JSON.stringify(userData));
    //         sessionStorage.setItem("action", "3");
    //         window.location = "settings.html";
    //     }
    //     document.querySelector('.notify__delete_customer-cancel').onclick = function () {
    //         notifyDelete.style.transform = 'translate(-50%, -270%)';
    //         notifyDelete.style.opacity = '0';
    //     }
    // }, 200)

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

//thong ke
function thongKe() {
    var xValues = ["Consious Chocolate", "Coracao Confections", "Element for life", "Enjoy", "Forever Cacao", "Ombar", "BRANDS"];
    var yValues = getSubTotal();
    var barColors = ["red", "green", "blue", "orange", "brown", "purple", "yellow"];

    new Chart("myChart", {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            title: {
                display: true,
                text: "Thống kê doanh thu theo loại sản phẩm"
            }
        }
    });
}

