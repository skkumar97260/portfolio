const express=require('express');
const router=express.Router();
const {saveEducation,getEducation,getSingleEducation,updateEducation,deleteEducation}=require('../controller/education');
const {checkQuery,checkBody}=require('../middleware/validators');
const {basicAuth}=require('../middleware/basicauth');
const {checkSession}=require('../middleware/tokenManager');



router.post('/',//create education
    basicAuth,
    checkBody(['education','academicPlace','academicName','academicYear','academicPercentage']),
    saveEducation,
     // checkSession,
);

router.get('/',//get all education
    basicAuth,
    getEducation,
     // checkSession,
);

router.get('/getsingleEducation',
    basicAuth,
    checkQuery(['_id']),
    getSingleEducation,
     // checkSession,
);

router.put('/',//update education
    basicAuth,
    checkBody(['_id','education','academicPlace','academicName','academicYear','academicPercentage']),
    updateEducation,
     // checkSession,
);

router.delete('/',//delete education
    basicAuth,
    checkQuery(['_id']),
    deleteEducation,
     // checkSession,
);
module.exports=router