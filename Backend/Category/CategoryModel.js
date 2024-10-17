const { default: mongoose } = require("mongoose");

class CategoryModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String,required:true },
            alias:{type:String ,required:true, unique:true},
        }, {
            timestamps:true
        })
        this.model = mongoose.model("tbl_categoreis", this.schema)
    }
}

module.exports =CategoryModel