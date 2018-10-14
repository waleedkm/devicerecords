var    middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","PLease login first")
    res.redirect("/login");
};



module.exports = middlewareObj;