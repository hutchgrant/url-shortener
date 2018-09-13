var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var viewSchema = new Schema({
  url: { type: Schema.Types.ObjectId, ref: 'Url' },
  date: { type: Date, required: true },
  ipaddress: { type: String, required: true },
  os: { type: String, required: true },
  device: { type: String, required: true },
  browser: { type: String, required: true }
});

module.exports = mongoose.model('View', viewSchema);
