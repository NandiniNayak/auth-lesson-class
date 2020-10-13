const express = require('express');
const router = express.Router();
const {registerCreate, registerNew , logOut, loginNew, loginCreate} = require('../controllers/auth_controller')
const {authRedirect} = require("../middleware/auth_middleware")


router.get('/register', authRedirect, registerNew)

router.post('/register', registerCreate)

router.get('/logout', logOut)

router.get("/login", authRedirect, loginNew )
router.post("/login", loginCreate )
// changes

module.exports = router