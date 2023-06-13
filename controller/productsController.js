
const Product = require('../models/products')

const productsController = async (req,res) => {
    try {
        let products = await Product.find({})
        res.status(200).send({data : products})
    } catch (error) {
        res.status(500).send({message:"Internal Server Error"})
    }
}

module.exports = productsController;