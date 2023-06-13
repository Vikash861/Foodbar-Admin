const express = require('express');
const router = express.Router();

const {auth, guest} = require('../middleware');
const {  regsisterController, loginController , paymentController, myOrders, addProductController, homeController, deleteController, productsController, paymentCash } = require('../controller');

router.get('/',  auth, homeController)
// ////////////////////////////////////////////////////AUth////////////////////////////////////
router.get('/login', guest, loginController().loginController)
router.post('/login', guest, loginController().postLoginController)

router.post('/logout', loginController().logout)

// router.get('/register', regsisterController().regsisterController)
// router.post('/register', regsisterController().postRegsisterController)

///////////////////////////////////////////////////////////////////////////////
router.get('/api/products', productsController)

router.post('/payment', paymentController)

router.post('/paymentcash', paymentCash)

router.post('/api/myorders', myOrders)

router.post('/api/addproduct', addProductController)

router.delete('/api/product/:id', deleteController)

module.exports = router