const paymentController = require('../controller/paymentController');
const myOrders  = require('../controller/myOrders');
const addProductController = require('../controller/addProductController');
const homeController = require('../controller/homeController');
const deleteController = require('../controller/deleteController');
const productsController = require('../controller/productsController');
const paymentCash = require('../controller/paymentCash');
const loginController = require('../controller/loginController');
const regsisterController = require('../controller/regsisterController');

module.exports = {regsisterController,paymentController,myOrders,addProductController,homeController,deleteController,productsController,paymentCash, loginController}