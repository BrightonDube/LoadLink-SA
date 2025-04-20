// @desc    Get API status
// @route   GET /
// @access  Public
exports.getApiStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'LoadLink SA API Running'
  });
}; 