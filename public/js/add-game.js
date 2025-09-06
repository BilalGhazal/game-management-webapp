const form = document.querySelector(".add-game-form")

const genres = document.querySelector("#genres")
const genresReferenceCopy = genres.cloneNode(true)
const genresOrder = {}
const selectdGenresDiv = document.querySelector("#selected-genres-div")

const gamePostersContainerWrapper = document.querySelector(".suggested-game-posters-container-wrapper")
const gamePostersContainer = document.querySelector(".suggested-game-posters-container")
const gameTitleInput = document.querySelector("#game-title")
const selectedGamePoster = document.querySelector("#selected-game-poster")

const selectedGenresInput = document.querySelector("#selected-genres")
let selectedGenres = []


form.addEventListener("submit", (event) => {
    if (!selectedGamePoster.value || selectedGamePoster.value.trim() === "") {
        event.preventDefault()
        alert("Please select a game poster")
    }

    console.log(selectedGenresInput.value)

    if (!selectedGenresInput.value || JSON.parse(selectedGenresInput.value).length < 1) {
        event.preventDefault()
        alert("Please select at least one genre")
    }
})


document.addEventListener("click", (e) => {
    if (!gamePostersContainerWrapper.contains(e.target) && e.target !== gameTitleInput) {
        gamePostersContainerWrapper.classList.add("hidden")
    }

})


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

    addGenreToInputValue(selectedValue)

    selectdGenresDiv.appendChild(choiceDiv)
}

function removeTag(event) {
    const tagDiv = event.target.parentElement
    const index = Number(tagDiv.dataset.index)
    genres.options.add(genresOrder[index], index)
    removeGenreFromInputValue(genresOrder[index].value)
    tagDiv.remove()
}


function showWrapper(selector) {
    if (selector.classList.contains("hidden")) {
    selector.classList.remove("hidden");
    }
}

function hideWrapper(selector) {
    if (!selector.classList.contains("hidden")) {
    selector.classList.add("hidden");
    }
}


async function displayGamePosters(gameTitle) {
    const url = `/api/games/search/:${gameTitle}`
    const response = await fetch(url)
    const gamePosters = await response.json()

    gamePostersContainer.replaceChildren()
    showWrapper(gamePostersContainerWrapper)

    console.log(gamePosters)

    if (gamePosters.length === 0) {
        const p = document.createElement("p")
        p.textContent = "No posters for this game. Make sure the game exists."
        gamePostersContainer.appendChild(p)
        return
    }

    gamePosters.forEach((gamePoster) => {
        const div = document.createElement("div")
        div.classList.add("suggested-game-poster-div")
        div.addEventListener("click", selectGamePoster)
        const img = document.createElement("img")
        img.src = gamePoster
        img.classList.add("suggested-game-poster")
        div.appendChild(img)
        gamePostersContainer.appendChild(div)
    })
}


function debounce(inputSelector, functionRef) {
    let timer
    const waitTime = 500

    inputSelector.addEventListener("keyup", (e) => {
        clearTimeout(timer)
        
        const text = e.currentTarget.value

        timer = setTimeout(() => {
            functionRef(text)
        }, waitTime)

    })
}


function selectGamePoster(event) {
    Array.from(event.currentTarget.parentElement.children).forEach(child => child.classList.remove("selected"))

    if (event.currentTarget.classList.contains("selected")){
        event.currentTarget.classList.remove("selected")
        selectedGamePoster.value = ""
    }
    else {
        event.currentTarget.classList.add("selected")
        selectedGamePoster.value = event.currentTarget.children[0].src
    }

    setTimeout(() => hideWrapper(gamePostersContainerWrapper), 300)
}


gameTitleInput.addEventListener("focus", () => {
    if (gameTitleInput.value !== "") {
        showWrapper(gamePostersContainerWrapper)
    }
})

function addGenreToInputValue(genre) {
    if (!selectedGenres.includes(genre)) {
        selectedGenres.push(genre)
        selectedGenresInput.value = JSON.stringify(selectedGenres)
    }
}

function removeGenreFromInputValue(genreToBeRemoved) {
    selectedGenres = selectedGenres.filter(genre => genre !== genreToBeRemoved)
    selectedGenresInput.value = JSON.stringify(selectedGenres)
}


debounce(gameTitleInput, displayGamePosters)