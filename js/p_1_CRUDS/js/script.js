let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let deleteTheData = document.getElementById("deleteAllDiv");
let mood = true;
let tmp;
let sMood;

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
    if (newPro.price != "" &&
        newPro.title != "" &&
        newPro.category != "" &&
        newPro.count <= 100){
        if (mood){

            if (newPro.count >1) {
                for (let i = 0 ; i < newPro.count ; i++){
                    dataPro.push(newPro);
                }
            } else{
                dataPro.push(newPro);
        }} else{
            dataPro[tmp] = newPro;
            mood = true;
            submit.innerHTML = "create";
            count.style.display = "block";
            };
            clearData();
    }
    localStorage.setItem("locale_data" , JSON.stringify(dataPro));
    
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
    
}
//shows data
function showData() {
    getTotal();
    let table = "";
    for (let i = 0 ; i < dataPro.length ; i++) {
        
        table +=`
     <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})"type="submit"id="update">update</button></td>
        <td><button onclick="deleteData(${i})" type="submit"id="delete">delete</button></td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    
    if (dataPro.length > 0) {
        deleteTheData.innerHTML = `<button  onclick="deleteAll();"  type="submit">delete All data ( ${dataPro.length } ) </button>`
        
    }else {
        deleteTheData.innerHTML  =""
    }
    
}
//delete product


function deleteData(i) {
    
    dataPro.splice(i,1);
    localStorage.setItem("locale_data"  , JSON.stringify(dataPro));
    showData();
}

// delete all products


function deleteAll(){
    
    dataPro.splice(0);
    localStorage.clear()
    
    showData();
}



// update data

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discount.value =dataPro[i].discount;
    category.value= dataPro[i].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML ="Upadate".toUpperCase();
    mood = false;
    showData();
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
    
}



//search data

function searchMood(id){
    let search = document.getElementById("search");
    if(id == "Title"){
        sMood = "Title";
    }else{
        sMood = "Category";
    }
    search.placeholder = `search by ${sMood}`;
    search.focus();
    search.value = "";
    showData();

}
function searching(value){
    let table = "";
    for (let i = 0 ; i<dataPro.length ; i++){
        
        if (sMood == "Category"){
            if (dataPro[i].category.toUpperCase().includes(value.toUpperCase())){
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
                    <td><button onclick="updateData(${i})"type="submit"id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" type="submit"id="delete">delete</button></td>
                </tr>`;
            };
        } else{
            if (dataPro[i].title.toUpperCase().includes(value.toUpperCase())){
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
                    <td><button onclick="updateData(${i})"type="submit"id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" type="submit"id="delete">delete</button></td>
                </tr>`;
            };
        }
    };
    document.getElementById("tbody").innerHTML = table;
};
//cleane data

showData();