$('.icon').click(function () {
    $('span').toggleClass("cancel");
});

var nav = document.querySelector("nav");

window.onscroll = e => {
    if (window.innerWidth > 968) {
        (window.pageYOffset || window.scrollY) > 100 ? nav.classList.add("moved") : nav.classList.remove("moved");

    }
}

if (window.innerWidth < 968) {
    nav.classList.add("moved");
} 
window.onresize = ()=>{
    if (window.innerWidth < 968) {
        nav.classList.add("moved");
    }   
}
