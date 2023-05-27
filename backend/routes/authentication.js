const express = require('express');
const cors = require('cors');
const checkToken = require('../controllers/checkToken');
const {register, logIn, logOut} = require('../controllers/auth');
const router = express.Router();

router.use(cors())

router.post('/v1/register', register)
router.post('/v2/login', logIn)
router.post('/logout', checkToken, logOut)

module.exports = router;