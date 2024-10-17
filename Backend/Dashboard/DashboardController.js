const { default: mongoose } = require("mongoose");
const DashboardModel = require("./DashboardModel");
const { httpSuccess, httpErrors } = require("../constents");

class DashboardController extends DashboardModel {
    constructor() {
        super()
        this.fetchDashboard = this.fetchDashboard.bind(this)
    }

    async fetchDashboard(req, res) {
        const { userId } = req.params
        const result = await this.orderModel.aggregate([
            { $match: { orderedFor: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: "$productId",
                    totalOrders: { $sum: "$qty" }
                }
            },
            {
                $lookup: {
                    from: "tbl_products",
                    foreignField: "_id",
                    localField: "_id",
                    as: "product",
                }
            },
            {
                $unwind: "$product"
            },
            {
                $project: {"totalOrders": true, "product._id": true ,"product.name":true, "product.title":true, _id:false}
            }
        ])
        if(!result) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
}

const dashboradController = new DashboardController()

module.exports = dashboradController