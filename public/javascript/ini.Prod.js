function loadFile(params) {
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
        URL.revokeObjectURL(output.src) // free memory
    }
}
var output = document.querySelector('.con');
output.onclick = () => {
    if (output.querySelector("img").classList.contains("cover")) {
        output.querySelector("img").classList.remove("cover")
        output.querySelector("img").classList.add("contain")
    }
    else {
        output.querySelector("img").classList.add("cover")
        output.querySelector("img").classList.remove("contain")
    }
}

const cats = document.getElementById("proCat");
const brands = document.getElementById("proMarq");
const products = document.getElementById("productsIN");

if(cats && brands) {
    fetch("/api/brands/",{
        method:"GET",
    })
    .then(res=> res.json())
    .then(databrands=> {
        databrands.forEach(el => {
            $("#proMarq").append(`<option value="${el._id}">${el.brandName}</option>`)
        });
        

    })
    .catch(err=>console.log(err))


    setTimeout(()=>{
     fetch("/api/cats",{
         method:"GET"
     })
     .then(res=> res.json())
     .then(dataCats=>{
         dataCats.forEach(el => {
             $("#proCat").append(`<option value="${el.categorieName}">${el.categorieName}</option>`)
         });
     })
    },0)
}
if(products){
    fetch("/api/products",{
        method:"GET",
    })
    .then(res => res.json())
    .then(products=>{
        products.forEach(el=>{
            $("#productsIN").append(`<li> ${el.productName}  <strong>Id : ${el._id}</strong> </li>`)
        })
        document.getElementById("number").innerHTML=products.length
    })
}

//