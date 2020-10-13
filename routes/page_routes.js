const express = require('express');
const router = express.Router();

router.get("/",(req,res) => {
    // res.send("welcome")
    res.render("home")
})

router.get("/dashboard",(req,res) => {
    // show number of times user vistied dashboard
    // req.session.views = req.session.views ? req.session.views  + 1 : 1;
    // res.json(req.session.views)
    // made some changes

    res.render("dashboard")
})

module.exports = router