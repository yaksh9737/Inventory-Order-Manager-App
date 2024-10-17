const { Router } = require("express");
const asyncHandeler = require("express-async-handler");
const stockController = require("./StockController");

const stockRouter = Router()

stockRouter.put("/update", asyncHandeler(stockController.updateStock))
stockRouter.get("/list", asyncHandeler(stockController.listStock))
stockRouter.get("/details", asyncHandeler(stockController.getStockDetails))
stockRouter.get("/listbyid", asyncHandeler(stockController.getStockById))

module.exports = stockRouter