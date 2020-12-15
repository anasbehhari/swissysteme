//module.exports = {
//    ensureAuthenticated: function (req,res,next) {
//        if (req.isAuthenticated()) {
//            return next()
//        }
//        req.flash('error','please login to view the resource ');
//        res.redirect("/users/login")
//    }
//}