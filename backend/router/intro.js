const express = require('express');
const router = express.Router();
const { saveIntro, getIntro , getsingleIntro, updateIntro, deleteIntro} = require('../controller/intro'); // Corrected function name
const { checkQuery, checkBody } = require('../middleware/validators');
const {basicAuth  } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create intro
   basicAuth ,
    checkBody(['title','image', 'firstName', 'lastName', 'caption', 'description']),
    saveIntro,
    // checkSession
);

router.get('/', // get all intro
   basicAuth ,
    // checkSession,
    getIntro
);

router.get('/getsingleIntro',
   basicAuth ,  
    // checkSession,
    checkQuery(['_id']),
    getsingleIntro
);

router.put('/', // update intro
   basicAuth ,
    checkBody(['_id', 'title','image',  'firstName', 'lastName', 'caption', 'description']),
    updateIntro,
    // checkSession
);

router.delete('/', // delete intro
   basicAuth ,
    checkQuery(['_id']),
    deleteIntro,
    // checkSession
);

module.exports = router;