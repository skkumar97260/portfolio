const express = require('express');
const router = express.Router();
const { saveAbout, getAbout, getsingleAbout, updateAbout, deleteAbout } = require('../controller/about');
const { checkQuery, checkBody } = require('../middleware/validators');
const { basicAuth } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create About
   basicAuth,
   checkBody([]),
   saveAbout
   // checkSession // Uncomment if needed
);

router.get('/', // get all About
   basicAuth,
   // checkSession, // Uncomment if needed
   getAbout
);

router.get('/getsingleAbout',
   basicAuth,
   // checkSession, // Uncomment if needed
   checkQuery(['_id']),
   getsingleAbout
);

router.put('/', // update About
   basicAuth,
   // checkSession, // Uncomment if needed
   checkBody(['_id']),
   updateAbout
);

router.delete('/', // delete About
   basicAuth,
   // checkSession, // Uncomment if needed
   checkQuery(['_id']),
   deleteAbout
);

module.exports = router;
