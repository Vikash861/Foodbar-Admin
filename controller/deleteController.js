const Product = require('../models/products')

const deleteController = async (req, res) => {
    try {
        const result = await Product.deleteOne({ _id: req.params.id });
        
        res.status(200).send({status: 'deleted', message: result});
    } catch (err) {
        // console.log(err)
        res.status(500).send({status:500, "message":"Internal Server Error"})
    }
};

module.exports = deleteController;

