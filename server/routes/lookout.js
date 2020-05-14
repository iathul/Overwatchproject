const router        = require('express').Router()

const {
    getLookOutDataById,
    getLookOutData,
    getAllLookoutData,  
    createLookOutData,
    deleteLookOutData,
    updateLookOutData
} = require('../controllers/lookout')
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const {getUserById} = require('../controllers/user')

router.param("userId",getUserById)
router.param("lookoutDataId",getLookOutDataById)

router.post('/create/:userId',  createLookOutData);
router.get('/getdata/:lookoutDataId',getLookOutData);
router.get('/getalldata',getAllLookoutData)
router.put('/updatedata/:lookoutDataId/:userId', isSignedIn, isAuthenticated, updateLookOutData);
router.delete('/deletedata/:lookoutDataId/:userId',isSignedIn,isAuthenticated,deleteLookOutData);


module.exports = router;