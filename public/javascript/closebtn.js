let closeBtns = document.querySelectorAll(".close-btn");
if (closeBtns.length > 0) {
    closeBtns.forEach(el => {
        el.onclick = () => {
            el.parentElement.classList.add("hidden")
            setTimeout(() => {
                el.parentElement.remove();
            },1000)
        }
    })
}