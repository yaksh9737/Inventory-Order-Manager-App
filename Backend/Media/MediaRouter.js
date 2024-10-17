const { Router } = require("express");
const asyncHandeler = require("express-async-handler")
const mediaController = require("./MediaController")

const mediaRouter = Router()

mediaRouter.post("/upload", asyncHandeler(mediaController.uploadMedia))
mediaRouter.get("/", asyncHandeler(mediaController.getMedia))
// orderRouter.put("/update", asyncHandeler(orderController.updateOrder))
// orderRouter.get("/:id", asyncHandeler(orderController.getOrderDetails))
// orderRouter.get("/list", asyncHandeler(orderController.listOrder))


module.exports = mediaRouter