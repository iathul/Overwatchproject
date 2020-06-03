const router  = require('express').Router()
const { 
    getUserById,
    getUser,
    updateUserProfilePic,
    userLookOutData,
    updateUser,
    updatePassword,
    updateEmail
} = require('../controllers/user');

const {
    isSignedIn,
    isAuthenticated
} = require('../controllers/auth')


router.param("userId",getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/user/getuserlookoutdata/:userId', isSignedIn, isAuthenticated, userLookOutData);
router.put("/user/updateprofilepic/:userId", isSignedIn, isAuthenticated, updateUserProfilePic);
router.put("/user/updateuserdata/:userId",isSignedIn,isAuthenticated,updateUser)
router.put("/user/updatepassword/:userId",isSignedIn,isAuthenticated, updatePassword)
router.put("/user/updateuseremail/:userId",isSignedIn,isAuthenticated, updateEmail)

module.exports = router;