var Job= require('../models/Job');

function getAllJob(req, res, next) {
    Job.getAllJob().then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}


function getAllSpecialtyOfJob(req, res, next) {
    let jobName=req.query.jobName
    Job.getAllSpecialtyOfJob(jobName).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}


module.exports = {
    getAllJob,
    getAllSpecialtyOfJob
   
};