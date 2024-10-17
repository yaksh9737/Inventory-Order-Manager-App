const { httpErrors, httpSuccess, JWT_SACRATE } = require("../constents");
const UserModel = require("./UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class UserController extends UserModel {
    constructor() {
        super();
        this.createUser = this.createUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.listUser = this.listUser.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.AuthGard = this.AuthGard.bind(this)

    }
    async AuthGard(req, res, next) {
        try {
            const { token } = req.headers
            if (!token) throw httpErrors[401]
            jwt.verify(token, JWT_SACRATE)
            next()
        } catch (error) {
            error = new Error(error)
            error.status = 401
            throw error
        }
    }
    async createUser(req, res) {
        let { fullName, phone, password, role, city } = req.body
        if (!fullName || !phone || !password || !city || Number(role) === NaN) throw httpErrors[400]
        password = bcrypt.hashSync(password, 8)
        const reuslt = await this.model.create({ fullName, city, phone, password, role })
        if (!reuslt) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
    async deleteUser(req, res) {
        const { id } = req.params
        const reuslt = await this.model.deleteOne({ _id: id })
        if (!reuslt || reuslt.deletedCount <= 0) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess })
    }
    async listUser(req, res) {
        const result = await this.model.find({ ...req.query })
        if (!result) httpErrors[500]
        return res.status(200).send({ message: httpSuccess, data: result })
    }
    async loginUser(req, res) {
        const { phone, password } = req.body
        if (!phone || !password) throw httpErrors[400]
        let result = await this.model.findOne({ phone: phone })
        if (!result) {
            const err = new Error("User Not Exist!")
            err.status = 403
            throw err
        }
        result = result._doc
        if (!bcrypt.compareSync(password, result.password)) {
            const err = new Error("Password And Email Are Not Match!")
            err.status = 403
            throw err
        }
        delete result.password
        let adminDetails = null
        if (result.role === 1) {
            adminDetails = await this.model.findOne({ role: 0 })
        }
        if(result.role === 2){
            adminDetails = await this.model.findOne({city: result.city, role: 1})
        }
        adminDetails = adminDetails?._doc
        delete adminDetails?.password
        const token = jwt.sign({ ...result, adminDetails: adminDetails || null }, JWT_SACRATE, { expiresIn: "1d" })
        if (!token) throw httpErrors[500]
        return res.status(200).send({ message: httpSuccess, token: token })
    }
}

const userController = new UserController()

module.exports = userController