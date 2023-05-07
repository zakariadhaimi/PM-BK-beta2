var express = require('express');
var router = express.Router();

const { addDemande ,getAllDemande, updateStatus ,getDemandes,deleteDemande}= require( '../controllers/DemandeController');
const { isAuth } = require('../controllers/authen');

router.post("/addDemande",isAuth ,addDemande );
router.post("/updateStatus",updateStatus );
router.get("/getAllDemande",  isAuth,getAllDemande );
router.get("/getDemandes",getDemandes );
router.delete("/deleteDemande" ,isAuth, deleteDemande)

module.exports = router;
