const { default: mongoose } = require("mongoose");
const StockModel = require("../Stock/StockModel");

class ProductModel {
    constructor() {
        this.schema = new mongoose.Schema({
            title: { type: String, required: true },
            name: { type: String, required: true, unique: true },
            content: { type: String, default: "" },
            discription: { type: String, default: "" },
            benefits: { type: String, default: "" },
            price: { type: Number, required: true },
            category: { type: mongoose.Types.ObjectId ,required:true ,ref: "tbl_categoreis"},
            productImage:{type : mongoose.Types.ObjectId ,required:true, ref:"tbl_medias"}
        }, { timestamps: true })
        this.model = mongoose.model("tbl_products", this.schema)
    }
}

module.exports = ProductModel