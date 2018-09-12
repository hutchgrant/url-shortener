var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ipAgentSchema = new Schema({
  date: { type: Date, required: true },
  ipaddress: { type: String, required: true },
  os: { type: String, required: true },
  device: { type: String, required: true },
  browser: { type: String, required: true }
});

var urlSchema = new Schema(
  {
    short: { type: String, required: true },
    long: { type: String, required: true },
    views: { type: Number, default: 1 },
    agent: ipAgentSchema,
    viewer: [ipAgentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Url', urlSchema);
