function renderTrade() {
    let temp = 1;
    let user = JSON.parse(localStorage.getItem('user'));
    if(user == undefined) {
        document.getElementById('table-trade').removeAttribute("class");
        return;
    }
    let checkOuts = JSON.parse(localStorage.getItem('carts'))[parseInt(user.id)];

    if(checkOuts.length == 0) {
        document.getElementById('table-trade').removeAttribute("class");
        return;
    }
    if(!checkOuts[0].hasOwnProperty('status')) {
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
        HTML += `
        <tr>
        <td rowspan="${checkOuts.length}" class="rowspanTable" style="width: 8%;border:1px solid">${temp++}</td>
        <td rowspan="${checkOuts.length}" class="rowspanTable" style="width: 13%;border:1px solid">${checkOuts[0].checkOutId}</td>
        <td rowspan="${checkOuts.length}" class="rowspanTable" style="width: 17%;border:1px solid" class="fa__left">${checkOuts[0].userName}</td>
        `;
        for (let j = 0; j < checkOuts.length; j++) {

            if (checkOuts[j].status === "Chờ xác nhận") {
                imageName = 'redpoint.png';
            } else {
                imageName = 'greenpoint.png';
            }
            if (j == 0) {
                rowSpanHTML += `
                        <td rowspan=${checkOuts.length} class="rowspanTable" style="width: 10%;border:1px solid">${checkOuts[0].time}</td>
                        <td rowspan=${checkOuts.length} class="rowspanTable" style="width: 10%;border:1px solid">
                            <img src="../image/`+ imageName + `" style="max-width:10px"> ${checkOuts[0].status}
                        </td>
                    `
                if (checkOuts[j].status != "Đã nhận hàng") {
                    actionHTML += `
                                        <td rowspan=${checkOuts.length} class="rowspanTable" style="width: 10%;border:1px solid">
                                            <div  id=${checkOuts[j].id} class="tooltip update" onclick="changeStatus(this,${checkOuts[j].checkOutId})">
                                                <i class="ti-check"></i>
                                                <span class="tooltiptext">Xác nhận</span>
                                            </div>
                                            <div class="tooltip delete" onclick="deleteAdminCart(${checkOuts[j].checkOutId},this)">
                                                <i class="fa fa-trash"></i>  
                                                <span class="tooltiptext">Xóa</span>
                                            </div>
                                        </td>
                                    </tr> 
                                `
                } else {
                    actionHTML += `<td rowspan=${checkOuts.length} class="rowspanTable" style="width: 10%;border:1px solid">
                            </td>
                            </tr> 
                            `
                }
            } else {
                HTML += `<tr>`
            }
            if (typeof checkOuts[j].status != "undefined") {
                HTML += `<td style="width: 20%;border:1px solid"><img src="../image/` + checkOuts[j].image + `" style="max-width:90px"></td>
                        <td style="width: 15%;border:1px solid">£${(parseFloat((checkOuts[j].price).split('£')[1]) * parseInt(checkOuts[j].soluong)).toFixed(2)}</td>  
                            ${rowSpanHTML}
                            ${actionHTML}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                    `
            }

            HTML += `</tr>`;
            actionHTML = '';
            rowSpanHTML = ``;
        }
    // }

    HTML += `</tbody> <table>`;
    document.getElementById('table-order').innerHTML = HTML;
}

function deleteUserCart() {
    
}

function changeStatus() {

}