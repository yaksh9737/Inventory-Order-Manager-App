const { httpErrors, httpSuccess, baseURL } = require("../constents");
const stockController = require("../Stock/StockController");
const userController = require("../User/UserController");
const OrderModel = require("./OrderModel");

class OrderController extends OrderModel {
    constructor() {
        super()
        this.createOrder = this.createOrder.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.listOrder = this.listOrder.bind(this)
        this.getOrderDetails = this.getOrderDetails.bind(this)
        this.removeOrder = this.removeOrder.bind(this)
    }
    async createOrder(req, res) {
        const { productId, orderedFor, orderedBy, qty, lastActionedBy, address, totalAmount } = req.body
        if (!productId || !orderedFor ||!totalAmount || !orderedBy || !qty || !lastActionedBy) throw httpErrors[400]
        const orderedByData = await userController.model.findOne({_id:orderedBy})
        if (!orderedByData) throw httpErrors[500]
        const deliveryDue = new Date()
        deliveryDue.setDate(deliveryDue.getDate() + 2)
        let result
        if (orderedByData.role === 2) {
            result = await this.model.create({ productId, deliveryDue, orderedBy, orderedFor, qty, lastActionedBy, address, totalAmount })
        } else {
            result = await this.model.create({ productId, deliveryDue, orderedBy, orderedFor, qty, lastActionedBy,totalAmount })
        }
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
    async updateOrder(req, res) {
        let { _id, paymentMethod, paymentStatus, orderedBy, orderStatus, deliveryStatus, deliveryDue, lastActionedBy, qty, productId } = req.body
        if (!_id || orderStatus === undefined || !paymentMethod || !qty || !lastActionedBy || paymentStatus === undefined || !orderedBy || !productId || deliveryStatus === undefined || !deliveryDue) throw httpErrors[400]
        deliveryDue = new Date(deliveryDue)
        let result = await this.model.updateOne({ _id }, { orderedBy, productId, paymentMethod, paymentStatus, orderedBy, productId, orderStatus, deliveryStatus, deliveryDue, lastActionedBy, qty })
        if (!result || result.modifiedCount <= 0) throw httpErrors[500]
        result = await this.model.findOne({ _id: _id })
        if (!result) throw httpErrors[500]
        if (result.deliveryStatus === 1) {
            result = await stockController.migrateStock({ productId: result.productId, orderedFor: result.orderedFor, orderedBy: result.orderedBy, qty: result.qty })
            if (!result) throw httpErrors[500]
            return res.status(200).send({ message: httpSuccess, data: result })
        }
        return res.status(200).send({ message: httpSuccess })
    }
    async listOrder(req, res) {
        const { query } = req
        const result = await this.showOrderRoom(query)
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    // async getOrderDetails(req, res) {
    //     const { id } = req.params
    //     let result = await this.model.findOne({ _id: id }).populate([{ path: "orderedFor" }, { path: "orderedBy" }, { path: "lastActionedBy" }, {
    //         path: "productId", populate: { path: 'productImage' }
    //     }])
    //     result = result.toObject()
    //     if (result && result.productId && result.productId.productImage) {
    //         result.productId.productImage.url = baseURL + result.productId.productImage.path;
    //     }
    //     if (!result) throw httpErrors[500]
    //     return res.status(200).send({ message: httpSuccess, data: result })
    // }
    async getOrderDetails(req, res) {
        const { id } = req.params
        let result = await this.model.findOne({ _id: id }).populate([{ path: "orderedFor" }, { path: "orderedBy" }, { path: "lastActionedBy" }, {
            path: "productId", populate: { path: 'productImage' }
        }])
        result = result.toObject()
        if (result && result.productId && result.productId.productImage) {
            result.productId.productImage.url = baseURL + result.productId.productImage.path;
        }
        if (!result) throw httpErrors[500]
        const stockData = await stockController.model.findOne({
            productId: result.productId._id,
            userId: result.orderedFor._id
        });
        if (stockData) result.stockData = stockData;
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async removeOrder(req, res) {
        const { orderId } = req.params
        let result = await this.model.findOne({ _id: orderId })
        if (!result) throw httpErrors[500]
        result = result._doc
        if (result.orderStatus > 0) throw httpErrors[500]
        result = await this.model.deleteOne({ _id: orderId })
        if (!result || result.deletedCount <= 0) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
}

const orderController = new OrderController()
module.exports = orderController