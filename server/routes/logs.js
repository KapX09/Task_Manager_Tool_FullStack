const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');

router.get('/', protect, adminOnly, (req, res) => {
  res.json({ message: "Logs will be implemented later" });
});

module.exports = router;