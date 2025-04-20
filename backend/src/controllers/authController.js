const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      role,
      profilePictureUrl,
      // Driver specific fields
      vehicleType,
      vehicleRegistration,
      driverLicenseCode,
      operatingAreas
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role,
      profilePictureUrl,
      // Driver specific fields
      ...(role === 'driver' && {
        vehicleType,
        vehicleRegistration,
        driverLicenseCode,
        operatingAreas
      })
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profilePictureUrl: user.profilePictureUrl,
        isVerified: user.isVerified,
        ...(user.role === 'driver' && {
          vehicleType: user.vehicleType,
          operatingAreas: user.operatingAreas,
          isAvailable: user.isAvailable
        })
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profilePictureUrl: user.profilePictureUrl,
        isVerified: user.isVerified,
        ...(user.role === 'driver' && {
          vehicleType: user.vehicleType,
          operatingAreas: user.operatingAreas,
          isAvailable: user.isAvailable
        })
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profilePictureUrl: user.profilePictureUrl,
        isVerified: user.isVerified,
        averageRating: user.averageRating,
        numberOfRatings: user.numberOfRatings,
        ...(user.role === 'driver' && {
          vehicleType: user.vehicleType,
          vehicleRegistration: user.vehicleRegistration,
          driverLicenseCode: user.driverLicenseCode,
          operatingAreas: user.operatingAreas,
          isAvailable: user.isAvailable
        })
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 