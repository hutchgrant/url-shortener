const DailyView = require('../../models/DailyView');

module.exports = ({ url, date, views }) => {
  return new DailyView({
    url,
    date,
    views
  }).save();
};
