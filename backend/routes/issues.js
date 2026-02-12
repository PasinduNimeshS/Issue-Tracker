const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getIssueCounts,
} = require('../controllers/issueController');

// Protected routes
router.post('/', auth, createIssue);
router.get('/', auth, getIssues);
router.get('/counts', auth, getIssueCounts);
router.get('/:id', auth, getIssueById);
router.put('/:id', auth, updateIssue);
router.delete('/:id', auth, deleteIssue);

module.exports = router;