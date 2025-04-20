const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pickupAddress: {
    type: String,
    required: [true, 'Please add a pickup address']
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  dropoffAddress: {
    type: String,
    required: [true, 'Please add a dropoff address']
  },
  dropoffLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  loadSize: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Bakkie Load', 'Custom'],
    required: [true, 'Please specify the load size']
  },
  estimatedWeightKg: {
    type: Number
  },
  requiredVehicleType: {
    type: String
  },
  pickupDate: {
    type: Date,
    required: [true, 'Please add a pickup date']
  },
  status: {
    type: String,
    enum: ['posted', 'quoted', 'accepted', 'in_transit', 'delivered', 'cancelled'],
    default: 'posted'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acceptedQuoteAmount: {
    type: Number
  },
  photos: {
    type: [String]
  }
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
LoadSchema.index({ 'pickupLocation.coordinates': '2dsphere' });
LoadSchema.index({ 'dropoffLocation.coordinates': '2dsphere' });

module.exports = mongoose.model('Load', LoadSchema); 