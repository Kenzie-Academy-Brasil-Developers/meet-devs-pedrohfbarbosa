let users = []

let listFavorites = []

const url = "https://randomuser.me/api/"
const complement = "?results=10"

function getUser() {
    return fetch(`${url}${complement}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(response) { 
        newUsers = response.results

        users = [...newUsers]
    })
}

function getFavorites() {
    let getFromLocal = localStorage.getItem("listFavoritesStorage")

    if (getFromLocal){
        const listFromLocal = JSON.parse(getFromLocal)

        listFavorites = [...listFromLocal]
    }
    

}

getUser()

getFavorites()