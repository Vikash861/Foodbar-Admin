const Product = require('../models/products')

const homeController = (req, res) => {
    Product.find({}).sort({ _id: -1 }).exec()
        .then((products) => {
            res.render('index', { products: products})
        })
        .catch(err => {
            res.status(500).send('Internal Server Error');
        })
}

module.exports = homeController