var express = require('express');
var router = express.Router();

const { addMessage, getAllMessage }= require( '../controllers/ContactUsController');

router.post("/addMessage",addMessage );
router.get("/getAllMessage", getAllMessage );

module.exports = router;
