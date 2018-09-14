const View = require('../../models/View');

module.exports = ({ url, agent }) => {
  return new View({
    url,
    ...agent
  }).save();
};
