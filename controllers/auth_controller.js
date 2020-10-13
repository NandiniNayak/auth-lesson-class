const UserModel = require("../models/user");

const registerNew = (req,res) => {
    res.render("auth/register")
}

const registerCreate = async (req, res) =>{
    //    res.json(req.body)
    // save the req.body to database user collection
    const {email, password} = req.body
    const user = await UserModel.create({email, password})
    // attach the registered user to the session
    req.session.user = user
    console.log(req.session.user)
    res.redirect("/dashboard")
}

const logOut =(req,res) =>{
    req.session.destroy(() => {
        res.redirect("/")
    })
}

const loginNew = (req,res) => {
        res.render("auth/login")
}
const loginCreate = async (req,res) => {
    // res.json(req.body)
    // fetch the user
    // verify password and redirect to dashboard
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
        return res.render("auth/login", {error: "invalid email and password" })
    }
    const valid = await user.verifyPassword(password)
    if(!valid){
        return res.render("auth/login", {error: "invalid password" })
    }
    req.session.user = user
    res.redirect("/dashboard")
}

module.exports = {
    registerNew,
    registerCreate,
    logOut,
    loginNew,
    loginCreate
}