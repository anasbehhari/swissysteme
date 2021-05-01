const express = require('express');
const router = express.Router();
const ContactForm = require("../models/ContactForm")
const Categorie = require("../models/Categorie")
const Produit = require("../models/Product")
const Brands = require("../models/Brand")
const moment = require("moment");
const passport = require("passport");

router.get("/",(req,res) => {
    Brands.find().select("-brandName")
        .then(Brands => {
            res.render("welcome",{ Brands })
        })
        .catch(err => {
            res.redirect("/");
        })
})
router.get("/catalogue",(req,res) => {
    res.render("catalogue")
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

    if (req.user) {
        res.redirect("/admin")
    }
    else {
        res.render("login")
    }

})

router.post("/login",(req,res,next) => {
    passport.authenticate("local",{
        successRedirect: "/admin",
        failureRedirect: "/login",
        failureFlash: true
    })(req,res,next)
})

router.get("/logout",(req,res) => {
    req.logOut();
    req.flash("success_msg",'vous êtes déconnecté')
    res.redirect("/login");
})

router.get("/produits/:cat",(req,res) => {
    if (req.params.cat) {
        const categorieName = req.params.cat;
        Categorie.findOne({ categorieName })
            .then(cat => {
                if (!cat) {
                    res.redirect("/")
                }
                else {
                    Produit.find({ productCategorie: cat.categorieName })
                        .then(products => {
                            if (products == null) {
                                res.redirect("/")
                            }
                            else {

                                res.render("produits",{ Categorie: cat,Products: products })
                            }
                        })
                        .catch(() => {
                            res.redirect("/")
                        })
                }

            })
            .catch(() => {
                res.redirect("/")
            })
    }
})
router.get("/produits/:cat/:prod",(req,res) => {
    if (req.params.cat && req.params.prod) {
        const cat = req.params.cat;
        const prod = req.params.prod;
        Categorie.findOne({ categorieName: cat })
            .then(cat => {
                if (!cat) {
                    res.redirect("/")
                }
                else {
                    Produit.findOne({ productCategorie: cat.categorieName,productName: prod })
                        .then(prod => {
                            if (prod == null) {
                                res.redirect("/")
                            }
                            else {
                                Brands.find({ _id:prod.productPartners }).select("-_id")
                                        .then(brands => {
                                            res.render("brands",{brands,prod:prod.productName})
                                        })
                                        .catch(() => {
                                            res.redirect("/")
                                        })
                            }
                        })
                        .catch(() => {
                            res.redirect("/")
                        })
                }

            })
            .catch(() => {
                res.redirect("/")
            })
    }
    else {
        res.redirect("/")
    }
})
module.exports = router;
