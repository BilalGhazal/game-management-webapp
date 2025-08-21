const genres = document.querySelector("#genres")
const genresReferenceCopy = genres.cloneNode(true)
const genresOrder = {}
const selectdGenres = document.querySelector("#selected-genres")

genres.addEventListener("change", (event) => {
    const selectedValue = event.target.value
    const selectedValueIndexStore = [...genresReferenceCopy.options].findIndex(option => option.value === selectedValue)
    const selectedValueIndexRemove = [...genres.options].findIndex(option => option.value === selectedValue)
    console.log(genresReferenceCopy.options[selectedValueIndexStore])
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