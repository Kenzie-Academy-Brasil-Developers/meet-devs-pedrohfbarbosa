function createCard(user) {
    let li = document.createElement("li")
    li.className = "card bg-color-grey-1"
    
    li.insertAdjacentHTML("afterbegin", `
        <div class="card-img">
            <img src="${user["picture"]["large"]}" alt="">
        </div>
        <div class="card-body">
          <h2 class="title-2 color-grey-5">${user["name"]["first"]} ${user["name"]["last"]}</h2>
          <p class="font-2 color-grey-4">${user["location"]["street"]["number"]} ${user["location"]["street"]["name"]}</p>
          <span class="font-2 color-grey-4">${user["dob"]["age"]}</span>
          <div class="btn-contact-wrapper"> 
            <button class="btn-mail bg-color-grey-2"></button>
            <button class="btn-phone bg-color-grey-2"></button>
          </div>
        </div>
    `)

    let btnFavorite = document.createElement("button")
    btnFavorite.classList = "btn-favorite btn-bg-grey"
    let findFav = listFavorites.findIndex((element) => element["email"] == user["email"])
    if (findFav >= 0) {
        btnFavorite.classList.add("btn-bg-color-heart")
    }

    btnFavorite.addEventListener("click", () => {
        btnFavorite.classList.toggle("btn-bg-color-heart")
        let findIndex = listFavorites.findIndex((element) => element["email"] == user["email"])
        if (findIndex < 0) {
            listFavorites.push(user)

            const listToJson = JSON.stringify(listFavorites)

            localStorage.setItem("listFavoritesStorage", listToJson)
        } else {
            listFavorites.splice(findIndex, 1)

            const listToJson = JSON.stringify(listFavorites)

            localStorage.setItem("listFavoritesStorage", listToJson)

            if (pageId == 1){
                li.remove()
            }
        }
       
    })

    li.appendChild(btnFavorite)

    return li
}

function renderCards(arr) {
    const cardWrapper = document.querySelector(".cards-wrapper")
    cardWrapper.innerHTML = ""

    arr.forEach((element) => {
        cardWrapper.appendChild(createCard(element))
    })
}

setTimeout(() => {
    renderCards(users)
}, 1000);


let pageId = 0

const btnAll = document.getElementById("label-all")
btnAll.addEventListener("click", () => {
    pageId = 0
    getUser()
    renderCards(users)
})

const btnFavoritePage = document.getElementById("label-favorite")
btnFavoritePage.addEventListener("click", () => {
    pageId = 1
    renderCards(listFavorites)
})

const inputSearch = document.getElementById("input-search")
const btnSearch = document.getElementById("btn-search")

inputSearch.addEventListener("input", () => {
    if (pageId == 0){
        searchAllUsers()
    }else {
        searchFavorites()
    }    
})

function searchAllUsers() {
    getUser()
    let arrayCompare = users.filter((element) => {
        return ((element.name.first.toLowerCase()).includes(inputSearch.value.toLowerCase())) || ((element.name.last.toLowerCase()).includes(inputSearch.value.toLowerCase()))
    }) 
    renderCards(arrayCompare)
}

function searchFavorites() {
    let arrayCompare = listFavorites.filter((element) => {
        return ((element.name.first.toLowerCase()).includes(inputSearch.value.toLowerCase())) || ((element.name.last.toLowerCase()).includes(inputSearch.value.toLowerCase()))
    }) 
    renderCards(arrayCompare) 
}