const genres = document.querySelector("#genres")
const genresReferenceCopy = genres.cloneNode(true)
const genresOrder = {}
const selectdGenres = document.querySelector("#selected-genres")

const gamePostersContainer = document.querySelector(".suggested-game-posters-container")

genres.addEventListener("change", (event) => {
    const selectedValue = event.target.value
    const selectedValueIndexStore = [...genresReferenceCopy.options].findIndex(option => option.value === selectedValue)
    const selectedValueIndexRemove = [...genres.options].findIndex(option => option.value === selectedValue)
    
    genresOrder[selectedValueIndexStore] = new Option(genresReferenceCopy.options[selectedValueIndexStore].text,
                                                genresReferenceCopy.options[selectedValueIndexStore].value)
    
    
    genres.options.remove(selectedValueIndexRemove)
    
    addTag(selectedValue, selectedValueIndexStore)
})



function addTag(selectedValue, selectedValueIndexStore) {
    const choiceDiv = document.createElement("div")
    choiceDiv.classList.add("choice-div")
    choiceDiv.dataset.index = selectedValueIndexStore

    const closeButton = document.createElement("button")
    closeButton.classList.add("close-button")
    closeButton.type = "button"
    closeButton.textContent = "x"
    closeButton.addEventListener("click", removeTag)
    

    const choice = document.createElement("p")
    choice.classList.add("choice-p")
    choice.textContent = selectedValue

    choiceDiv.appendChild(closeButton)
    choiceDiv.appendChild(choice)

    selectdGenres.appendChild(choiceDiv)
}

function removeTag(event) {
    const tagDiv = event.target.parentElement
    const index = Number(tagDiv.dataset.index)
    genres.options.add(genresOrder[index], index)
    tagDiv.remove()
}


async function displayGamePosters(gameTitle) {
    const url = `/api/games/search/:${gameTitle}`
    const response = await fetch(url)
    const gamePosters = await response.json()
    
    gamePosters.forEach((gamePoster) => {
        const img = document.createElement("img")
        img.src = gamePoster
        img.classList.add("suggested-game-poster")
        gamePostersContainer.appendChild(img)
    })
}
