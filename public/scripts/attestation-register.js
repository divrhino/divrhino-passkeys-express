class Register {
    async init(event) {
        // 1. Get Challenge from server (Relying Party)
        // 2. Use challenge to create public key credential pair
        // 3. Send publicKey+challenge to server to create new user
        // 4. Redirect to user's dashboard
    }
    
}

window.addEventListener('load', async () => {
    document
        .querySelector('#registration-form')
        .addEventListener('submit', async (event) => {
            event.preventDefault()

            const register = new Register()
            await register.init(event)
        })
})