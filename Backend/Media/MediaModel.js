const { default: mongoose } = require("mongoose");

class MediaModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String,required:true },
            path:{type:String ,required:true },
        }, {
            timestamps:true
        })
        this.model = mongoose.model("tbl_medias", this.schema)
    }
}

module.exports = MediaModel