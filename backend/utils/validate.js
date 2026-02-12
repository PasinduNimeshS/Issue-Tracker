const validateIssue = (data) => {
  if (!data.title) return 'Title is required';
  if (!data.description) return 'Description is required';
  return null;
};

module.exports = { validateIssue };