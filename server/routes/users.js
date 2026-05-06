const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');
const { getAllUsers } = require('../controllers/userController');

router.get('/', protect, adminOnly, getAllUsers);

module.exports = router;