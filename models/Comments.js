const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    commentID: {type: String, required: true, unique: true},
    comment: {type: String, required: true},
    userID: {type: String, required: true},
    profilID: {type: String, required: true},
    specialty:{type: String, required: true},
    firstNameProfil: {type: String, required: true},
    lastNameProfil: {type: String, required: true},
    firstNameUser: {type: String, required: true},
    lastNameUser: {type: String, required: true},
    date:{type: Date, required: true},
    status:{type: String, required: true},

}, {timestamps: true});


CommentSchema.statics.findcomments = async function () {
    let Comments = await this.find({
        status: "En cours de traitement",
    });
    if (!Comments) {
        return 'not exist'
    }
    return Comments;
};


CommentSchema.statics.updateStatus = async function (commentID , newStatus) {
    let Comment = await this.updateOne({commentID:commentID},
        {status:newStatus}
    );
    if (!Comment) {
        return 'not exist'
    }

    return Comment;
}





module.exports = mongoose.model("Comments", CommentSchema);
