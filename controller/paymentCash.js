const Order = require('../models/order');

const paymentCash = async (req, res) => {
    try {
        // Creating order in database

        const newOrder = new Order({
            name: req.body.user.name,
            email: req.body.user.email,
            phone: req.body.phone,
            address: req.body.address,
            paymentMethod: "cash",
            price: Math.round(req.body.price),
            items: req.body.items.map(item => {
                return {
                    key: item.name,
                    value: JSON.stringify(item),
                };
            })
        });

        const savedOrder = await newOrder.save();

        res.status(200).send({
            status: 'succeeded',
            message: 'Payment successful',
            order: savedOrder
        });


    } catch (error) {
        res.status(500).send({
            status: 'failed',
            message: 'Payment failed',
            error
        });

    }
};

module.exports = paymentCash;

