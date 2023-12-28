const passport = require('passport')
const WebAuthnStrategy = require('passport-fido2-webauthn')

class PassportService {
    init(store) {
        // 1. configure passport to use WebAuthn Strategy
        passport.use(this.useWebauthnStrategy(store))
        // 2. passport serialise user
        // 3. passport deserialise user
    }

    useWebauthnStrategy(store) {
        return new WebAuthnStrategy(
            { store: store },
            this.verify, // needs to be fleshed out
            this.register // needs to be fleshed out
        )
    }

    // Verify callback
    async verify(id, userHandle, done) { }

    // Register callback
    async register(user, id, publicKey, done) { }

}

module.exports = PassportService
