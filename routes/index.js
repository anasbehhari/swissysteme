const express = require('express');
const router = express.Router();
const ContactForm = require("../models/ContactForm")
const moment = require("moment");
const passport = require("passport");

router.get("/",(req,res) => {
    res.render("welcome")
})
router.get("/catalogue",(req,res) => {
    res.render("catalogue")
})

router.get("/produits",(req,res) => {
    res.render("produits")
})
router.get("/brands",(req,res) => {
    res.render("brands")
})


router.get("/contact",(req,res) => {
    res.render("contact")
})

router.post("/contact",(req,res) => {
    const data = { companyName,firstname,lastname,email,objet,howFind,message } = req.body;
    if (data) {
        let howf;
        switch (data.interest) {
            case "1":
                int = "collaborer avec nous";
                break;
            case "2":
                int = "Achat de produits";
                break;
            case "3":
                int = "installation et réparation";
                break;
            case "4":
                int = "autre";
                break;
            default:
                int = "";
                break;
        }

        const NewContactForm = new ContactForm({ companyName: data.companyName,fullName: data.firstname + " " + data.lastname,email: data.email,howFind: howFind,objet,message: data.message,date: moment().format("lll") })

        NewContactForm.save()
            .then(contactForm => {
                res.render("contact",{ msg: "votre message a été bien envoyé nous vous contacterons bientôt sur votre boîte de réception " + contactForm.email,type: "success" })
            })
            .catch(err => {
                res.render("contact",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes1 " + err,type: "error" })

            })
    }
    else {
        res.render("contact",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes2 ",type: "error" })

    }



})

router.get("/login",(req,res) => {
    if (req.query.err) {
        switch (req.query.err) {
            case "x_dofWX0":
                res.render("login",{ message: "veuillez vous connecter pour voir la ressource",type: "error" })
                break;
            default: ""
                res.render("login")
                break;
        }
    }
    else {
        res.render("login")
    }
})
router.post("/login",(req,res,next) => {
    console.log(req._passport);
    passport.authenticate("local",{
        successRedirect: "/admin",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next)
})
router.get("/logout",(req,res) => {
    req.logOut();
    req.flash("success_msg",'you are logged  out')
    res.redirect("/login");
})
module.exports = router;
