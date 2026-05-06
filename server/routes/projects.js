const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');
const { getProjects, createProject, addMember } = require('../controllers/projectController');

router.get('/', protect, getProjects);
router.post('/', protect, createProject);
router.post('/:id/members', protect, adminOnly, addMember);

module.exports = router;