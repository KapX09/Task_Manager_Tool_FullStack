const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getDashboard, getMyTasks, createTask, updateTask } = require('../controllers/taskController');

router.get('/dashboard', protect, getDashboard);
router.get('/', protect, getMyTasks);
router.post('/', protect, createTask);
router.patch('/:id', protect, updateTask);

module.exports = router;