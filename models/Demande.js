const mongoose = require("mongoose");

var Schema = mongoose.Schema;

var DemandeSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userID: {type: String, required: true},
    mailAddress: {type: String, required: true},
    phone: {type: String, required: true},
    fixe: {type: String, required: true},
    job: {type: String, required: true},
    address1: {type: String, required: true},
    Address2: {type: String},
    city: {type: String, required: true},
    country: {type: String, required: true},
    status:{type: String, required: true}
}, {timestamps: true});


DemandeSchema.statics.getAllDemande= async function (userID) {

    let Demande = await this.find({
        userID:userID       
    });

    if (!Demande) {
        return 'not exist demnandeee'
    }

    return Demande;
};

DemandeSchema.statics.getDemandes= async function () {
    let Demande = await this.find({ status:"En cours de traitement" });
    if (!Demande) {
        return 'not exist'
    }

    return Demande;
};

DemandeSchema.statics.updateStatus = async function (demandeID,newStatus) {
    let Demande = await this.updateOne({_id:demandeID},
        {status : newStatus }
        );
    if (!Demande) {
        return 'not exist'
    }

    return "update status with succes";
}

DemandeSchema.statics.deleteDemande= async function (demandeID) {
    let Demande = await this.deleteOne({
        _id:demandeID       
    });
    if (!Demande) {
        return 'not exist'
    }

    return Demande;
};



module.exports = mongoose.model("Demande", DemandeSchema);
