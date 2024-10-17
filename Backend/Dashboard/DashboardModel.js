const orderController = require("../Order/OrderController");
const productController = require("../Product/ProductController");
const userController = require("../User/UserController");

class DashboardModel{
    constructor(){
        this.orderModel = orderController.model
        this.userModel = userController.model
        this.productModel = productController.model
    }
}

module.exports = DashboardModel