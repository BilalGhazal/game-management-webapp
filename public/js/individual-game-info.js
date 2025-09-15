const deleteButton = document.querySelector(".delete-button")
const dialog = document.querySelector("#deleteGameDialog")
const closeDialog = document.querySelector(".dialog-close-button")
const form = document.querySelector("#deleteGameForm")
const passwordInput = document.querySelector("#password")
const confirmDeleteButton = document.querySelector(".dialog-delete-button")


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


confirmDeleteButton.addEventListener("click", async(event) => {
    event.preventDefault()

    const formData = new FormData(form)

    const password = formData.get("password")

    const response = await fetch("/api/delete/game/checkpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
    })

    if (response.ok) {
        alert("Password correct!")
    }
    else {
        alert("Wrong password")
    }
})
