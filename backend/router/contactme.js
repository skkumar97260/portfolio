const express = require('express');
const router = express.Router();
const { addContactme, getContactme ,deleteContactme} = require('../controller/contactme'); // Corrected function name
const { checkQuery, checkBody } = require('../middleware/validators');
const {basicAuth  } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create contact
    basicAuth ,
     checkBody(['name', 'email','mobileNumber', 'message','dateTime']),
     addContactme,
     // checkSession
);

router.get('/', // get all contact
    basicAuth ,
     // checkSession,
     getContactme
);

router.delete('/',
    basicAuth ,
     // checkSession,
     checkQuery(['_id']),
     deleteContactme

);

module.exports = router;