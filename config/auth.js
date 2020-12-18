module.exports = {
    ensureAuthenticated: function (req,res,next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect("/login?err=x_dofWX0")
    }
}