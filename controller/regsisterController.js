const User = require('../models/user')
const bcrypt = require('bcrypt')

const regsisterController = () => {
    return {
        regsisterController(req, res) {
            res.render('register')
        },

        async postRegsisterController(req, res) {
            const { name, email, password } = req.body

            try {
                // Checking if user is registered
                const existingUser = await User.findOne({ email: email })

                if (existingUser) {
                    return res.send(`<h2>Email alredy exits <a href="/login">Login</a></h2>`)
                }

                // Hash Password
                const hashedPassword = await bcrypt.hash(password, 10)

                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                })

                await user.save()

                // login
                return res.redirect('/login')
            } catch (err) {
                req.flash('error', 'Something went wrong')
                console.log('Something went wrong while processing user registration')
                return res.send(`<h2>Email alredy exits <a href="/Regsiter">Register Again</a></h2>`)
            }
        }
    }
};

module.exports = regsisterController;
