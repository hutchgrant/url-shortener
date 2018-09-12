const moment = require('moment');
const useragent = require('useragent');
useragent(true);

exports.getIPAgent = (req, res, next) => {
  var agent = useragent.parse(req.headers['user-agent']);

  req.ipAgent = {
    date: moment(),
    ipaddress: req.clientIp,
    os: agent.os,
    device: agent.device,
    browser: agent.toAgent()
  };
  next();
};
