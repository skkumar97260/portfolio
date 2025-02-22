const express = require('express');
const router = express.Router();
const { saveAdmin, getAdmin, getsingleAdmin } = require('../controller/admin');
const { checkQuery, checkBody } = require('../middleware/validators');
const { basicAuth } = require('../middleware/basicauth'); // Import basicAuthAdmin correctly
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create Admin
    basicAuth,
    checkBody(['email']),
    saveAdmin,
);

router.get('/', // get all Admin
    basicAuth,
    checkSession,
    getAdmin
);

router.get('/getsingleAdmin',
    basicAuth,
    checkSession,
    checkQuery(['_id']),
    getsingleAdmin
);

module.exports = router;
