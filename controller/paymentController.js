const Order = require('../models/order');
const configureStripe = require('stripe');
const stripe = configureStripe(process.env.STRIPE_SECRET_KEY);

const paymentController = async (req, res) => {
    try {
        // Creating order in database
        
        const newOrder = new Order({
            name: req.body.user.name,
            email: req.body.user.email,
            phone: req.body.phone,
            address: req.body.address,
            paymentMethod: "card",
            price: Math.round(req.body.amount),
            items: req.body.items.map(item => {
                return {
                    key: item.name,
                    value: JSON.stringify(item),
                };
            })
        });

        const savedOrder = await newOrder.save();

        // Creating payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            description: req.body.description,
            amount: Math.round(req.body.amount),
            currency: req.body.currency,
            payment_method_data: {
                type: 'card',
                card: {
                    token: req.body.source
                }
            },
            confirm: true
        });

        res.status(200).send({
            status: 'succeeded',
            message: 'Payment successful',
            paymentIntent,
            order: savedOrder
        });
    } catch (error) {


        if (error.type === 'StripeCardError') {
            res.status(400).send({
                status: 'failed',
                message: 'Payment failed: Card declined',
                error
            });
        } else if (error.type === 'StripeInvalidRequestError') {
            res.status(400).send({
                status: 'failed',
                message: 'Payment failed: Invalid request',
                error
            });
        } else {
            res.status(500).send({
                status: 'failed',
                message: 'Payment failed',
                error
            });
        }
    }
};

module.exports = paymentController;

