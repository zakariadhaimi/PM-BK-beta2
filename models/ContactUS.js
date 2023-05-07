const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    email: {type: String, required: true},
    description: {type: String, required: true},
}, {timestamps: true});


ContactSchema.statics.getAllMessage= async function () {

    let Message = await this.find();

    if (!Message) {
        return 'not exist Message'
    }

    return Message;
};




module.exports = mongoose.model("ContactUS",ContactSchema);
