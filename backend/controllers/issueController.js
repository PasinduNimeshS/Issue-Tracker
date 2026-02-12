const Issue = require('../models/Issue');
const { validateIssue } = require('../utils/validate');
const mongoose = require('mongoose');

// Create new issue
const createIssue = async (req, res, next) => {
  const { title, description, severity, priority } = req.body;
  const validationError = validateIssue({ title, description });
  if (validationError) return res.status(400).json({ message: validationError });

  try {
    const issue = new Issue({
      title,
      description,
      severity,
      priority,
      userId: req.user.id, // From auth middleware
    });
    await issue.save();
    res.status(201).json(issue);
  } catch (err) {
    next(err);
  }
};

// Get all issues with search, filter, pagination
const getIssues = async (req, res, next) => {
  const { search, priority, status, page = 1, limit = 10 } = req.query;
  const query = { userId: req.user.id }; // User-specific issues

  if (search) query.title = { $regex: search, $options: 'i' };
  if (priority) query.priority = priority;
  if (status) query.status = status;

  try {
    const issues = await Issue.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    const total = await Issue.countDocuments(query);
    res.json({ issues, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    next(err);
  }
};

// Get issue by ID
const getIssueById = async (req, res, next) => {
  try {
    const issue = await Issue.findOne({ _id: req.params.id, userId: req.user.id });
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    next(err);
  }
};

// Update issue
const updateIssue = async (req, res, next) => {
  const { title, description, severity, priority, status } = req.body;
  try {
    // Build update object with only provided fields
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (severity !== undefined) updateData.severity = severity;
    if (priority !== undefined) updateData.priority = priority;
    if (status !== undefined) updateData.status = status;

    const issue = await Issue.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { returnDocument: 'after', runValidators: true }
    );
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json(issue);
  } catch (err) {
    next(err);
  }
};

// Delete issue
const deleteIssue = async (req, res, next) => {
  try {
    const issue = await Issue.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!issue) return res.status(404).json({ message: 'Issue not found' });
    res.json({ message: 'Issue deleted' });
  } catch (err) {
    next(err);
  }
};

// Get issue counts by status
const getIssueCounts = async (req, res, next) => {
  try {
    const counts = await Issue.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.json(counts);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getIssueCounts,
};