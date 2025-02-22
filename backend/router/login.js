const express = require('express');
const router = express.Router();
const { checkQuery, checkBody } = require('../middleware/validators');
const { basicAuth } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');
const { authenticateUser } = require('../controller/login');

router.post('/', // create user
    basicAuth,
    checkBody(['email', 'password']),
    authenticateUser
);

module.exports = router;