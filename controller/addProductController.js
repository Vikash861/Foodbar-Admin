const multer = require('multer')
const upload = require('../config/multerConfig');
const Product = require('../models/products')
const fs = require('fs')
const addProductController = (req, res) => {
    upload.single('product')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(400).json({ error: "file not uploaded" });
        } else if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            // getting data to send to db

            const productDetails = {
                name: req.body.name,
                description: req.body.desc,
                image: req.file.filename,
                price: req.body.price,
                category: req.body.category
            }

            const newProduct = new Product(productDetails)
            newProduct.save()
                .then((data) => {
                    Product.find({}).sort({ _id: -1 }).exec()
                        .then((products) => {
                            res.redirect('/')
                        })
                        .catch(err => {
                            res.status(500).send('Internal Server Error');
                        })
                })
                .catch((err) => {
                    fs.unlink(`./uploads/${req.file.filename}`, (unlinkErr) => {
                        if (unlinkErr) {
                            console.log("Error deleting file:", unlinkErr);
                        }
                    });
                    res.status(500).send({ status: 500, message: "Internal Server Error" });

                })
        }
    })
}

module.exports = addProductController