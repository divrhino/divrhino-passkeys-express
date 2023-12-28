const passport = require('passport')
const WebAuthnStrategy = require('passport-fido2-webauthn')

const db = require('../../db/helpers/init')
const models = require('../models')

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
            this.verify,
            this.register // needs to be fleshed out
        )
    }

    // Verify callback
    async verify(id, userHandle, done) {
        const transaction = await db.transaction()
        try {
            const currentCredentials =
                await models.PublicKeyCredentials.findOne(
                    {
                        where: { external_id: id },
                    },
                    { transaction }
                )

            if (currentCredentials === null) {
                return done(null, false, { message: 'Invalid key. ' })
            }

            const currentUser = await models.User.findOne(
                {
                    where: { id: currentCredentials.user_id },
                },
                { transaction }
            )

            if (currentUser === null) {
                return done(null, false, { message: 'No such user. ' })
            }

            if (Buffer.compare(currentUser.handle, userHandle) != 0) {
                return done(null, false, { message: 'Handles do not match. ' })
            }

            await transaction.commit()

            return done(null, currentCredentials, currentCredentials.public_key)
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    // Register callback
    async register(user, id, publicKey, done) { }

}

module.exports = PassportService
