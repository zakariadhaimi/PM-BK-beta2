var express = require('express');
var router = express.Router();

const { getUser,
    addUser,
    getPaswword,
    getComments,
    userSignin,
    updatePassword,
    getUserForPassword,
    addComment,
    deleteComment,
    conffirmWithEmail,
    checkAndSendCode,
    resetPassword 
} = require('../controllers/userController');
const { isAuth } = require('../controllers/authen');

router.post("/addUser", addUser);
router.post("/updatePassword",isAuth, updatePassword);
router.post('/signIn', userSignin)
router.get("/getUser", getUser);
router.get("/getPassword", getPaswword);
router.get("/getComments",isAuth, getComments);
router.post("/getUserForPassword", getUserForPassword);
router.post("/addComment",isAuth, addComment);
router.delete("/deleteComment", isAuth,deleteComment);
router.post('/conffirmWithEmail', conffirmWithEmail)
router.post('/resetPassword', resetPassword)
router.get('/checkAndSendCode',checkAndSendCode)




module.exports = router;
