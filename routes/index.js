const express = require('express');
const router = express.Router();
const ContactForm = require("../models/ContactForm")
router.get("/",(req,res) => {
    res.render("welcome")
})
router.get("/catalogue",(req,res) => {
    res.render("catalogue")
})

router.get("/produits",(req,res) => {
    res.render("produits")
})





router.get("/contact",(req,res) => {
    res.render("contact")
})

router.post("/contact",(req,res) => {
    const data = { companyName,firstname,secondname,email,interest,howFind,message } = req.body;
    if (data) {
        let int;
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
        switch (data.howFind) {
            case "1":
                howf = "Moteur de recherche";
                break;
            case "2":
                howf = "Bouche à oreille";
                break;
            case "3":
                howf = "Publicité papier";
                break;
            case "4":
                howf = "Presse";
                break;
            case "5":
                howf = "autres";
                break;
            default:
                howf = "";
                break;
        }
        const NewContactForm = new ContactForm({ companyName: data.companyName,fullname: data.firstname + " " + data.secondname,email: data.email,howFind: howf,interest: int })

        NewContactForm.save()
            .then(contactForm => {
                res.render("contact",{ msg: "Votre ",type: "error" })
            })
            .catch(err => {
                res.render("contact",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes ",type: "error" })

            })
    }
    else {
        res.render("contact",{ msg: "Oooops! quelque chose s'est mal passé! Veuillez réessayer dans quelques minutes ",type: "error" })

    }



})

module.exports = router;
