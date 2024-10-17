const express = require("express")
const cors = require("cors")
const fileUpload = require('express-fileupload')
const userRouter = require("./User/UserRouter")
const { connectDb } = require("./utilty")
const categoryRouter = require("./Category/CategoryRouter")
const productRouter = require("./Product/ProductRouter")
const orderRouter = require("./Order/OrderRouter")
const mediaRouter = require("./Media/MediaRouter")
const { httpSuccess } = require("./constents")
const fs=  require('fs')
const stockRouter = require("./Stock/StockRouter")
const asyncHandeler = require("express-async-handler")
const dashboardRouter = require("./Dashboard/DashboardRouter")
const userController = require("./User/UserController")

connectDb()
const app = express()



app.use(express.json())
app.use(cors())
app.use(fileUpload())
app.use("/public", express.static("./public"))

app.get("/city", (req,res) => {
    fs.readFile("./citys.json", (err,data) => {
        let citys = JSON.parse(data.toString())
        citys = citys.map((x) => x.city)
        return res.status(200).send({message:httpSuccess, data:citys})
    })
})

app.use("/user", userRouter)
app.use(asyncHandeler(userController.AuthGard))
app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/order", orderRouter)
app.use("/media", mediaRouter)
app.use("/stock", stockRouter)
app.use("/dashboard", dashboardRouter)


app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.send({
        message: err.message,
        error: err.stack
    });
});



app.listen(8050, () => {
    console.log("Server stared")
})