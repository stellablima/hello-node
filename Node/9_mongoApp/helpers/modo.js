module.exports = {
    modo: function(req, res, next){
        if(req.isAuthenticated() && req.user.modo == 1){
            return next();
        }
        req.flash("error_msg", "Você não é um administrador!");
        res.redirect("/");
    }
}