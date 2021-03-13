const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
  shopper: {
      type: Schema.Types.ObjectId,
      ref: 'Shopper'
  },
  title: {
    type: String,
    required: true
  }, 
  condition: {
    type: String,
    enum: ['NEW', 'USED']
  },
  size: {
    type: Number,
    min: 6,
    max: 13
  },
  box: {
    type: String,
    enum: ['GOOD CONDITION', 'MISSING LID', 'DAMAGED', 'NO ORIGINAL BOX']
  },
  issue: {
    type: String,
    enum: ['YELLOWING', 'MISSING INSOLES', 'SCUFF MARK', 'CUT OR TEAR', 'OTHER', 'NO DEFECTS']
  },
  price: {
    type: Number,
    min: 0
  },
  description: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model('Sneaker', sneakerSchema);