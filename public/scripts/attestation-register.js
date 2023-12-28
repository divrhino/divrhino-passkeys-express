class Register {
    async init(event) {
        // 1. Get Challenge from server (Relying Party)
        const challenge = await this.getChallenge(event)
        // 2. Use challenge to create public key credential pair
        // 3. Send publicKey+challenge to server to create new user
        // 4. Redirect to user's dashboard
    }

    async getChallenge(event) {
        const response = await fetch('/register/public-key/challenge', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            }, 
            body: new FormData(event.target),
        })

        return response.json()
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