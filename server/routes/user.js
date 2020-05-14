const router  = require('express').Router()
const { 
    getUserById,
    getUser,
    updateUser,
    userLookOutData 
} = require('../controllers/user');

const {
    isSignedIn,
    isAuthenticated
} = require('../controllers/auth')


router.param("userId",getUserById)

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);
router.get('/user/getuserlookoutdata/:userId', isSignedIn, isAuthenticated, userLookOutData);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;