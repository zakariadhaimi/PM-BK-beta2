var Profil = require('../models/Profil');
var Job = require('../models/Job')


function addProfil(req, res, next) {
    let profil = new Profil(req.body);
    profil.save(function (err, data) {
        if (err) next(err);
        else {
            //console.log("data afafafa" ,data._id, data.specialtyName)
            Job.addProfilToJob(data.jobName, data.specialtyName, data._id).then((re) => {
                //console.log(re)
                if (re["modifiedCount"] === 1) res.json(data)
                else {
                    Profil.deleteProfil(data._id).then(
                        (rede) => {
                            if (rede["deletedCount"] === 1) res.json("ajout profile avec erreur")
                        }
                    )
                }
            })
                .catch(err => {
                    next(err)
                });
        }
    });

}

function getProfilByID(req, res, next) {
    let profilID = req.query.profilID;
    Profil.findProfilByID(profilID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function getAllProfil(req, res, next) {
    Profil.getAllProfil().then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}


function getProfilBySpecialty(req, res, next) {

    let job = req.query.job
    let specialty = req.query.specialty

    Job.getProfilIdOfSpecialty(job).then(data => {

        let listID = []

        if (data != "not exist Job") {

            for (let i = 0; i < data.specialty.length; i++) {
                if (data.specialty[i].specialtyName === specialty) {

                    listID = data.specialty[i].specialtyProfil
                    break
                }
            }

            if (listID.length == 0) res.json("not found specialty")
            
        } else {
            res.json(data)
        }

        if (listID.length > 0) {
            let listIDFiltred = []
            for (let i = 0; i < listID.length; i++) {
                listIDFiltred.push(listID[i].idProfil)
            }
            if (listIDFiltred.length == listID.length) {
                Profil.getProfilBySpecialty(listIDFiltred)
                    .then(data => res.json(data))
                    .catch(err => console.log(err))
            }

        }



    })
        .catch(err => {
            next(err)
        })

}





function updateRating(req, res, next) {
    let profilID = req.query.profilID;
    let userID = req.query.userID;
    var data = req.body
    Profil.updateRating(profilID, userID, data.value).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function addComment(req, res, next){ 
    let profilID = req.query.profilID;
    let data = req.body

    Profil.addComment(profilID, data).then(data => {
        let comment = data.comments[data.comments.length - 1]
        res.json(comment)
    })
        .catch(err => {
            next(err)
        });
       


}


function updateComment(req, res, next) {
    let profilID = req.query.profilID;
    let commentID = req.query.commentID
    let data = req.body

    Profil.updateComment(profilID, commentID, data).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function deleteComment(req, res, next) {
    let profilID = req.query.profilID;
    let commentID = req.query.commentID

    Profil.deleteComment(profilID, commentID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function updateLike(req, res, next) {
    let profilID = req.query.profilID;
    let commentID = req.query.commentID
    let userID = req.query.userID


    Profil.updateLike(profilID, commentID, userID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}

function updateDisLike(req, res, next) {
    let profilID = req.query.profilID;
    let commentID = req.query.commentID
    let userID = req.query.userID


    Profil.updateDisLike(profilID, commentID, userID).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}



module.exports = {
    addProfil,
    getProfilByID,
    getAllProfil,
    getProfilBySpecialty,
    updateRating,
    addComment,
    updateComment,
    deleteComment,
    updateLike,
    updateDisLike,


};
