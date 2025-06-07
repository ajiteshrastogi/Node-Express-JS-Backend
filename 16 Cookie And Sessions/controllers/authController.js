exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        isLoggedIn: false
    });
};
exports.postLogin = (req, res, next) => {
    //res.cookie('isLoggedIn', true);
    // this cookie is set for the current session
    req.session.isLoggedIn = true;
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(()=>{
        res.redirect('/');
    });
};
