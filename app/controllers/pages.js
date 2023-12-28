class PagesController {
    welcome(req, res, next) {
        if (!req.user) return res.send('Hello Universe!')
        next()
    }
}

module.exports = PagesController
