const { httpErrors, httpSuccess, baseURL } = require("../constents");
const stockController = require("../Stock/StockController");
const ProductModel = require("./ProductModel");

class ProductController extends ProductModel {
    constructor() {
        super()
        this.addProduct = this.addProduct.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.listProducts = this.listProducts.bind(this)
        this.getProductById = this.getProductById.bind(this)
    }
    async addProduct(req, res) {
        const { title, name, content, price, discription, benefits, productImage, userId, qty, category } = req.body

        if (!title || !name || !price || !userId || !productImage || !category) throw httpErrors[400]
        let reuslt = await this.model.create({ title, name, content, price, productImage, discription, benefits, category })
        if (!reuslt) throw httpErrors[500]
        reuslt = reuslt._doc
        await stockController.createOrUpdateStock({ productId: reuslt._id, userId, qty })
        return res.status(200).send({ message: httpSuccess })
    }
    async updateProduct(req, res) {
        const { title, _id, name, content, userId, price, productImage, discription, benefits, category, qty } = req.body
        if (!title || !name || !price || !userId || !productImage) throw httpErrors[400]
        let result = await this.model.updateOne({ _id: _id }, { productImage, title, name, content, benefits, discription, price, category })
        if (!result) throw httpErrors[500]
        result = await stockController.createOrUpdateStock({ productId: _id, userId, qty })
        return res.status(200).send({ message: httpSuccess })
    }

    async deleteProduct(req, res) {
        const { id } = req.params
        const result = await this.model.deleteOne({ _id: id })
        if (!result || !result.deletedCount <= 0) throw httpErrors[200]
        return res.status(200).send({ message: httpSuccess })
    }

    async listProducts(req, res) {
        const result = await this.model.find().populate([{ path: "category"}, {path: "productImage", select: { url: {$concat:[baseURL, "$path"]} } }])
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async getProductById(req, res) {
        const { id } = req.params
        const { adminId } = req.query
        let result = await this.model.findOne({ _id: id }).populate([{ path: "category" }, { path: "productImage", select: { url: {$concat:[baseURL, "$path"]} } }])
        if (!result) throw httpErrors[500]
        let qty = null
        if (adminId) {
            qty = await stockController.model.findOne({ productId: id, userId: adminId })
            if (qty) qty = qty._doc.qty
        }
        return res.status(200).send({ message: httpSuccess, data: { ...result._doc, qty } })
    }

   


}

const productController = new ProductController()

module.exports = productController