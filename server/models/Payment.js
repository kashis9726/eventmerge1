const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'In Progress'],
    default: 'Pending',
  },
  dueDate: {
    type: Date,
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
