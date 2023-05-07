const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProfilSchema = new Schema({
    FirstName: {type: String, required: true},
    LastName: {type: String, required: true},
    jobName: {type: String, required: true},
    specialtyName: {type: String, required: true},
    adresse: {type: String, required: true},
    phone: {type: String, required: true},
    ratings: [{userID: {type: String,}, value: {type: Number}}],
    comments: [{
        userID: {type: String, required: true},
        FirstName: {type: String, required: true},
        LastName: {type: String, required: true},
        comment: {type: String},
        like: [{userID: {type: String}}],
        dislike: [{userID: {type: String}}],
        date: {type: Date, required: true},
        reference:{type: String}
    }],
}, {timestamps: true});


ProfilSchema.statics.findProfilByID = async function (profilID) {
    let Profil = await this.findOne(
        {_id: profilID} 
    );
    if (!Profil) {
        return 'not exist'
    }

    return Profil;
};

ProfilSchema.statics.getAllProfil = async function () {
    let Profil = await this.find( {},{adresse:0,comments:0,phone :0,createdAt:0,updatedAt:0,__v:0});
    if (!Profil) {
        return 'not exist'
    }

    return Profil;
};

ProfilSchema.statics.getProfilBySpecialty = async function (list) {
    let Profil = await this.find({ _id: { $in: list } },{adresse:0,comments:0,createdAt:0,updatedAt:0,__v:0});
    if (!Profil) {
        return 'profil not exist'
    }

    return Profil;
};



ProfilSchema.statics.updateRating = async function (profilID, userID, value) {
    //if exist update if not exist insert
    let result1 = await this.findOne({
        _id: profilID,
        ratings: {$elemMatch: {userID: userID}}
    }).updateOne({$pull: {ratings: {userID: userID}}});


    if (value != 0) {
        let result2 = await this.updateOne({_id: profilID}, {
            $push: {ratings: {userID: userID, value: value}}

        });
        console.log(result2);
    }


    console.log(result1);


};

ProfilSchema.statics.addComment = async function (profilID, data) {

    let comment = await this.findOneAndUpdate({_id: profilID}, {
        $push: {
            comments: {
                userID: data.userID,
                FirstName: data.FirstName,
                LastName: data.LastName,
                comment: data.comment,
                date:data.date,
                reference:data.reference
            }
        }
    },{new: true})

return comment

};

ProfilSchema.statics.updateComment = async function (profilID, commentID, data) {

   
    let comment = await this.updateOne({_id: profilID, comments: {$elemMatch: {_id: commentID}}}, {
        "comments.$": {
            comment: data.comment,
            like: [],
            dislike: []
        },

    }).then().catch(err => {
        winston.error("updateComment error:", err.message);
    });

    return comment;

};



ProfilSchema.statics.updateLike = async function (profilID, commentID, userID) {

    //if exist delete if not exist insert
    let result1 = await this.findOne(
        {_id: profilID, comments: {$elemMatch: {_id: commentID, like: {$elemMatch: {userID: userID}}}}}
    ).updateOne({$pull: {"comments.$.like": {userID: userID}}});

    if (result1.modifiedCount !=1) {
        let result2 = await this.updateOne({_id: profilID, comments: {$elemMatch: {_id: commentID}}}, {
            $push: {"comments.$.like": {userID: userID}}

        });
        console.log("r2", result2);

    }

   
    let result3 = await this.findOne(
        {_id: profilID, comments: {$elemMatch: {_id: commentID, dislike: {$elemMatch: {userID: userID}}}}}
    ).updateOne({$pull: {"comments.$.dislike": {userID: userID}}});
    console.log("r3", result3);


};



ProfilSchema.statics.updateDisLike = async function (profilID, commentID, userID) {

    //if exist delete if not exist insert
    let result1 = await this.findOne(
        {_id: profilID, comments: {$elemMatch: {_id: commentID, dislike: {$elemMatch: {userID: userID}}}}}
    ).updateOne({$pull: {"comments.$.dislike": {userID: userID}}});

    if (result1.modifiedCount != 1) {
        let result2 = await this.updateOne({_id: profilID, comments: {$elemMatch: {_id: commentID}}}, {
            $push: {"comments.$.dislike": {userID: userID}}

        });
        console.log("r2", result2);

    }

    console.log("r1", result1);

    let result3 = await this.findOne(
        {_id: profilID, comments: {$elemMatch: {_id: commentID, like: {$elemMatch: {userID: userID}}}}}
    ).updateOne({$pull: {"comments.$.like": {userID: userID}}});
    console.log("r3", result3);


};



ProfilSchema.statics.deleteComment = async function (profilID, commentID) {
    let comment = await this.findOne({_id: profilID, comments: {$elemMatch: {_id: commentID}}}
    ).updateOne({$pull: {"comments": {_id: commentID}}})
    if (!comment) {
        return 'not exist'
    }

    return comment;
};


ProfilSchema.statics.deleteProfil = async function (profilID) {
    let Profil = await this.deleteOne(
        {_id: profilID}
    );
    if (!Profil) {
        return 'not exist'
    }

    return Profil;
};


module.exports = mongoose.model("Profil", ProfilSchema);
