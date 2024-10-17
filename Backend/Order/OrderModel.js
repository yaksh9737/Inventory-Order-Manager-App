const { default: mongoose } = require("mongoose");
const { baseURL } = require("../constents");

class OrderModel {
    constructor() {
        this.schema = new mongoose.Schema({
            orderedFor: { type: mongoose.Types.ObjectId, ref: 'tbl_users', required: true },
            orderedBy: { type: mongoose.Types.ObjectId, ref: "tbl_users", required: true },
            lastActionedBy: { type: mongoose.Types.ObjectId, ref: 'tbl_users', required: true },
            productId: { type: mongoose.Types.ObjectId, ref: "tbl_products", required: true },
            address: { type: String, default: '' },
            paymentStatus: { type: Number, default: 0 },
            orderStatus: { type: Number, default: 0 },
            deliveryStatus: { type: Number, default: 0 },
            paymentMethod: { type: Number, default: 1 },
            qty: { type: Number, default: 1 },
            totalAmount: { type: Number, required: true },
            deliveryDue: { type: Date, required: true },
        }, { timestamps: true })
        this.model = mongoose.model("tbl_orders", this.schema)
    }

    async showOrderRoom(filter) {
        const paths = [
            { path: "orderedBy", match: { role: filter.role, city: filter.city } },
            { path: "orderedFor" },
            { path: "productId", populate: [{ path: 'category' }, { path: "productImage", select: { url: { $concat: [baseURL, "$path"] } } }] },
        ]
        if (!filter.city) delete paths[0].match.city;
        delete filter.city
        delete filter.role
        // filter.orderedBy = { $ne: null }
        const result = await this.model.find({ ...filter }).populate(paths).sort({ createdAt: -1 })
        return result.filter((x) => (x.orderedBy !== null && x.city !== null))
    }
}

module.exports = OrderModel