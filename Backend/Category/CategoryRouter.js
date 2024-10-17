const { Router } = require("express");
const categoryController = require("./CateogryController");
const asyncHandeler = require("express-async-handler")

const categoryRouter = Router()

categoryRouter.get("/list",asyncHandeler(categoryController.listCategory))
categoryRouter.post("/create",asyncHandeler(categoryController.createCategory))
categoryRouter.put("/update",asyncHandeler(categoryController.updateCategory))
categoryRouter.delete("/:id",asyncHandeler(categoryController.deleteCategory))


module.exports = categoryRouter