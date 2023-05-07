const mongoose = require("mongoose");


var Schema = mongoose.Schema;

var JobSchema = new Schema({
    jobName: {type: String, required: true, unique: true},
    jobPicture: {type: String, required: true},
    specialty: [{
        specialtyName: {type: String},
        specialtyPicture: {type: String},
        specialtyProfil: [{idProfil: {type: String,}}]
    }],
}, {timestamps: true});


JobSchema.statics.getAllJob = async function () {
    let Job = await this.find({},{specialty:0});
    if (!Job) {
        return 'not exist'
    }

    return Job;
};

JobSchema.statics.getAllSpecialtyOfJob = async function (jobName) {
    let Job = await this.find({jobName:jobName},{_id:0,jobName:0, jobPicture:0
    });
    if (!Job) {
        return 'not exist'
    }

    return Job;
};

JobSchema.statics.getProfilIdOfSpecialty = async function (job) {
    let Job = await this.findOne({jobName:job }, {"specialty.specialtyProfil._id":0});
    if (!Job) {
        return 'not exist Job'
    }

    return Job;
};

JobSchema.statics.addProfilToJob = async function (jobName,specialty,profilID) {
    let addprofilID= await this.updateOne({jobName:jobName,specialty:{$elemMatch :{specialtyName:  specialty}}}, {
        $push: {"specialty.$.specialtyProfil":{
                idProfil:profilID
            }}
    }).then().catch(err => {
        winston.error("addProfilToJob error:", err.message);
    });

    return addprofilID;

};

module.exports = mongoose.model("Job", JobSchema);













