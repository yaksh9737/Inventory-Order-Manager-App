const { Router } = require("express");
const productController = require("./ProductController");
const asyncHandeler = require("express-async-handler")

const productRouter =Router()

productRouter.get("/list", asyncHandeler(productController.listProducts))
productRouter.get("/details/:id", asyncHandeler(productController.getProductById))
productRouter.post("/add", asyncHandeler(productController.addProduct))
productRouter.put("/update", asyncHandeler(productController.updateProduct))
productRouter.delete("/:id", asyncHandeler(productController.deleteProduct))

module.exports = productRouter