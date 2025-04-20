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