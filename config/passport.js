//const LocalStrategy = require("passport-local").Strategy;
//const mongoose = require('mongoose');

////USER MODEL

//const User = require("../models/User");

//module.exports = function (passport) {
//    passport.use(
//        new LocalStrategy({ usernameField: 'email' },(email,password,done) => {
//            //Match User
//            User.findOne({ email: email })
//                .then(user => {
//                    if (!user) {
//                        return done(null,false,{ message: 'email do not exist ' });
//                    }
//                    //Match password
//                    bcrypt.compare(password,user.password,(err,isMatched) => {
//                        if (err) throw err;
//                        if (isMatched) {
//                            return done(null,user)
//                        }
//                        else {
//                            return done(null,false,{ message: 'password incorrect' })
//                        }
//                    })
//                })
//                .catch(err => console.log(err))
//        })
//    );

//    passport.serializeUser((user,done) => {
//        done(null,user.id);
//    });

//    passport.deserializeUser((id,done) => {
//        User.findById(id,(err,user) => {
//            done(err,user);
//        });
//    });
//}