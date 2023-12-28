class Login {
    async init() {
        // 1. Check that conditional mediation is supported
        await this.checkConditionalMediationSupport()
        // 2. Get challenge from server (Relying Party)
        const challenge = await this.getChallenge()
        // 3. Use existing public key credential to authenticate user
        // 4. Use public key credential to login user

        // 5. Redirect to user's dashboard
    }

    async checkConditionalMediationSupport() {
        const isCMA =
            await window.PublicKeyCredential.isConditionalMediationAvailable()
        if (!isCMA) return
    }

    async getChallenge() {
        const response = await fetch('/login/public-key/challenge', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
        })

        return response.json()
    }
}

window.addEventListener('load', async () => {
    const login = new Login()

    if (window.PublicKeyCredential) {
        await login.init()
    }
})
