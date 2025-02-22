const express = require('express');
const router = express.Router();
const { saveContact, getContact, getsingleContact , deleteContact, updateContact} = require('../controller/contact'); // Corrected function name
const { checkQuery, checkBody } = require('../middleware/validators');
const {basicAuth  } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create contact
   basicAuth ,
    checkBody(['name', 'email', 'gender', 'age', 'phoneNumber', 'address','languages']),
    saveContact,
    // checkSession
);

router.get('/', // get all contact
   basicAuth ,
    // checkSession,
    getContact
);

router.get('/getsingleContact',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    getsingleContact
);

router.delete('/',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    deleteContact
);

router.put('/',
   basicAuth ,
    // checkSession,
    checkBody(['_id', 'name', 'email', 'gender', 'age', 'phoneNumber', 'address','languages']),
    updateContact
);

module.exports = router;