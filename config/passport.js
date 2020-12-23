const LocalStrategy = require("passport-local").Strategy;

//USER MODEL
const Admin = require("../models/Admin");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' },(email,password,done) => {
            //Match User
            Admin.findOne({ email: email })
                .then(admin => {
                    if (!admin) {
                        return done(null,false,{ message: `Email n'existe pas !`,type: "error" });
                    }
                    //Match password
                    if (password == admin.password) {
                        return done(null,admin)
                    } else {
                        return done(null,false,{ message: 'Email ou Mot de pass incorrect',type: "error" })

                    }


                })
                .catch(err => console.log(err))
        })
    );

    passport.serializeUser((admin,done) => {
        done(null,admin.id);
    });

    passport.deserializeUser((id,done) => {
        Admin.findById(id,(err,admin) => {
            done(err,admin);
        });
    });
}
