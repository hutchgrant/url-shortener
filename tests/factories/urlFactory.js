const Url = require('../../models/Url');

module.exports = ({ short, long, agent }) => {
  return new Url({
    short,
    long,
    agent
  }).save();
};
