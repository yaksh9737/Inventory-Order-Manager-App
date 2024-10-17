const { default: mongoose } = require("mongoose");

class StockModel {
    constructor() {
        this.schema = new mongoose.Schema({
            productId: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_products" },
            userId: { type: mongoose.Types.ObjectId, required: true, ref: "tbl_users" },
            qty: { type: Number, default: 0, min: [0, 'NO STOCK AVAILABEL'] },
            sellingPrice : { type:Number , default:0}
        }, { timestamps: true })
        this.schema.index({ userId: 1, productId: 1 }, { unique: true })
        this.model = mongoose.model("tbl_stocks", this.schema)
    }

   
}

module.exports = StockModel