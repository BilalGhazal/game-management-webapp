const deleteButton = document.querySelector(".delete-button")

const path = window.location.pathname
const parts = path.split("/")
const gameId = parts[2]

console.log(gameId)
console.log(`/delete/game/${gameId}`)




async function deleteGame(id) {
    try {
        const response = await fetch(`/api/delete/game/${id}`, {method: "DELETE"})
 
        if (!response.ok) {
            throw new Error("failed to delete game")
        }
    }

    catch (err) {
        console.log(err.message)
    }
}


deleteButton.addEventListener("click", async () => {
    await deleteGame(gameId)
})