const { check } = require('express-validator');

// Register validation rules
exports.registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('phoneNumber', 'Phone number is required').not().isEmpty(),
  check('role', 'Role must be either customer or driver').isIn(['customer', 'driver']),
  // Driver specific validations
  check('vehicleType', 'Vehicle type is required for drivers')
    .if(check('role').equals('driver'))
    .not()
    .isEmpty(),
  check('vehicleRegistration', 'Vehicle registration is required for drivers')
    .if(check('role').equals('driver'))
    .not()
    .isEmpty(),
  check('driverLicenseCode', 'Driver license code is required for drivers')
    .if(check('role').equals('driver'))
    .not()
    .isEmpty(),
  check('operatingAreas', 'Operating areas are required for drivers')
    .if(check('role').equals('driver'))
    .isArray()
    .not()
    .isEmpty()
];

// Login validation rules
exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Load validation rules
exports.loadValidation = [
  check('pickupAddress', 'Pickup address is required').not().isEmpty(),
  check('pickupLocation.coordinates', 'Pickup location coordinates are required').isArray().not().isEmpty(),
  check('dropoffAddress', 'Dropoff address is required').not().isEmpty(),
  check('dropoffLocation.coordinates', 'Dropoff location coordinates are required').isArray().not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('loadSize', 'Load size must be one of: Small, Medium, Large, Bakkie Load, Custom').isIn(['Small', 'Medium', 'Large', 'Bakkie Load', 'Custom']),
  check('pickupDate', 'Pickup date is required').not().isEmpty(),
  check('pickupDate', 'Pickup date must be a valid date').isISO8601().toDate(),
  check('estimatedWeightKg', 'Estimated weight must be a number').optional().isNumeric(),
  check('photos', 'Photos must be an array').optional().isArray()
]; 