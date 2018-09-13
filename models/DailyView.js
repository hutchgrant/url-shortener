var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dailyViewSchema = new Schema({
  url: { type: Schema.Types.ObjectId, ref: 'Url' },
  date: { type: Date, required: true },
  views: { type: Number, default: 1 }
});

module.exports = mongoose.model('DailyView', dailyViewSchema);
