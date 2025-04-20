const Load = require('../models/Load');

// @desc    Create a new load
// @route   POST /api/loads
// @access  Private (Customers only)
exports.createLoad = async (req, res) => {
  try {
    // Add customer to the load
    req.body.customer = req.user._id;

    const load = await Load.create(req.body);

    res.status(201).json({
      success: true,
      data: load
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all available loads for drivers
// @route   GET /api/loads
// @access  Private (Drivers only)
exports.getAvailableLoads = async (req, res) => {
  try {
    // Only get loads with status 'posted'
    const loads = await Load.find({ status: 'posted' })
      .populate('customer', 'name email phoneNumber')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: loads.length,
      data: loads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get loads posted by the logged-in customer
// @route   GET /api/loads/myloads
// @access  Private (Customers only)
exports.getMyLoads = async (req, res) => {
  try {
    const loads = await Load.find({ customer: req.user._id })
      .populate('assignedDriver', 'name email phoneNumber')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: loads.length,
      data: loads
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get a single load
// @route   GET /api/loads/:id
// @access  Private
exports.getLoad = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id)
      .populate('customer', 'name email phoneNumber')
      .populate('assignedDriver', 'name email phoneNumber');

    if (!load) {
      return res.status(404).json({
        success: false,
        message: 'Load not found'
      });
    }

    res.status(200).json({
      success: true,
      data: load
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update a load
// @route   PUT /api/loads/:id
// @access  Private (Customer who created the load)
exports.updateLoad = async (req, res) => {
  try {
    let load = await Load.findById(req.params.id);

    if (!load) {
      return res.status(404).json({
        success: false,
        message: 'Load not found'
      });
    }

    // Make sure user is the customer who created the load
    if (load.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this load'
      });
    }

    // Only allow updates if load is not accepted or in transit
    if (load.status === 'accepted' || load.status === 'in_transit') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a load that has been accepted or is in transit'
      });
    }

    load = await Load.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: load
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a load
// @route   DELETE /api/loads/:id
// @access  Private (Customer who created the load)
exports.deleteLoad = async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);

    if (!load) {
      return res.status(404).json({
        success: false,
        message: 'Load not found'
      });
    }

    // Make sure user is the customer who created the load
    if (load.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this load'
      });
    }

    // Only allow deletion if load is not accepted or in transit
    if (load.status === 'accepted' || load.status === 'in_transit') {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete a load that has been accepted or is in transit'
      });
    }

    await load.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 