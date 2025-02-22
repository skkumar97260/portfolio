const express = require('express');
const router = express.Router();
const { saveProjects, getProjects, getsingleProjects, deleteProjects, updateProjects, } = require('../controller/projects'); // Corrected function name
const { checkQuery, checkBody } = require('../middleware/validators');
const {basicAuth  } = require('../middleware/basicauth');
const { checkSession } = require('../middleware/tokenManager');

router.post('/', // create projects
   basicAuth ,
    checkBody([ 'title', 'image', 'role',  'description']),
    saveProjects,
    // checkSession
);

router.get('/', // get all projects
   basicAuth ,
    // checkSession,
    getProjects
);

router.get('/getsingleProjects',
   basicAuth ,
    // checkSession,
    checkQuery(['_id']),
    getsingleProjects
);

router.delete('/', // delete projects
   basicAuth ,
    checkQuery(['_id']),
    deleteProjects,
    // checkSession
);

router.put('/', // update projects
   basicAuth ,
    checkBody([ '_id', 'title', 'image', 'role',  'description']),
    updateProjects,
    // checkSession
);

module.exports = router;