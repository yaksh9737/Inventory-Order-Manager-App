const { default: mongoose } = require("mongoose");

class UserModel {
    constructor() {
        this.schema = new mongoose.Schema({
            fullName: { type: String },
            phone: { type: String, length: 10, unique: true },
            password: { type: String, required: true },
            role: { type: Number, required: true },
            city: { type: String, required: true }
        }, { timestamps: true })
        // this.schema.index({ city: 1 }, { unique: true, partialFilterExpression: { role: 1 } });
        this.model = mongoose.model("tbl_users", this.schema)
        this.model.collection.createIndex(
            { city: 1 },
            { unique: true, partialFilterExpression: { role: 1 } }
        );
    }

    async getUserById(id){
        const result = await this.model.findOne({_id:id})
        if (!result) throw httpErrors[500];
        return result
    }
}

module.exports = UserModel