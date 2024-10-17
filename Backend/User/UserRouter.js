const { Router } = require("express");
const userController = require("./UserController");
const asyncHandeler =require("express-async-handler")

const userRouter =Router()


userRouter.post("/create", asyncHandeler(userController.createUser))
userRouter.delete("/:id", asyncHandeler(userController.deleteUser))
userRouter.get("/list", asyncHandeler(userController.listUser))
userRouter.post("/login", asyncHandeler(userController.loginUser))


module.exports = userRouter