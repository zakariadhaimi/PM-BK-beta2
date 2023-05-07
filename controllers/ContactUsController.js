var ContactUS = require('../models/ContactUS');

function addMessage(req, res,next) {
console.log("jesuis la");
    let Contact= new ContactUS(req.body);
   
    Contact.save(function (err,data) {
        if (err) res.send(err);
        else  res.send(data)

    });

  

}




function getAllMessage(req, res,next) {
    ContactUS.getAllMessage().then(data => {
        res.json(data)
    })
        .catch(err => {
            next(err)
        });

}



module.exports = {
    addMessage,
    getAllMessage
};
