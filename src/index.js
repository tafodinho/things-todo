document.getElementsByClassName("project-items")[0].style.display = "none"

document.getElementById("project").addEventListener("click", (e) => {
    if(e.target.parentNode.nextSibling.nextSibling.style.display === "none") {
        e.target.parentNode.nextSibling.nextSibling.style.display = ""
    } else {
        e.target.parentNode.nextSibling.nextSibling.style.display = "none"
    }
})