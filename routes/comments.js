var express = require('express');
var router = express.Router();

const { addComment ,getComments , updateStatus}= require( '../controllers/commentsController');

router.post("/addComment",addComment );
router.get("/getComments",getComments );
router.post("/updateStatus",updateStatus );



module.exports = router;
