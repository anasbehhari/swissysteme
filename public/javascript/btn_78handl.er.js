const btns = document.querySelectorAll(".btn");

btns.forEach(el => {
    el.onclick = ()=>{
        if(el.classList.contains("fav")) {
            el.classList.remove("fav")
            //fetch("../api")
        }
        else {
            el.classList.add("fav")
        }
    }
});