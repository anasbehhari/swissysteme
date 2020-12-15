const router = require('express').Router();
const product = require("../../models/Product");
router.get("/",(req,res) => {
    product.find({}).select("-productImage")
        .then(products => res.status(200).json(products))
        .catch(err => res.status(500).json({ err }))


})

module.exports = router;