
var ldr = document.querySelector(".loader");
window.onload = () => {
    ldr.style.opacity = "0";
    setTimeout(() => ldr.classList.add("stop"),500)
}
