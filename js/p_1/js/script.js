let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


function getTotal() {
    if (price.value != "") {
        let sum = ((parseFloat(price.value) || 0 )
                + (parseFloat(taxes.value) || 0)
                + ( parseFloat(ads.value) || 0 ))
                - ( parseFloat(discount.value) || 0);
        total.innerHTML = sum;
        total.style.background = "#040";
    }else {
        total.style.background = "#a00d02";
        total.innerHTML = "";
    }
};
let dataPro;
if (localStorage.getItem("locale_data") == null) {

    dataPro =[];
}
else{
    dataPro = JSON.parse(localStorage.getItem("locale_data"))
}
submit.onclick = function() {
    let newPro = {
        price:price.value,
        title:title.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    };
    dataPro.push(newPro);
    localStorage.setItem("locale_data" , JSON.stringify(dataPro));
    clearData();
    showData();
}

function clearData() {
    price.value = "";
    title.value = "";
    taxes.value= "";
    ads.value= "";
    discount.value= "";
    count.value= "";
    category.value= "";
    total.innerHTML= "";
    total.style.background = "#a00d02"
}

function showData() {
    let table = "";
    for (let i = 0 ; i < dataPro.length ; i++) {
        
        table +=`
     <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button type="submit"id="update">update</button></td>
        <td><button type="submit"id="delete">delete</button></td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table
    
}
showData();