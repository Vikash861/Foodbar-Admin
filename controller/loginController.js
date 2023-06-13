const passport = require('passport');

const loginController = () => {
    return {
        loginController(req, res) {
            res.render('login');
        },

        postLoginController(req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return res.send(`<h2>${info.message} <a href="/login">Login Again</a></h2>`)
                }
                if (!user) {
                    console.log(info)
                    return res.send(`<h2>${info.message} <a href="/login">Login Again</a></h2>`)
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return res.send(`<h2> ${info.message} <a href="/login">Login Again</a></h2>`)
                    }
                    return res.redirect('/');
                });
            })(req, res, next);
        },

        logout(req, res) {
            req.logout(function (err) {
                if (err) {
                    console.error(err);
                }
                res.redirect('/login');
            });
        }

    };
};

module.exports = loginController;
