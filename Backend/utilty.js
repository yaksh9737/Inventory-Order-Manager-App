const { default: mongoose } = require("mongoose")
const { DB_URL } = require("./constents")

module.exports = {
    async connectDb() {
        try {
            await mongoose.connect(DB_URL)
            console.log("Db Connected")
        } catch (error) {
            console.log(error)
            console.log("Db Connection Loss")
        }
    }
}