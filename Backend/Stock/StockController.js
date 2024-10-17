const { httpErrors, httpSuccess, roles, baseURL } = require("../constents");
const StockModel = require("./StockModel");

class StockController extends StockModel {
    constructor() {
        super()
        this.updateStock = this.updateStock.bind(this)
        this.listStock = this.listStock.bind(this)
        this.getStockDetails = this.getStockDetails.bind(this)
        this.getStockById = this.getStockById.bind(this)
    }

    async createOrUpdateStock({ productId, userId, qty }) {
        let result = await this.model.findOne({ productId, userId })
        if (!result) result = await this.model.create({ productId, userId, qty });
        if (!result) throw httpErrors[500];
        result = await this.model.updateOne({ productId, userId }, { qty })
        if (!result || result.modifiedCount <= 0) throw httpErrors[500]
        return result;
    }
    async migrateStock({ productId, orderedFor, orderedBy, qty }) {
        let result = await this.model.findOne({ productId, userId: orderedFor })
        if (!result) throw httpErrors[500]
        result = result._doc
        result = await this.model.updateOne({ _id: result._id }, { qty: result.qty - qty, }, { runValidators: true })
        if (!result || result.modifiedCount <= 0) throw httpErrors[500]
        result = await this.model.findOne({ productId, userId: orderedBy })
        if (!result) result = await this.model.create({ productId, userId: orderedBy, })
        if (!result) throw httpErrors[500]
        result = result._doc
        result = await this.model.findOneAndUpdate({ _id: result._id }, { qty: result.qty + qty }, { runValidators: true, new: true })
        if (!result) throw httpErrors[500]
        return result
    }

    async updateStock(req, res) {
        const { _id, qty, sellingPrice } = req.body
        if (!_id || !qty || !sellingPrice) throw httpErrors[400]
        const result = await this.model.updateOne({ _id }, { qty, sellingPrice })
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
    async listStock(req, res) {
        const { userId } = req.query
        if (!userId) throw httpErrors[400]
        const result = await this.model.find({ userId: userId }).populate([{ path: "productId", populate: [{path:"category"}, { path: "productImage", select: { url: { $concat: [baseURL, "$path"] } } }] }])
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async getStockDetails(req,res){
        const {userId, productId} = req.query
        if(!userId || !productId) throw httpErrors[400]
        let result  = await this.model.findOne({userId, productId})
        if(!result) throw httpErrors[500]
        result = result._doc
        return res.status(200).send({message:httpSuccess, data:result})
    }

    async getStockById(req,res){
        const { id } = req.query
        if(!id) throw httpErrors[400]
        const result = await this.model.findOne({_id:id}).populate([{ path: "productId", populate: [{ path: 'category' }, { path: 'productImage', select: { url: { $concat: [baseURL, "$path"] } } }] }])
        if(!result) throw httpErrors[500]
        return res.status(200).send({message: httpSuccess, data: result})
    }
}

const stockController = new StockController()
module.exports = stockController