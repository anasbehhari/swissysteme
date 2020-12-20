module.exports = {
    ensureAuthenticated: function (req,res,next) {
        if (req.isAuthenticated()) {
            return next()
        }
        req.flash("error",'veuillez vous connecter pour voir la ressource')
        res.redirect("/login")
    }
}