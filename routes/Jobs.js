var express = require('express');
var router = express.Router();

const {getAllJob, getAllSpecialtyOfJob}= require( '../controllers/Jobcontroller');

router.get("/getAllJob",getAllJob );
router.get("/getAllSpecialtyOfJob",getAllSpecialtyOfJob );


module.exports = router;
