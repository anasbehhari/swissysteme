const router = require('express').Router();
const categorie = require("../../models/Categorie");
router.get("/",(req,res) => {
    categorie.find({})
        .then(brands => res.status(200).json(brands))
        .catch(err => res.status(500).json({ err }))


})

module.exports = router;