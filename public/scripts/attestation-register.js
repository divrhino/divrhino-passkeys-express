class Register {
    async init(event) {
        // 1. Get Challenge from server (Relying Party)
        const challenge = await this.getChallenge(event)
        // 2. Use challenge to create public key credential pair
        const credentials = await this.createPublicKeyPairWith(challenge)
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

    async createPublicKeyPairWith(challengeResponse) {
        const options = {
            publicKey: {
                rp: { name: 'Divrhinopasskeys' },
                user: {
                    id: base64url.decode(challengeResponse.user.id),
                    name: challengeResponse.user.name,
                    displayName: challengeResponse.user.name,
                },
                challenge: base64url.decode(challengeResponse.challenge),
                pubKeyCredParams: [
                    {
                        type: 'public-key',
                        alg: -7, // ES256
                    },
                    {
                        type: 'public-key',
                        alg: -257, // RS256
                    },
                    {
                        type: 'public-key',
                        alg: -8, // Ed25519
                    },
                ],
                authenticatorSelection: {
                    userVerification: 'preferred',
                },
            },
        }

        const newCredentials = await navigator.credentials.create(options)
        return newCredentials
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