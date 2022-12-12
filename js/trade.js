function renderTrade() {
    let temp = 1;
    let user = getLocalStorage('user');
    if (user == undefined) {
        document.getElementById('table-trade').removeAttribute("class");
        return;
    }
    let userCart = getLocalStorage('carts')[parseInt(user.id)];
    let checkOuts = getCheckOutArayByUserCart(userCart);
    if (checkOuts.length == 0) {
        document.getElementById('table-trade').removeAttribute("class");
        return;
    }
    if (!checkOuts[0][0].hasOwnProperty('status')) {
        document.getElementById('table-trade').removeAttribute("class");
        return;
    }
    document.getElementsByClassName('text-detail-trade')[0].classList.add('hiddenPage');
    document.getElementById('table-trade').setAttribute("class", "margin-top-trade");
    document.getElementById('table-trade').innerHTML =
        `
            <thead>
                <th style="width: 8%; border: 1px solid">Number</th>
                <th style="width: 13%; border: 1px solid">Order Number</th>
                <th style="width: 17%; border: 1px solid">Customer</th>
                <th style="width: 20%; border: 1px solid">Product</th>
                <th style="width: 15%; border: 1px solid">Total</th>
                <th style="width: 10%; border: 1px solid">Time</th>
                <th style="width: 10%; border: 1px solid">Status</th>
                <th style="width: 10%; border: 1px solid">Action</th>
            </thead>
            <tbody id="table-order">
            </tbody>
        `;
    let HTML = `<table> <tbody>`;
    let actionHTML = '';
    let rowSpanHTML = ``;
    let imageName = '';

    // let countOrder = Array(checkOuts.length);
    // let countProduct = 1;
    // let tmp = 0;
    // for (let i = 0; i < checkOuts.length; i++) {
    //     if (checkOuts[i + 1].checkOutId != checkOuts[i].checkOutId) {
    //         countProduct++;
    //     }
    //     else {
    //         countOrder[tmp++] = countProduct;
    //         countProduct = 1;
    //     }
    // }
    // console.log(countOrder);

    // for (let i = 0; i < countOrder.length; i++) {
    for (let i = 0; i < checkOuts.length; i++) {
        if(!checkOuts[i][0].hasOwnProperty("status"))
            continue;
        HTML += `
            <tr>
            <td rowspan="${checkOuts[i].length}" class="rowspanTable">${temp++}</td>
            <td rowspan="${checkOuts[i].length}" class="rowspanTable" style="width: 13%;border:1px solid">${checkOuts[i][0].checkOutId}</td>
            <td rowspan="${checkOuts[i].length}" class="rowspanTable" style="width: 7%;border:1px solid" class="fa__left">${checkOuts[i][0].userName}</td>
            `

        for (let j = 0; j < checkOuts[i].length; j++) {
            if (checkOuts[i][j].status === "Chờ xác nhận") {
                imageName = 'redpoint.png';
            } else {
                imageName = 'greenpoint.png';
            }
            if (j == 0) {
                rowSpanHTML += `
                        <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">${checkOuts[i][0].time}</td>
                        <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">
                            <img src="../image/`+ imageName + `" style="max-width:10px"> ${checkOuts[i][0].status}
                        </td>
                    `
                if (checkOuts[i][j].status == "Chờ lấy hàng") {
                    actionHTML += `
                                        <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">
                                            <div  id=${checkOuts[i][j].id} class="tooltip update" onclick="changeStatus(this,${checkOuts[i][j].checkOutId})">
                                                <i class="ti-check"></i>
                                                <span class="tooltiptext">Xác nhận</span>
                                            </div>
                                            <div class="tooltip delete" onclick="deleteUserCart(${checkOuts[i][j].checkOutId},this)">
                                                <i class="fa fa-trash"></i>  
                                                <span class="tooltiptext">Xóa</span>
                                            </div>
                                        </td>
                                    </tr> 
                                `
                } else if (checkOuts[i][j].status != "Đã nhận hàng") {
                    actionHTML += `
                                <td rowspan=${checkOuts[i].length} class="rowspanTable" style="width: 10%;border:1px solid">
                                <div class="tooltip delete" onclick="deleteUserCart(${checkOuts[i][j].checkOutId},this)">
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
    // }

    HTML += `</tbody> <table>`;
    document.getElementById('table-order').innerHTML = HTML;
}
function getCheckOutArayByUserCart(userCart) {
    let checkOutIds = [];
    let checkOuts = [];
    let checkOutIndex;
    userCart.map(x => {
        if ((checkOutIndex = checkOutIds.findIndex(id => id == x.checkOutId)) != -1) {
            checkOuts[checkOutIndex].push(x);
        } else {
            checkOuts.push([]);
            checkOutIds.push(x.checkOutId);
            checkOuts[checkOutIds.length - 1].push(x);
        }
    })
    return checkOuts;
}
function deleteUserCart(checkOutId,object) {
    let checkOuts = getCheckOutArray();
    let checkOutIds = getLocalStorage('checkOutIds');
    let currentCheckOutIndex = checkOutIds.findIndex(x => x == checkOutId);
    let cancelCheckOut;
    if(typeof getLocalStorage('cancelCheckOut') != "undefined"){
        cancelCheckOut=getLocalStorage('cancelCheckOut')
    }else{
        cancelCheckOut=[];
    }
    let listCart = getLocalStorage('carts');
    let listUser = getLocalStorage('userData');
    let currentUserId = listUser[listUser.findIndex(x => x.name == checkOuts[currentCheckOutIndex][0].userName)].id;
    let listObject=Array(checkOuts[currentCheckOutIndex].length).fill([]);
    listObject[0]=object.parentElement.parentElement;
    for(let i=1;i<checkOuts[currentCheckOutIndex].length;i++){
        listObject[i]=listObject[i-1].nextElementSibling;
    }
    cancelCheckOut.push(checkOuts[currentCheckOutIndex]);
    checkOuts[currentCheckOutIndex].forEach(e => {
        let deleteIndex = listCart[currentUserId].findIndex(x => x.id == e.id && x.checkOutId == e.checkOutId);
        listCart[currentUserId].splice(deleteIndex, 1);
    })
    checkOutIds.splice(currentCheckOutIndex,1);
    setLocalStorage('cancelCheckOut',cancelCheckOut);
    setLocalStorage('checkOutIds',checkOutIds);
    setLocalStorage('carts', listCart);
    let tableOrder = document.getElementById('table-order');
    listObject.forEach(o=>{
        tableOrder.removeChild(o);
    })
}

function changeStatus() {

}