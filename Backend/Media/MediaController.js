const MediaModel = require('./MediaModel');
const { httpErrors, httpSuccess, baseURL } = require("../constents");
const randomstring = require('randomstring')

class MediaController extends MediaModel {
    constructor() {
        super()
        this.uploadMedia = this.uploadMedia.bind(this)
        this.getMedia = this.getMedia.bind(this)
    }   

    async uploadMedia(req,res) {
        const {file} = req.files
        let fileExt =  file.name
        let fileName = randomstring.generate({
            length: 12,
            charset: 'alphabetic'
        });

        let ext = fileExt.split(".");
        ext = ext[ext.length - 1];
        fileName = fileName + "." + ext;
        let filePath = "/public/" + fileName;
        file.mv("." + filePath);

        let result = await this.model.create({name: fileName, path: filePath})
        if(!result) throw httpErrors[500]
        result = result?._doc
        return res.status(200).send({message: httpSuccess, data:{source:baseURL + result.path}})
    }

    async getMedia(req,res){
        const result =await this.model.find().select({
            name: 1,
            path: 1,
            url: { $concat: [baseURL, "$path"] }
        })
        if(!result) throw httpErrors[500]

        return res.status(200).send({ message: httpSuccess, data: result})
    }
}
const mediaController = new MediaController()
module.exports = mediaController