var Demande = require('../models/Demande');

function addDemande(req, res,next) {

    let demande= new Demande(req.body);
   
    demande.save(function (err,data) {
        if (err) res.send(err);
        else  res.send(data)

    });

  

}

function getDemandes(req, res,next) {
    Demande.getDemandes().then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}


function getAllDemande(req, res,next) {
    let userID= req.query.userID;
    Demande.getAllDemande(userID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function updateStatus(req, res,next) {
console.log(req.body);
    let demandID= req.body.demandeID;
    let status= req.body.status;

    Demande.updateStatus(demandID,status).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}



function deleteDemande(req, res,next) {
    let demandeID= req.query.demandeID;
    Demande.deleteDemande(demandeID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}


module.exports = {
    addDemande,
    getDemandes,
    updateStatus,
    getAllDemande,
    deleteDemande
};
