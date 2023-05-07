var Comments= require('../models/Comments');


function addComment(req, res,next) {
  

    console.log(req.body);
    let comment = new Comments(req.body);
   
    comment.save(function (err,data) {
        if (err) res.send(err);
        else  res.send(data)

    });

  

}


function getComments(req, res,next) {
    Comments.findcomments().then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });


}




function updateStatus(req, res,next) {
    let commentID= req.query.commentID;
    let newStatus=req.body.status
    Comments.updateStatus( commentID , newStatus).then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}




module.exports = {
    addComment,
    getComments,
    updateStatus,
};
