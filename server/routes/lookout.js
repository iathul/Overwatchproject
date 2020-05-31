const router        = require('express').Router()

const {
    getLookOutDataById,
    getLookOutData,
    getAllLookoutData,  
    createLookOutData,
    deleteLookOutData,
    updateLookOutData,
    findbyCrimeNumber
} = require('../controllers/lookout')
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const {getUserById} = require('../controllers/user')

router.param("userId",getUserById)
router.param("lookoutDataId",getLookOutDataById)

router.post('/create/:userId', isSignedIn,isAuthenticated, createLookOutData);
router.get('/getdata/:lookoutDataId',getLookOutData);
router.get('/getalldata',getAllLookoutData);
router.post('/search', findbyCrimeNumber);
router.put('/updatedata/:lookoutDataId/:userId', isSignedIn, isAuthenticated, updateLookOutData);
router.delete('/deletedata/:lookoutDataId/:userId',isSignedIn,isAuthenticated,deleteLookOutData);



module.exports = router;