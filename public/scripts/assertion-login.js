class Login {
    async init() {
        // 1. Check that conditional mediation is supported

        // 2. Get challenge from server (Relying Party)
        // 3. Use existing public key credential to authenticate user
        // 4. Use public key credential to login user

        // 5. Redirect to user's dashboard
    }
}

window.addEventListener('load', async () => {
    const login = new Login()

    if (window.PublicKeyCredential) {
        await login.init()
    }
})
