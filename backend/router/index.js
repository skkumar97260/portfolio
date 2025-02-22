const express = require('express');
const router = express.Router();

const admin = require('./admin');
const user = require('./user');
const login = require('./login');
const intro = require('./intro');
const about = require('./about');
const projects = require('./projects');
const experience = require('./experience');
const certification = require('./certification');
const contact = require('./contact');
const education = require('./education');
const contactme = require('./contactme');

router.use('/admin', admin);
router.use('/user', user);
router.use('/login', login);
router.use('/intro',intro);
router.use('/about',about);
router.use('/projects',projects);
router.use('/experience',experience);
router.use('/certification',certification);
router.use('/contact',contact);
router.use('/education',education)
router.use('/contactme', contactme);

module.exports = router;
