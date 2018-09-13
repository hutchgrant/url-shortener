var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema(
  {
    short: { type: String, required: true },
    long: { type: String, required: true },
    views: { type: Number, default: 0 },
    agent: { type: Schema.Types.ObjectId, ref: 'View' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Url', urlSchema);
