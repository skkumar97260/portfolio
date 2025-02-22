const express = require('express');
const router = express.Router();
const { saveCertification, getCertification, getsingleCertification ,deleteCertification, updateCertification} = require('../controller/certification'); // Corrected function name
const { checkQuery, checkBody } = require('../middleware/validators');
const {basicAuth  } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create user
   basicAuth ,
    checkBody(['image', 'title', 'role', 'description']),
    saveCertification,
    // checkSession
);

router.get('/', // get all user
   basicAuth ,
    // checkSession,
    getCertification
);

router.get('/getsingleCertification',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    getsingleCertification
);

router.delete('/',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    deleteCertification
);

router.put('/',
   basicAuth ,
    // checkSession,
    checkBody(['_id', 'image', 'title', 'role', 'description']),
    updateCertification
);

module.exports = router;