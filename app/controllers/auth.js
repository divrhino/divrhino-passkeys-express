const base64url = require('base64url')
const uuid = require('uuid').v4

class AuthController {
    login(req, res) {
        res.render('auth/login')
    }

    register(req, res) {
        res.render('auth/register')
    }

    createChallengeFrom(store) {
        return (req, res, next) => {
            const user = {
                id: uuid({}, Buffer.alloc(16)),
                name: req.body.email,
            }

            store.challenge(req, {user: user}, (err, challenge) => {
                if (err) return next(err)

                user.id = base64url.encode(user.id)

                res.json({
                    user: user,
                    challenge: base64url.encode(challenge),
                })
            })
        }
    }
}

module.exports = AuthController
