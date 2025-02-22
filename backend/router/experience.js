const express = require('express');
const router = express.Router();
const { saveExperience, getExperience, getsingleExperience, deleteExperience,updateExperience  } = require('../controller/experience'); // Corrected function name
const { checkQuery, checkBody } = require('../middleware/validators');
const {basicAuth  } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create experience
   basicAuth ,
    checkBody(['year','company','role','description']),
    saveExperience,
    // checkSession
);

router.get('/', // get all experience
   basicAuth ,
    // checkSession,
    getExperience
);

router.get('/getsingleExperience',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    getsingleExperience
);

router.delete('/',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    deleteExperience
);  

router.put('/',
   basicAuth ,
    // checkSession,
    checkBody(['_id','year','company','role','description']),   
    updateExperience,
);

module.exports = router;
