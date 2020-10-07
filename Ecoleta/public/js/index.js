const btnSearch = document.querySelector("#home-page main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

btnSearch.addEventListener("click" , () =>{
    modal.classList.remove("hidden")
})

close.addEventListener("click", () =>{
    modal.classList.add("hidden")
})