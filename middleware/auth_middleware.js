const authRedirect = (req,res,next) =>{
    if(req.session && req.session.user){
       return  res.redirect("/dashboard")
    }
    // next points to next peice of code that should be executed, could be another middleware or controller function for that route
    return next()
}

module.exports = {
    authRedirect
}