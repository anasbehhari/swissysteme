$(".message").append(document.querySelector(".message").getAttribute("data-msg"))
setTimeout(() => {
    document.querySelector(".message").setAttribute("data-msg","")
},0)
document.getElementById("back").onclick = () => {
    window.history.back()
}
document.getElementById("print").onclick = () => {
    window.print()
}
document.getElementById("delete").onclick = () => {
    fetch("/admin/msg/del/" + document.querySelector(".message").getAttribute("data-id"),{
        method: "GET"
    })
        .then(() => {
            alert("Message bien supprimer !")
            document.getElementById("com").click();

        })
        .catch(err => alert(err))

}