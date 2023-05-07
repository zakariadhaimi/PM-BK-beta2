var express = require('express');
var router = express.Router();

const {addProfil ,getProfilByID,getAllProfil,getProfilBySpecialty,updateRating,addComment,updateComment,deleteComment,updateLike,updateDisLike,}= require( '../controllers/ProfilController');
const { isAuth } = require('../controllers/authen');

router.post("/addProfil",addProfil );
router.get("/getProfilByID",getProfilByID );
router.get("/getAllProfil",getAllProfil );
router.get("/getProfilBySpecialty",getProfilBySpecialty );
router.post("/updateRating",isAuth,updateRating );
router.post("/addComment",isAuth,addComment);
router.post("/updateComment",updateComment);
router.delete("/deleteComment",isAuth,deleteComment);
router.post("/updateLike", isAuth,updateLike);
router.post("/updateDisLike",isAuth,updateDisLike);

module.exports = router;
