const { Router } = require("express");
const orderController = require("./OrderController");
const asyncHandeler = require("express-async-handler")


const orderRouter = Router()

orderRouter.post("/create", asyncHandeler(orderController.createOrder))
orderRouter.put("/update", asyncHandeler(orderController.updateOrder))
orderRouter.get("/list", asyncHandeler(orderController.listOrder))
orderRouter.delete("/:orderId", asyncHandeler(orderController.removeOrder))
orderRouter.get("/details/:id", asyncHandeler(orderController.getOrderDetails))

module.exports = orderRouter