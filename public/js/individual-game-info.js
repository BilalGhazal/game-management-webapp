const deleteButton = document.querySelector(".delete-button")
const dialog = document.querySelector("#deleteGameDialog")
const closeDialog = document.querySelector(".dialog-close-button")


const path = window.location.pathname
const parts = path.split("/")
const gameId = parts[2]


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
    dialog.showModal()
})


closeDialog.addEventListener("click", () => {
    dialog.close()
})
