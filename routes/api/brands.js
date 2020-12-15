const router = require('express').Router();
const brand = require("../../models/Brand");
router.get("/",(req,res) => {
    brand.find({}).select("-brandImage")
        .then(brands => res.status(200).json(brands))
        .catch(err => res.status(500).json({ err }))


})
module.exports = router;