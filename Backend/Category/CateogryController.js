const { httpErrors, httpSuccess } = require("../constents");
const CategoryModel = require("./CategoryModel");

class CategoryController extends CategoryModel {
    constructor(){
        super()
        this.createCategory= this.createCategory.bind(this)
        this.updateCategory =this.updateCategory.bind(this)
        this.deleteCategory =this.deleteCategory.bind(this)
        this.listCategory = this.listCategory.bind(this)
    }
    async createCategory(req, res) {
        const { name, alias } = req.body
        if (!name || !alias) throw httpErrors[400]
        const reuslt = await this.model.create({ name, alias })
        if (!reuslt) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }

    async updateCategory(req, res) {
        const { name, alias, _id } = req.body
        if (!name || !alias || !_id) throw httpErrors[400]
        const result = await this.model.updateOne({ _id: _id }, { name, alias })
        if (!result || result.modifiedCount <= 0) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }

    async deleteCategory(req, res) {
        const { id } = req.params
        const result = await this.model.deleteOne({ _id: id })
        if (!result || result.deletedCount <= 0) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
    async listCategory(req, res) {
        const result = await this.model.find()
        if (!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data:result })
    }
}

const categoryController = new CategoryController()

module.exports = categoryController