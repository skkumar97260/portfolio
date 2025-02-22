const express = require('express');
const router = express.Router();
const { saveUser, getUser, getsingleUser } = require('../controller/user');
const { checkQuery, checkBody } = require('../middleware/validators');
const { basicAuth } = require('../middleware/basicauth'); // Import basicAuthUser correctly
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create user
    basicAuth,
    checkBody(['email']),
    saveUser,
);

router.get('/', // get all user
    basicAuth,
    checkSession,
    getUser
);

router.get('/getsingleUser',
    basicAuth,
    checkSession,
    checkQuery(['_id']),
    getsingleUser)
module.exports = router;
