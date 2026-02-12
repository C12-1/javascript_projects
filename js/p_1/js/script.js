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
if (localStorage.getItem("locale_data") == false) {

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
        total:total.value,
        count:count.value,
        category:category.value,
    };clearData
    dataPro += newPro;
    localStorage.setItem("locale_data" , JSON.stringify(dataPro))
    clearData();
}

function clearData() {
    price.value = ""
    title.value = ""
    taxes.value= ""
    ads.value= ""
    discount.value= ""
    total.value= ""
    count.value= ""
    category.value= ""
}