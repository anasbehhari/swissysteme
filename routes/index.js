const express = require('express');
const router = express.Router();
router.get("/",(req,res) => {
    res.render("welcome")
})
router.get("/catalogue",(req,res) => {
    res.render("catalogue")
})
router.get("/contact",(req,res) => {
    res.render("contact")
})

module.exports = router;
