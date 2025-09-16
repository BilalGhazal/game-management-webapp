const deleteButton = document.querySelector(".delete-button")
const dialog = document.querySelector("#deleteGameDialog")
const closeDialog = document.querySelector(".dialog-close-button")
const form = document.querySelector("#deleteGameForm")
const passwordInput = document.querySelector("#password")
const confirmDeleteButton = document.querySelector(".dialog-delete-button")
const errorMassageSpan = document.querySelector(".error-message")


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

    if (!form.reportValidity()) return

    const formData = new FormData(form)

    const password = formData.get("password")

    try {
        const response = await fetch("/api/delete/game/checkpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
        })

        if (response.ok) {
            errorMassageSpan.textContent = ""
            const response = await fetch(`/api/delete/game/${gameId}`, {method: "DELETE"})

            if (response.ok) {
                dialog.close(), 500
                window.location.href = "/"
            }

            else {
                alert("Something went wrong")
            }

        }

        else if (response.status === 401) {
            errorMassageSpan.textContent = "Incorrect password"
            form.reset()   
        }

        else {
            alert("Something went wrong")
        }
    }

    catch(err) {
        console.error("Network error: ", err)
    }
})
    
