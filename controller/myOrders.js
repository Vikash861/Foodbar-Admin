const Order = require('../models/order');

const myOrders = async (req, res) => {
    const email = req.body.data.email
    // console.log(email)

    try {
        const data = await Order.find({email})
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({ status: 500, message: "Internal Server Error" })
    }
}

module.exports = myOrders